import React from "react";
import UserControlPanel from "../../../components/UserControlPanel/UserControlPanel"
import UserNavbar from "../../../components/UserNavbar/UserNavbar";
import UserContent from "../../../components/UserContent/UserContent";
import { UserProvider } from "../../../components/UserContent/UserContext";
import './User.css'


const User: React.FC = () => {
    return (
        <UserProvider>
            <div className="User">
                <div className="background"></div>
                <UserContent />
                <UserControlPanel />
                <UserNavbar />
            </div>
        </UserProvider>
    );
};

export default User