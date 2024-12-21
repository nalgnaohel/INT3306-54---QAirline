import React, { useEffect, useState } from "react";
import { useTableContext } from "./TableContext";
import edit from "../../assets/images/Admin/edit.png";
import remove from "../../assets/images/Admin/trash-can.png";
import "./Table.css";
import DashboardAdmin from '../DashboardAdmin/DashboardAdmin';
import { error } from 'console';
import TextEditor from '../TextEditor/TextEditor';
import { useNavigate } from 'react-router-dom';

const Table: React.FC = () => {
  //token for authorization
  const token = localStorage.getItem('token');

  //navigator
  const navigator = useNavigate();

  const { setActiveTable } = useTableContext(); // Link với TableContext component
  const { activeTable } = useTableContext(); // Link với TableContext component
  const [isModalOpen, setIsModalOpen] = useState(false); // Lưu trạng thái của modal
  const [newRowData, setNewRowData] = useState<string[]>([]); // Thêm hàng mới
  const [additionalField, setAdditionalField] = useState<string>(""); // Lưu nội dung của bài đăng
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Lưu lỗi nhập liệu
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null); // Dòng được chọn để edit hoặc remove
  const [limit, setLimit] = useState<number>(5); // Giới hạn số hàng hiển thị
  const [searchTerm, setSearchTerm] = useState<string>(""); // Tìm kiếm

  const [formData, setFormData] = useState({
    // Setting
    systemName: "QAirline",
    email: "example@gmail.com",
    phone: "+84 123456789",
    avatar: null as File | null,
  });

  const [flightFetched, setFlightFetched] = useState(false);
  const [aircraftsFetched, setAircraftsFetched] = useState(false);
  const [airportsFetched, setAirportsFetched] = useState(false);
  const [usersFetched, setUsersFetched] = useState(false);

  useEffect(() => {
    if (activeTable === 3 && !aircraftsFetched) {
      fetch("http://127.0.0.1:5000/api/aircraft/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data.flights.aircrafts);
          setAircraftsFetched(true);
          tables[2].rows = data.flights.aircrafts.map((aircraft: any, index: number) => [
            (index + 1).toString(),
            aircraft.manufacturer,
            aircraft.aircraft_id,
            aircraft.model,
            aircraft.economy_class_seats.toString(),
            aircraft.business_class_seats.toString(),
            aircraft.premium_class_seats.toString(),
            aircraft.first_class_seats.toString(),
            '',
          ]);
          //console.log(aircrafts)
        })
        .catch((error) => {
          console.log("Error fetching aircraft data - ", error);
        });
    } else if (activeTable === 2 && !flightFetched) {
      fetch('http://127.0.0.1:5000/api/flight/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data.flights.flights);
          setFlightFetched(true);
          tables[1].rows = data.flights.flights.map((flight: any, index: number) => [
            (index + 1).toString(),
            flight.flight_id,
            flight.brand,
            flight.aircraft_id,
            flight.departure_code + ' - ' + flight.arrival_code,
            flight.departure_time.replace('T', ' ') + ' / ' + flight.arrival_time.replace('T', ' '),
            '200',
            flight.available_seats.toString(),
            '',
          ]);
          console.log(tables[1]);
        })
        .catch(error => {
          console.log('Error fetching flight data - ', error);
        });
      } else if (activeTable === 4 && !airportsFetched) {
        fetch('http://127.0.0.1:5000/api/airport/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        })
          .then(resp => resp.json())
          .then(data => {
            console.log(data.airports);
            setAirportsFetched(true);
            tables[3].rows = data.airports.map((airport: any, index: number) => [
              (index + 1).toString(),
              airport.iata_code,
              airport.name,
              airport.city,
              airport.country,
              '',
            ]);
            //console.log(aircrafts)
          })
          .catch(error => {
            console.log('Error fetching airport data - ', error);
          });
      } else if (activeTable === 6 && !usersFetched) {
        fetch('http://127.0.0.1:5000/api/auth/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        })
          .then(resp => resp.json())
          .then(data => {
            console.log(data.data.users);
            setAirportsFetched(true);
            tables[5].rows = data.data.users.map((user: any, index: number) => [
              (index + 1).toString(),
              user.last_name,
              user.first_name,
              user.gender,
              user.email.split('@')[0],
              user.password,
              user.email,
              user.phone_number,
              user.nationality,
              user.type,
              '',
            ]);
          }).catch(error => {
            console.log('Error fetching user data - ', error);
          });
      }
    }, [activeTable, aircraftsFetched, flightFetched, airportsFetched, usersFetched]);

  const [tables, setTables] = useState([ // Table content
    {
      id: 1,
      title: ["Danh sách đặt chỗ"],
      button: [""],
      headers: [
        "STT",
        "Mã người dùng",
        "Số hiệu chuyến bay",
        "Hạng vé",
        "Hạn hủy vé",
        "Hành động",
      ],
      rows: [
        ["1", "QH-12ULK165", "QH171", "Thương gia", "15:00 01 Th12 2024", ""],
        ["2", "QH-12ULK166", "QH153", "Thương gia", "15:00 04 Th12 2024", ""],
      ],
    },
    {
      id: 2,
      title: ["Danh sách chuyến bay"],
      button: ["+ Thêm chuyến bay"],
      headers: [
        "STT",
        "Số hiệu",
        "Hãng bay",
        "Mã tàu bay",
        "Chặng bay",
        "Thời gian",
        "Số ghế",
        "Đã đặt",
        "Hành động",
      ],
      rows: [
        [
          "1",
          "QH171",
          "Bamboo Airway",
          "VN-A588",
          "Hà Nội - TP. Hồ Chí Minh",
          "02 Thg 12 2024 - 15:10 / 02 Thg 12 2024 - 17:10",
          "50",
          "10",
          "",
        ],
        [
          "2",
          "QH153",
          "Bamboo Airway",
          "VN-A589",
          "TP.Hồ Chí Minh - Hà Nội",
          "05 Thg 12 2024 - 15:10 / 05 Thg 12 2024 - 17:10",
          "50",
          "5",
          "",
        ],
      ],
    },
    {
      id: 3,
      title: ["Danh sách tàu bay"],
      button: ["+ Thêm tàu bay"],
      headers: [
        "STT",
        "Hãng bay",
        "Mã tàu bay",
        "Loại máy bay",
        "Phổ thông",
        "Thương gia",
        "Cao cấp",
        "Hạng nhất",
        "Hành động",
      ],
      rows: [
        [
          "1",
          "Bamboo Airway",
          "VN-A588",
          "Airbus A321",
          "50",
          "20",
          "10",
          "5",
          "",
        ],
        [
          "2",
          "Bamboo Airway",
          "VN-A589",
          "Airbus A321",
          "50",
          "20",
          "10",
          "5",
          "",
        ],
      ],
    },
    {
      id: 4,
      title: ["Danh sách sân bay"],
      button: ["+ Thêm sân bay"],
      headers: [
        "STT",
        "Mã sân bay",
        "Sân bay",
        "Địa điểm",
        "Quốc gia",
        "Hành động",
      ],
      rows: [
        [
          "1",
          "HAN",
          "Sân bay Nội Bài",
          "Phú Minh, Sóc Sơn, Hà Nội",
          "Viêt Nam",
          "",
        ],
        [
          "2",
          "SGN",
          "Sân bay Tân Sơn Nhất",
          "Đ. Trường Sơn, Phường 2, Tân Bình, Hồ Chí Minh",
          "Việt Nam",
          "",
        ],
      ],
    },
    {
      id: 5,
      title: ["Danh sách hãng bay"],
      button: ["+ Thêm hãng bay"],
      headers: ["STT", "Hãng bay", "Ký hiệu IATA", "Ký hiệu ICAO", "Hành động"],
      rows: [
        ["1", "Vietnam Airline", "VN", "HVN", ""],
        ["2", "VietJet Air", "VJ", "VJC", ""],
      ],
    },
    {
      id: 6,
      title: ["Danh sách người dùng"],
      button: ["+ Thêm người dùng"],
      headers: [
        "STT",
        "Họ",
        "Tên đêm và tên",
        "Giới tính",
        "Tên đăng nhập",
        "Mật khẩu",
        "Email",
        "Số điện thoại",
        "Quốc tịch",
        "Loại người dùng",
        "Hành động",
      ],
      rows: [
        [
          "1",
          "",
          "ADMIN",
          "Nam",
          "admin",
          "123456",
          "admin@gmail.com",
          "+84123456789",
          "Việt Nam",
          "Admin",
          "",
        ],
        [
          "2",
          "NGUYEN",
          "VAN A",
          "Nam",
          "hehe",
          "12345678",
          "example@gmail.com",
          "+84123456789",
          "Việt Nam",
          "User",
          "",
        ],
      ],
    },
    {
      id: 7,
      title: ["Danh sách bài đăng"],
      button: ["+ Thêm bài đăng"],
      headers: ["STT", "Mã bài đăng", "Tiêu đề", "Hành động"],
      rows: [
        ["1", "QA-1233H12", "Giảm giá 20% cho khách hàng thân thiết", ""],
        ["2", "QA-12312A2", "Quyện lợi khách hàng", ""],
      ],
    },
    {
      id: 8,
      title: ["Cài đặt"],
      button: [""],
      headers: [""],
      rows: [[""]],
    },
  ]);
  // Hàm dổi giới hạn hiển thị
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  // Hàm đổi từ khóa tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Hàm hiển thị các dòng có từ khóa khớp với từ tìm kiếm
  const getFilteredRows = (rows: string[][]) => {
    console.log(rows);
    return rows.filter((row) =>
      row.some((cell) => cell.toLowerCase().includes(searchTerm))
    );
  };

  // Thay đổi dữ liệu ở setting
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Thay đổi file ảnh ở setting
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Lấy file đầu tiên từ input
    if (file) {
      setFormData({ ...formData, avatar: file }); // Cập nhật avatar vào formData
      const previewUrl = URL.createObjectURL(file); // Tạo URL ảnh xem trước
      setPreview(previewUrl);
    } else {
      setFormData({ ...formData, avatar: null });
      setPreview(null); // Xóa preview nếu không có file
    }
  };

  // Lưu dữ liệu được nhập ở setting
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Gửi dữ liệu đi tại đây
    console.log(formData);
  };

  // Mở model để thêm hoặc sửa dữ liệu của 1 hàng
  const openModal = () => {
    if (activeTable !== null) {
      const columnCount =
        tables.find((table) => table.id === activeTable)?.headers.length || 1;
      setNewRowData(Array(columnCount - 1).fill("")); // Loại bỏ cột số thứ tự
      setIsModalOpen(true);
      setErrorMessage(null); // Xóa thông báo lỗi khi mở modal mới
    }
  };

  // Lưu dữ liệu tạm thời của modal
  const handleInputChange = (index: number, value: string) => {
    setNewRowData((prevData) =>
      prevData.map((data, i) => (i === index ? value : data))
    );
  };

  // Kiểm tra dữ liệu nhập vào ở modal có hợp lệ không
  const validateInputs = () => {
    if (newRowData.slice(1, -1).some((value) => value.trim() === "")) {
      setErrorMessage(
        "All table fields must be filled out except the first and last columns."
      );
      return false;
    }
    return true;
  };

  // Lưu dữ liệu của modal
  const confirmAddRow = () => {
    if (!validateInputs()) {
      alert("Vui lòng nhập đủ dữ liệu");
      return; // Dừng nếu dữ liệu không hợp lệ
    }

    if (activeTable !== null) {
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === activeTable
            ? {
                ...table,
                rows: [
                  ...table.rows,
                  [
                    (table.rows.length + 1).toString(), // Tự động thêm số thứ tự
                    ...newRowData,
                  ],
                ],
              }
            : table
        )
      );
      console.log("Additional Field:", additionalField); // Log trường bổ sung
      setIsModalOpen(false);
      setAdditionalField("");
    }
  };

  // Hàm xử lý khi nhấn "Có" trong hộp thoại đăng xuất
  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    console.log('Đã đăng xuất');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigator("/");
  };

  // Chỉnh sửa dữ liệu của một hàng
  const handleEdit = (rowIndex: number) => {
    console.log(rowIndex); 
    setSelectedRowIndex(rowIndex);
    const selectedRow = tableToRender?.rows[rowIndex] || [];
    const editableData = selectedRow.slice(1, -1); // Bỏ cột STT và hành động
    setNewRowData(editableData);
    setIsModalOpen(true);

  };

  // Xóa dữ liệu của một hàng
  const handleRemove = (rowIndex: number) => {
    let realIndex = tables[activeTable!!].rows[rowIndex][0];
    console.log(realIndex);
    if (window.confirm("Bạn có chắc chắn muốn xóa dòng này?")) {
      if (activeTable !== null) {
        setTables((prevTables) =>
          prevTables.map((table) =>
            table.id === activeTable
              ? {
                  ...table,
                  rows: table.rows
                    .filter((_, index) => index !== rowIndex) // Xóa dòng
                    .map((row, index) => [
                      (index + 1).toString(), // Cập nhật lại STT
                      ...row.slice(1),
                    ]),
                }
              : table
          )
        );
        if (activeTable === 3) {
          console.log(realIndex);
          // try {
          //   fetch(`http://127.0.0.1:5000/api/aircraft/${aircrafts[realIndex].aircraft_id}`, {
          //     method: 'DELETE',
          //     headers: {
          //       'Content-Type': 'application/json',
          //       Authorization: `Bearer ${token}`
          //     },
          //   })
          //     .then(resp => resp.json())
          //     .then(data => {
          //       console.log(data);
          //     })
          // } catch(error)  {
          //   console.log('Error deleting aircraft - ', error);
          // };
        }
      }
    }
  };

  // Lưu dữ liệu của hàng khi đã chỉnh sửa
  const saveEditedRow = () => {
    if (selectedRowIndex !== null && activeTable !== null) {
      try {
        setTables((prevTables) =>
          prevTables.map((table) =>
            table.id === activeTable
              ? {
                  ...table,
                  rows: table.rows.map((row, index) =>
                    index === selectedRowIndex
                      ? [
                          row[0], // Giữ lại STT
                          ...newRowData,
                          row[row.length - 1], // Giữ lại cột hành động
                        ]
                      : row
                  ),
                }
              : table
          )
        );
        if (activeTable === 3) {
          fetch(`http://127.0.0.1:5000/api/aircraft/${newRowData[1]}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              aircraft_id: newRowData[1],
              model: newRowData[2],
              manufacturer: newRowData[0],
              economy_class_seats: Number(newRowData[3]),
              business_class_seats: Number(newRowData[4]),
              premium_class_seats: Number(newRowData[5]),
              first_class_seats: Number(newRowData[6]),
            }),
          })
            .then(resp => resp.json())
            .then(data => {
              console.log(data);
            }) 
        } else if (activeTable === 2) {
          fetch(`http://127.0.0.1:5000/api/flight/${newRowData[1]}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              flight_id: newRowData[1],
              brand: newRowData[2],
              aircraft_id: newRowData[3],
              departure_code: newRowData[4].split(' - ')[0],
              arrival_code: newRowData[4].split(' - ')[1],
              departure_time: newRowData[5].split(' / ')[0].split('T')[0] + ' ' + newRowData[5].split(' / ')[0].split('T')[1],
              arrival_time: newRowData[5].split(' / ')[1].split('T')[0] + ' ' + newRowData[5].split(' / ')[1].split('T')[1],
              capacity: Number(newRowData[6]),
              available_seats: Number(newRowData[7]),
            }),
          })
            .then(resp => resp.json())
            .then(data => {
              console.log(data);
            })
          } else if (activeTable === 4) {
            fetch(`http://127.0.0.1:5000/api/airport/${newRowData[1]}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                iata_code: newRowData[1],
                name: newRowData[2],
                city: newRowData[3],
                country: newRowData[4],
              }),
            })
              .then(resp => resp.json())
              .then(data => {
                console.log(data);
              })
            } else if (activeTable === 6) {
              fetch(`http://127.0.0.1:5000/api/auth/${newRowData[4]}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  last_name: newRowData[0],
                  first_name: newRowData[1],
                  gender: newRowData[2],
                  email: newRowData[5],
                  phone_number: newRowData[6],
                  nationality: newRowData[7],
                  type: newRowData[8]
                }),
              })
                .then(resp => resp.json())
                .then(data => {
                  console.log(data);
                })
            } 
      } catch (error) {
          console.log('Error updating aircraft - ', error);
      }
      setIsModalOpen(false);
      setSelectedRowIndex(null);
    }
  };

  // TÌm bảng đang được hiển thị
  const tableToRender = tables.find((table) => table.id === activeTable);

  return (
    <div className="admin-context">
      {activeTable == 0 && (
        <div className="container-admin-dashboard">
          <DashboardAdmin />
        </div>
      )}
      {activeTable != 0 && (
        <div className="container-admin-table">
          <div className="header-admin-table">
            {tables.map((table) =>
              activeTable == table.id ? (
                <div key={table.id} className="title-admin-table">
                  {table.title}
                </div>
              ) : null
            )}

            {tables.map((table) =>
              activeTable == table.id &&
              [2, 3, 4, 5, 6, 7].includes(activeTable) ? (
                <button
                  onClick={openModal}
                  className="add-row-button"
                  disabled={activeTable === null}
                >
                  {" "}
                  {table.button}
                </button>
              ) : null
            )}

            {activeTable == 9 && (
              <div className="title-admin-table">Đăng xuất</div>
            )}
          </div>

          {activeTable == 9 && (
            <div className="confirm-dialog">
              <p>Bạn có chắc muốn đăng xuất?</p>
              <button onClick={handleConfirmLogout} className="confirm">
                Có
              </button>
            </div>
          )}

          {activeTable == 8 && (
            <form onSubmit={handleSubmit} className="setting">
              <div className="setting-input">
                <label htmlFor="systemName">Tên hệ thống:</label>
                <input
                  type="text"
                  id="systemName"
                  name="systemName"
                  value={formData.systemName}
                  onChange={handleChange}
                />
              </div>
              <div className="setting-input">
                <label htmlFor="Email">Email:</label>
                <input
                  type="text"
                  id="Email"
                  name="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="setting-input">
                <label htmlFor="phone">Số điện thoại:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="setting-input">
                <label htmlFor="avatar">Ảnh hệ thống:</label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {preview && (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={preview}
                      alt="Ảnh xem trước"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="button-container">
                <button type="submit">Lưu</button>
              </div>
            </form>
          )}

          {tables.map((table) =>
            activeTable == table.id &&
            [1, 2, 3, 4, 5, 6, 7].includes(activeTable) ? (
              <div className="controls-table-admin" key={table.id}>
                <div className="limitSelect-admin-table">
                  <label>Xem</label>
                  <select
                    id="limitSelect"
                    value={limit}
                    onChange={handleLimitChange}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                  <label>phần tử</label>
                </div>
                <input
                  type="text"
                  id="searchInput"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            ) : null
          )}

          <div className="table-container">
            {tables.map((table) =>
              activeTable === table.id &&
              [1, 2, 3, 4, 5, 6, 7].includes(activeTable) ? (
                <div key={table.id} className="table">
                  <table>
                    <thead>
                      <tr>
                        {table.headers.map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody id="flightTableBody">
                      {getFilteredRows(table.rows)
                        .slice(0, limit) // Apply limit to the rows displayed
                        .map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) =>
                              cellIndex === row.length - 1 ? (
                                <td key={cellIndex}>
                                  <div className="action-buttons">
                                    <img
                                      className="edit-btn-admin-table"
                                      src={edit}
                                      onClick={() => handleEdit(rowIndex)}
                                    />
                                    <img
                                      className="remove-btn-admin-table"
                                      src={remove}
                                      onClick={() => handleRemove(rowIndex)}
                                    />
                                  </div>
                                </td>
                              ) : (
                                <td key={cellIndex}>{cell}</td>
                              )
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="modal-admin">
          <div className="modal-content">
            {selectedRowIndex !== null ? (
              <h2>Chỉnh sửa dữ liệu</h2>
            ) : (
              <h2>Thêm dữ liệu mới</h2>
            )}

            {tables
              .find((table) => table.id === activeTable)
              ?.headers.slice(1, -1) // Loại bỏ cột số thứ tự khỏi header
              .map((header, index) => (
                <div key={index} className="form-group">
                  <label>{header}</label>
                  <input
                    type="text"
                    value={newRowData[index] || ""}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </div>
              ))}

            {activeTable == 7 && (
              <div className="form-group">
                <label>Nội dung</label>
                <TextEditor />
              </div>
            )}

            <div className="modal-actions">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedRowIndex(null);
                }}
                className="cancel-button-admin-modal"
              >
                Hủy
              </button>
              {selectedRowIndex !== null ? (
                <button
                  onClick={() => {
                    saveEditedRow();
                    setSelectedRowIndex(null);
                  }}
                  className="confirm-button-admin-modal"
                >
                  Lưu
                </button>
              ) : (
                <button
                  onClick={confirmAddRow}
                  className="confirm-button-admin-modal"
                >
                  Lưu
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
