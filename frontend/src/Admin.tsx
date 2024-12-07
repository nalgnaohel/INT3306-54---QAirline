import React from "react";
import SideBar from "./components/Admin/SideBar";
import TopBar from "./components/Admin/TopBar";

const Admin: React.FC = () => {
    return (
        <div className="Admin">
            <TopBar />
            <SideBar />
        </div>
    );
};

export default Admin;