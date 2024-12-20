import React, { Children, useState } from "react";
import "./Dialog.css";
import { Navigate, useNavigate } from "react-router-dom";

const Dialog1: React.FC<{
  title: string;
  description?: string;
  onClose: () => void;
}> = ({ title, description, onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2 className="dialog-title">{title}</h2>
          <button className="dialog-close" onClick={onClose}>
            &times;
          </button>
        </div>
        {description && <p className="dialog-description">{description}</p>}
        <div className="dialog-content"></div>
        <div style={{ textAlign: "center", paddingBottom: "10px" }}>
          <button onClick={() => navigate("/")}>Quay về trang chủ</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog1;
