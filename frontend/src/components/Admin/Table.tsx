import React, { useState } from 'react';
import { useTableContext } from './TableContext';
import edit from "../../assets/images/Admin/edit.png";
import remove from "../../assets/images/Admin/trash-can.png";
import "./Table.css";
import DashboardAdmin from '../DashboardAdmin/DashboardAdmin';

const Table: React.FC = () => {
  const { setActiveTable } = useTableContext(); // Link với TableContext component
  const { activeTable } = useTableContext(); // Link với TableContext component
  const [isModalOpen, setIsModalOpen] = useState(false); // Lưu trạng thái của modal
  const [newRowData, setNewRowData] = useState<string[]>([]); // Thêm hàng mới
  const [additionalField, setAdditionalField] = useState<string>(''); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Lưu lỗi nhập liệu
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null); // Dòng được chọn để edit hoặc remove
  const [limit, setLimit] = useState<number>(5); // Giới hạn số hàng hiển thị
  const [searchTerm, setSearchTerm] = useState<string>(''); // Tìm kiếm

  const [formData, setFormData] = useState({ // Setting
    systemName: 'QAirline',
    email: 'example@gmail.com',
    phone: '+84 123456789',
    avatar: null as File | null,
  });
  const [tables, setTables] = useState([ // Table content
    {
    id: 1,
    title: ['Danh sách đặt chỗ'],
    button: [''],
    headers: ['STT', 'Id', 'Thông tin người đặt', 'Thông tin chuyến bay', 'Hành động'],
    rows: [
        ['1', 'QH-12ULK165', 'Tên: NGUYEN VAN A SĐT: 0123456789 Địa chỉ: 123 ABC', 'Hãng bay: Bamboo Airway Plane: QH 171 Airbus A321 Chuyến bay: Hà Nội - TP. Hồ Chí Minh Khởi hành: 02 Thg 12 2024 - 15:10 Đến nơi: 02 Thg 12 2024 - 17:10', ''],
        ['2', 'QH-12ULK166', 'Tên: NGUYEN VAN A SĐT: 0123456789 Địa chỉ: 123 ABC', 'Hãng bay: Bamboo Airway Plane: QH 153 Airbus A321 Chuyến bay: TP.Hồ Chí Minh - Hà Nội Khởi hành: 05 Thg 12 2024 - 15:10 Đến nơi: 05 Thg 12 2024 - 17:10', ''],
    ],
    },
    {
    id: 2,
    title: ['Danh sách chuyến bay'],
    button: ['+ Thêm chuyến bay'],
    headers: ['STT', 'Date', 'Thông tin chuyến bay', 'Số ghế', 'Đã đặt', 'Còn lại', 'Giá vé', 'Hành động'],
    rows: [
      ['1', '02 Thg 12 2024', 'Hãng bay: Bamboo Airway Plane: QH 171 Airbus A321 Chuyến bay: Hà Nội - TP. Hồ Chí Minh Khởi hành: 02 Thg 12 2024 - 15:10 Đến nơi: 02 Thg 12 2024 - 17:10', '50', '10', '40', '1000', ''],
      ['2', '02 Thg 12 2024', 'Hãng bay: Bamboo Airway Plane: QH 153 Airbus A321 Chuyến bay: TP.Hồ Chí Minh - Hà Nội Khởi hành: 05 Thg 12 2024 - 15:10 Đến nơi: 05 Thg 12 2024 - 17:10', '50', '5', '45', '2000', ''],
    ],
    },
    {
    id: 3,
    title: ['Danh sách sân bay'],
    button: ['+ Thêm sân bay'],
    headers: ['STT', 'Sân bay', 'Địa điểm', 'Hành động'],
    rows: [
      ['1', 'Sân bay Nội Bài', 'Phú Minh, Sóc Sơn, Hà Nội', ''],
      ['2', 'Sân bay Tân Sơn Nhất', 'Đ. Trường Sơn, Phường 2, Tân Bình, Hồ Chí Minh', ''],
    ],
    },
    {
    id: 4,
    title: ['Danh sách hãng bay'],
    button: ['+ Thêm hãng bay'],
    headers: ['STT', 'Hãng bay', 'Ký hiệu IATA', 'Ký hiệu ICAO', 'Hành động'],
    rows: [
      ['1', 'Vietnam Airline', 'VN', 'HVN', ''],
      ['2', 'VietJet Air', 'VJ', 'VJC', ''],
    ],
    },
    {
      id: 5,
      title: ['Danh sách người dùng'],
      button: ['+ Thêm người dùng'],
      headers: ['STT', 'Họ và tên', 'Tên đăng nhập', 'Loại người dùng', 'Hành động'],
      rows: [
        ['1', 'ADMIN', 'admin', 'Admin', ''],
        ['2', 'NGUYEN VAN A', 'example@gmail.com', 'Staff', ''],
      ],
    },
    {
      id: 6,
      title: ['Danh sách bài đăng'],
      button: ['+ Thêm bài đăng'],
      headers: ['STT', 'Tiêu đề', 'Hành động'],
      rows: [
        ['1', 'Giảm giá 20% cho khách hàng thân thiết', ''],
        ['2', 'Quyện lợi khách hàng', ''],
      ],
    },
    {
    id: 7,
    title: ['Cài đặt'],
    button: [''],
    headers: [''],
    rows: [[''],],
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
    return rows.filter(row =>
      row.some(cell => cell.toLowerCase().includes(searchTerm))
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
      const columnCount = tables.find((table) => table.id === activeTable)?.headers.length || 1;
      setNewRowData(Array(columnCount - 1).fill('')); // Loại bỏ cột số thứ tự
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
    if (newRowData.slice(1, -1).some((value) => value.trim() === '')) {
      setErrorMessage('All table fields must be filled out except the first and last columns.');
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
      console.log('Additional Field:', additionalField); // Log trường bổ sung
      setIsModalOpen(false);
      setAdditionalField('');
    }
  };

  // Hàm xử lý khi nhấn "Có" trong hộp thoại đăng xuất
  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    console.log('Đã đăng xuất');
  };

  // Chỉnh sửa dữ liệu của một hàng
  const handleEdit = (rowIndex: number) => {
    setSelectedRowIndex(rowIndex);
    const selectedRow = tableToRender?.rows[rowIndex] || [];
    const editableData = selectedRow.slice(1, -1); // Bỏ cột STT và hành động
    setNewRowData(editableData);
    setIsModalOpen(true);
  };

  // Xóa dữ liệu của một hàng
  const handleRemove = (rowIndex: number) => {
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
      }
    }
  };

  // Lưu dữ liệu của hàng khi đã chỉnh sửa
  const saveEditedRow = () => {
    if (selectedRowIndex !== null && activeTable !== null) {
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
      setIsModalOpen(false);
      setSelectedRowIndex(null);
    }
  };

  // TÌm bảng đang được hiển thị
  const tableToRender = tables.find((table) => table.id === activeTable);

  return (
    <div className='admin-context'>
      {activeTable == 0 && (
        <div className='container-admin-dashboard'>
          <DashboardAdmin />
        </div>
      )}
      {activeTable != 0 && (
        <div className='container-admin-table'>
          <div className='header'>
            {tables.map((table) => activeTable == table.id ? (
              <div key={table.id} className='title'>{table.title}</div>
            ) : null)}

            {tables.map((table) => (activeTable == table.id && [2, 3, 4, 5, 6].includes(activeTable)) ? (
              <button
                onClick={openModal}
                className="add-row-button"
                disabled={activeTable === null}
              > {table.button}
              </button>
            ) : null)}

            {activeTable == 8 && (
              <div className='title'>Đăng xuất</div>
            )}
          </div>


          {activeTable == 8  && (
            <div className="confirm-dialog">
              <p>Bạn có chắc muốn đăng xuất?</p>
              <button onClick={handleConfirmLogout} className='confirm'>Có</button>
            </div>
          )}

          {activeTable == 7 && (
            <form onSubmit={handleSubmit} className='setting'>
              <div>
                <label htmlFor="systemName">Tên hệ thống:</label>
                <input
                  type="text"
                  id="systemName"
                  name="systemName"
                  value={formData.systemName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="Email">Email:</label>
                <input
                  type="text"
                  id="Email"
                  name="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone">Số điện thoại:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
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
                      style={{ width: "200px", height: "200px", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>
              <div className='button-container'><button type="submit">Lưu</button></div>
            </form>
          )}

          {tables.map((table) => (activeTable == table.id && [1, 2, 3, 4, 5, 6].includes(activeTable)) ? (
            <div className="controls" key={table.id}>
              <label>Xem</label>
              <select id="limitSelect" value={limit} onChange={handleLimitChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              phần tử
              <input
                type="text"
                id="searchInput"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          ) : null)}
        

          <div className="Table">
            <div className="table-container">
              {tables.map((table) => (activeTable === table.id && [1, 2, 3, 4, 5, 6].includes(activeTable)) ? (
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
                            {row.map((cell, cellIndex) => cellIndex === row.length - 1 ? (
                              <td key={cellIndex}>
                                <div className="action-buttons">
                                  <img className='edit-btn' src={edit} onClick={() => handleEdit(rowIndex)} />
                                  <img className='remove-btn' src={remove} onClick={() => handleRemove(rowIndex)} />
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

            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  {selectedRowIndex !== null ? (
                    <h2>Chỉnh sửa dữ liệu</h2>
                  ) : (
                    <h2>Thêm dữ liệu mới</h2>
                  )}

                  {tables.find((table) => table.id === activeTable)
                    ?.headers.slice(1, -1) // Loại bỏ cột số thứ tự khỏi header
                    .map((header, index) => (
                      <div key={index} className="form-group">
                        <label>{header}</label>
                        <input
                          type="text"
                          value={newRowData[index] || ''}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                      </div>
                  ))}

                  {activeTable == 5 && (
                    <div className="form-group">
                      <label>Mật khẩu</label>
                      <input
                        type="text"
                        onChange={(e) => setAdditionalField(e.target.value)}
                      />
                    </div>
                  )}

                  {activeTable == 6 && (
                    <div className="form-group">
                      <label>Nội dung</label>
                      <input
                        type="text"
                        onChange={(e) => setAdditionalField(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="modal-actions">
                    <button 
                      onClick={() => {setIsModalOpen(false); setSelectedRowIndex(null); }}
                      className='cancel-button'
                    >
                      Hủy
                    </button>
                    {selectedRowIndex !== null ? (
                      <button
                        onClick={() => { saveEditedRow(); setSelectedRowIndex(null); }}
                        className="confirm-button"
                      >
                        Lưu
                      </button>
                    ) : (
                      <button 
                        onClick={confirmAddRow}
                        className="confirm-button"
                      >
                        Lưu
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
    
export default Table;