import React, { Children, useState } from "react";
import "./Dialog.css";
import { Navigate, useNavigate } from "react-router-dom";

const Dialog: React.FC<{
  title: string;
  description?: string;
  onClose: () => void;
  ticketId: string;
}> = ({ title, description, onClose, ticketId }) => {
  const ticketIds = ticketId.split(",");
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
        <div className="dialog-content">
          <div>
            <h3>Mã đặt vé:</h3>
            <ul style={{ listStyleType: "none" }}>
              {ticketIds.map((ticketId) => (
                <li key={ticketId}>{ticketId}</li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ textAlign: "center", paddingBottom: "10px" }}>
          <button onClick={() => navigate("/")}>Quay về trang chủ</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;

// const App: React.FC = () => {
//   const [isDialogOpen, setDialogOpen] = useState(false);

//   return (
//     <div className="app">
//       <button className="open-dialog-button" onClick={() => setDialogOpen(true)}>
//         Open Dialog
//       </button>
//       {isDialogOpen && (
//         <Dialog
//           title="Dialog Title"
//           description="This is a description."
//           onClose={() => setDialogOpen(false)}
//         >
//           <p>Here is some content inside the dialog.</p>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default App;
