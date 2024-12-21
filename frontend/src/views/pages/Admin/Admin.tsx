import React from "react";
import SideBar from "../../../components/Admin/SideBar";
import TopBar from "../../../components/Admin/TopBar";
import Table from "../../../components/Admin/Table";
import UserNavbar from "../../../components/UserNavbar/UserNavbar";
import { TableProvider } from '../../../components/Admin/TableContext';
import "./Admin.css"

const Admin: React.FC = () => {
    return (
        <TableProvider>
            <div className="Admin">
                <div className="background"></div>
                <Table />
                <SideBar />
                <TopBar />
            </div>
        </TableProvider>
    );
};

export default Admin;