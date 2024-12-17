import React from "react";
import "./CruisePartners.css";

const cruisePartners = [
  {
    name: "STELLAR of the seas",
    logo: "https://mixivivu.com/flight-partners/flight-partner-1.png",
  },
  {
    name: "GENESIS REGAL",
    logo: "https://mixivivu.com/flight-partners/flight-partner-2.png",
  },
  {
    name: "PARADISE VIETNAM",
    logo: "https://mixivivu.com/flight-partners/flight-partner-3.png",
  },
  {
    name: "CAPELLA CRUISE",
    logo: "https://mixivivu.com/flight-partners/flight-partner-4.png",
  },
  {
    name: "BHAYA",
    logo: "https://mixivivu.com/flight-partners/flight-partner-5.png",
  },
  {
    name: "ROSY CRUISE",
    logo: "https://mixivivu.com/flight-partners/flight-partner-13.png",
  },
  {
    name: "HERITAGE CRUISES",
    logo: "https://mixivivu.com/flight-partners/flight-partner-7.png",
  },
  {
    name: "Catherine Cruise",
    logo: "https://mixivivu.com/flight-partners/flight-partner-8.png",
  },
  {
    name: "Scarlet Pearl",
    logo: "https://mixivivu.com/flight-partners/flight-partner-9.png",
  },
  {
    name: "AMBASSADOR CRUISE",
    logo: "https://mixivivu.com/flight-partners/flight-partner-10.png",
  },
  {
    name: "ESSENCE GRAND",
    logo: "https://mixivivu.com/flight-partners/flight-partner-11.png",
  },
  {
    name: "INDOCHINA SAILS",
    logo: "https://mixivivu.com/flight-partners/flight-partner-14.png",
  },
];

const CruisePartners: React.FC = () => {
  return (
    <div className="cruise-partners">
      <div className="cointainer-cruise">
        <div className="title-feedback">
          <div className="title">
            <h2>
              Đối tác cùng <br />
              các hãng máy bay lớn
            </h2>
          </div>
          <div className="img-feed">
            <p className="subtitle">
              Đối tác hàng đầu với các hãng máy bay lớn: Ưu đãi độc quyền dành
              riêng cho bạn
            </p>
          </div>
        </div>
        <div className="logos-container">
          {cruisePartners.map((partner) => (
            <div key={partner.name} className="partner-logo">
              <img src={partner.logo} alt={partner.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CruisePartners;
