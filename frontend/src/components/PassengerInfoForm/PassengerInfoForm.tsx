import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./PassengerInfoForm.css";
import TopNavBar from "../Navbar/TopNavBar";
import Footer from "../Footer/Footer";
import Dialog from "../Dialog/Dialog";
import UserNavBar from "../UserNavbar/UserNavbar"
import { UserProvider } from "../UserContent/UserContext";

const PassengerInfoForm = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [ticketIds, setTicketIds] = useState<string[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const {
    adults = 1,
    children = 0,
    infants = 0,
    flight,
    returnFlight,
    fareType,
    fareType1,
    tripType,
  } = location.state || { adults: 1, children: 0, infants: 0 };

  console.log(location.state);

  interface PassengerData {
    title: string;
    firstName: string;
    lastName: string;
    dob: string;
    email?: string;
    indentityno?: string;
  }

  const generateInitialData = (count: number): PassengerData[] =>
    Array.from({ length: count }, () => ({
      title: "",
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      indentityno: "",
    }));

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

  const [allTickets, setAllTickets] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const firstAdult = adultData[0];
    const email1 = firstAdult.email;
    const identityNo1 = firstAdult.indentityno;
    let passengerCount =
      adultData.length + childData.length + infantData.length;

    const ticket = {
      flight_id: flight.flight_id,
      email: email1,
      identity_no: identityNo1,
      seat_number: "",
      price: flight.price,
      departure: flight.departure_code,
      arrival: flight.arrival_code,
      departure_time: new Date(flight.departure_time).toISOString(),
      arrival_time: new Date(flight.arrival_time).toISOString(),
      booked_at: new Date().toISOString(),
    };

    let returnTicket;
    if (tripType === "round-trip") {
      returnTicket = {
        flight_id: returnFlight.flight_id,
        email: email1,
        identity_no: identityNo1,
        seat_number: "",
        price: returnFlight.price,
        departure: returnFlight.departure_code,
        arrival: returnFlight.arrival_code,
        departure_time: new Date(returnFlight.departure_time).toISOString(),
        arrival_time: new Date(returnFlight.arrival_time).toISOString(),
        booked_at: new Date().toISOString(),
      };
      passengerCount *= 2;
    }

    console.log("Sending ticket:", ticket);

    try {
      const newTicketIds: string[] = [];
      for (let i = 0; i < passengerCount; i++) {
        const response = await fetch(
          "http://127.0.0.1:5000/api/ticket/tickets",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ticket),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setAllTickets(data);

        newTicketIds.push(data.ticket_id.toString());
        console.log("Ticket created successfully:", data);
      }
      setTicketIds(newTicketIds);
    } catch (error) {
      console.error("Error:", error);
    }

    if (tripType === "roundtrip") {
      const returnTicket = {
        flight_id: returnFlight.flight_id,
        email: email1,
        identity_no: identityNo1,
        seat_number: "",
        price: returnFlight.price,
        departure: returnFlight.departure_code,
        arrival: returnFlight.arrival_code,
        departure_time: new Date(returnFlight.departure_time).toISOString(),
        arrival_time: new Date(returnFlight.arrival_time).toISOString(),
        booked_at: new Date().toISOString(),
      };

      try {
        console.log("check");
        const newTicketIds: string[] = [];
        for (let i = 0; i < passengerCount; i++) {
          const response = await fetch(
            "http://127.0.0.1:5000/api/ticket/tickets",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(returnTicket),
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }

          const data = await response.json();
          setAllTickets(data);

          newTicketIds.push(data.ticket_id.toString());
          console.log("Ticket created successfully:", data);
        }
        setTicketIds(newTicketIds);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    setDialogOpen(true);
  };

  return (
    <>
      <UserProvider>
        {localStorage.getItem('currentUser') === null ? <TopNavBar /> : <UserNavBar />}
      </UserProvider>
      <div className="form-container">
        <h2 className="form-title">Nhập thông tin hành khách</h2>
        <form onSubmit={handleSubmit} className="passenger-form">
          {/* Adult Forms */}
          {adultData.map((_, index) => (
            <div key={`adult-${index}`} className="passenger-section">
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
              <div className="form-group">
                <label>Email*</label>
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange({
                      index,
                      field: "email",
                      value: e.target.value,
                      type: "adult",
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>CCCD*</label>
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange({
                      index,
                      field: "indentityno",
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
      {isDialogOpen && (
        <Dialog
          title="Đặt vé thành công"
          description="Vé của bạn đã được đặt thành công. Vui lòng kiểm tra email để xem chi tiết."
          onClose={() => setDialogOpen(false)}
          ticketId={ticketIds.join(", ")}
        ></Dialog>
      )}
      <Footer />
    </>
  );
};

export default PassengerInfoForm;
