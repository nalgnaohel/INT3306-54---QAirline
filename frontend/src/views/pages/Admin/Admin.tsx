import React from "react";
import SideBar from "../../../components/Admin/SideBar";
import TopBar from "../../../components/Admin/TopBar";
import Table from "../../../components/Admin/Table";
import { TableProvider } from '../../../components/Admin/TableContext';
import "./Admin.css"

const Admin: React.FC = () => {
    return (
        <TableProvider>
            <div className="Admin">
                <div className="background"></div>
                <Table />
                <TopBar />
                <SideBar />
            </div>
        </TableProvider>
    );
};

export default Admin;