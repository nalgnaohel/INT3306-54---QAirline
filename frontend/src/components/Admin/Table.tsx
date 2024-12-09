import React, { useState } from 'react';
import { useTableContext } from './TableContext';
import "../../css/Admin/Table.css";

const Table: React.FC = () => {
  const { activeTable } = useTableContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRowData, setNewRowData] = useState<string[]>([]);
  const [additionalField, setAdditionalField] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Lưu lỗi nhập liệu


  const [tables, setTables] = useState([
    {
    id: 1,
    title: ['Danh sách đặt chỗ'],
    button: [''],
    headers: ['STT', 'Id', 'Thông tin người đặt', 'Thông tin chuyên bay', 'Hành động'],
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
  ]);

    const openModal = () => {
        if (activeTable !== null) {
          const columnCount = tables.find((table) => table.id === activeTable)?.headers.length || 1;
          setNewRowData(Array(columnCount - 1).fill('')); // Loại bỏ cột số thứ tự
          setIsModalOpen(true);
          setErrorMessage(null); // Xóa thông báo lỗi khi mở modal mới
        }
      };
    
      const handleInputChange = (index: number, value: string) => {
        setNewRowData((prevData) =>
          prevData.map((data, i) => (i === index ? value : data))
        );
      };

      const validateInputs = () => {
        if (newRowData.some((value) => value.trim() === '')) {
          setErrorMessage('All table fields must be filled out.');
          return false;
        }
        if (additionalField.trim() === '') {
          setErrorMessage('Additional field cannot be empty.');
          return false;
        }
        return true;
      };
    
      const confirmAddRow = () => {
        // if (!validateInputs()) {
        //     return; // Dừng nếu dữ liệu không hợp lệ
        //   }

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

      const tableToRender = tables.find((table) => table.id === activeTable);

      return (
      <div className='container'>
        <div className='header'>
          {tables.map((table) => activeTable == table.id ? (
            <div key={table.id} className='title'>{table.title}</div>
          ) : null)}
          {tables.map((table) => (activeTable == table.id && activeTable != 1) ? (
            <button
            onClick={openModal}
            className="add-row-button"
            disabled={activeTable === null}
            >
            {table.button}
            </button>
          ) : null)}
        </div>
        {tables.map((table) => activeTable == table.id ? (
            <div className="controls">
            <label>Xem</label>
            <select id="limitSelect">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            phần tử
            <input type="text" id="searchInput" placeholder="Tìm kiếm..." />
            </div>
        ) : null)}
        
        <div className="Table">
          <div className="table-container">
            {tables.map((table) =>
              activeTable === table.id ? (
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
                      {table.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                        {row.map((cell, cellIndex) =>
                          cellIndex === row.length - 1 ? (
                            <td key={cellIndex}>
                              <div className="action-buttons">
                                <button className="table-action">Action 1</button>
                                <button className="table-action">Action 2</button>
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
            <h2>Add Row Data</h2>
            {tables
              .find((table) => table.id === activeTable)
              ?.headers.slice(1) // Loại bỏ cột số thứ tự khỏi header
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
            <div className="form-group">
              <label>Additional Info</label>
              <input
                type="text"
                value={additionalField}
                onChange={(e) => setAdditionalField(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button onClick={() => setIsModalOpen(false)} className='cancel-button'>Cancel</button>
              <button onClick={confirmAddRow} className="confirm-button">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};
    
    export default Table;