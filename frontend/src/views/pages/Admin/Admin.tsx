import React from "react";
import SideBar from "../../../components/Admin/SideBar";
import TopBar from "../../../components/Admin/TopBar";
import Table from "../../../components/Admin/Table";
import UserNavbar from "../../../components/UserNavbar/UserNavbar";
import { TableProvider } from '../../../components/Admin/TableContext';
import background from "../../../assets/images/plane.png"
import "./Admin.css"

const Admin: React.FC = () => {
    return (
        <TableProvider>
            <div className="Admin">
                <div className="background"></div>
                <div className="background">
                    <img className="background3" src={background} />
                    <div className="background1"></div>
                    <div className="background2"></div>
                </div>
                
                <Table />
                <SideBar />
                <TopBar />
            </div>
        </TableProvider>
    );
};

export default Admin;