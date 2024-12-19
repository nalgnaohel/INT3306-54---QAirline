import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./PassengerInfoForm.css";

const PassengerInfoForm = () => {
  const location = useLocation();
  const {
    adults = 1,
    children = 0,
    infants = 0,
  } = location.state || { adults: 1, children: 0, infants: 0 };

  interface PassengerData {
    title: string;
    firstName: string;
    lastName: string;
    dob: string;
  }

  const generateInitialData = (count: number): PassengerData[] =>
    Array(count).fill({ title: "", firstName: "", lastName: "", dob: "" });

  const [adultData, setAdultData] = useState(generateInitialData(adults));
  const [childData, setChildData] = useState(generateInitialData(children));
  const [infantData, setInfantData] = useState(generateInitialData(infants));

  interface HandleChangeParams {
    index: number;
    field: keyof PassengerData;
    value: string;
    type: "adult" | "child" | "infant";
  }

  const handleChange = ({ index, field, value, type }: HandleChangeParams) => {
    let updatedData: PassengerData[];
    switch (type) {
      case "adult":
        updatedData = [...adultData];
        updatedData[index][field] = value;
        setAdultData(updatedData);
        break;
      case "child":
        updatedData = [...childData];
        updatedData[index][field] = value;
        setChildData(updatedData);
        break;
      case "infant":
        updatedData = [...infantData];
        updatedData[index][field] = value;
        setInfantData(updatedData);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      adults: adultData,
      children: childData,
      infants: infantData,
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Nhập thông tin hành khách</h2>
      <form onSubmit={handleSubmit} className="passenger-form">
        {/* Adult Forms */}
        {adultData.map((_, index) => (
          <div key={`adult-${index}`} className="passenger-section-form">
            <h3 className="section-title">NGƯỜI LỚN {index + 1}</h3>
            <div className="form-group">
              <label>Danh xưng*</label>
              <select
                onChange={(e) =>
                  handleChange({
                    index,
                    field: "title",
                    value: e.target.value,
                    type: "adult",
                  })
                }
                required
              >
                <option value="">Chọn danh xưng</option>
                <option value="Ông">Ông</option>
                <option value="Bà">Bà</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tên đệm và tên*</label>
              <input
                type="text"
                onChange={(e) =>
                  handleChange({
                    index,
                    field: "firstName",
                    value: e.target.value,
                    type: "adult",
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Họ*</label>
              <input
                type="text"
                onChange={(e) =>
                  handleChange({
                    index,
                    field: "lastName",
                    value: e.target.value,
                    type: "adult",
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Ngày sinh*</label>
              <input
                type="date"
                onChange={(e) =>
                  handleChange({
                    index,
                    field: "dob",
                    value: e.target.value,
                    type: "adult",
                  })
                }
                required
              />
            </div>
          </div>
        ))}

        {/* Child Forms */}
        {childData.map((_, index) => (
          <div key={`child-${index}`} className="passenger-section">
            <h3 className="section-title">TRẺ EM {index + 1}</h3>
            <div className="form-group">
              <label>Tên đệm và tên*</label>
              <input
                type="text"
                onChange={(e) =>
                  handleChange({
                    index,
                    field: "firstName",
                    value: e.target.value,
                    type: "child",
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Họ*</label>
              <input
                type="text"
                onChange={(e) =>
                  handleChange({
                    index,
                    field: "lastName",
                    value: e.target.value,
                    type: "child",
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Ngày sinh*</label>
              <input
                type="date"
                onChange={(e) =>
                  handleChange({
                    index,
                    field: "dob",
                    value: e.target.value,
                    type: "child",
                  })
                }
                required
              />
            </div>
          </div>
        ))}

        {/* Infant Forms */}
        {infantData.map((_, index) => (
          <div key={`infant-${index}`} className="passenger-section">
            <h3 className="section-title">TRẺ SƠ SINH {index + 1}</h3>
            <div className="form-group">
              <label>Tên đệm và tên*</label>
              <input
                type="text"
                onChange={(e) =>
                  handleChange({
                    index,
                    field: "firstName",
                    value: e.target.value,
                    type: "infant",
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Họ*</label>
              <input
                type="text"
                onChange={(e) =>
                  handleChange({
                    index,
                    field: "lastName",
                    value: e.target.value,
                    type: "infant",
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Ngày sinh*</label>
              <input
                type="date"
                onChange={(e) =>
                  handleChange({
                    index,
                    field: "dob",
                    value: e.target.value,
                    type: "infant",
                  })
                }
                required
              />
            </div>
          </div>
        ))}

        <button type="submit" className="submit-button">
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default PassengerInfoForm;
