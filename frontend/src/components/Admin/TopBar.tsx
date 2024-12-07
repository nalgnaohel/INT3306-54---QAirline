import React from "react";
import combinedShape from "../../assets/images/Admin/icon.svg";
import dropDown from "../../assets/images/Admin/drop-down.svg";
import flag from "../../assets/images/Admin/flag.png";
import image from "../../assets/images/Admin/oval2.svg";
import man438081960720 from "../../assets/images/Admin/man-438081-960-720.png";
import more from "../../assets/images/Admin/more.svg";
import oval from "../../assets/images/Admin/oval1.svg";
import "../../css/Admin/TopBar.css";
const TopBar: React.FC = () => {
    return (
        <div className="box">
            <div className="top-bar">
                <div className="overlap">
                    <div className="separator"></div>
                    <div className="profile">
                        <img className="more" alt="More" src={more} />
                        <div className="username">Admin</div>
                        <div className="text-wrapper">Admin</div>
                        <img className="man" alt="Man" src={man438081960720} />
                    </div>
                    <div className="english">
                        <div className="div">Tiếng Việt</div>
                        <img className="drop-down" alt="Drop down" src={dropDown} />
                        <img className="flag" alt="Flag" src={flag} />
                    </div>
                    <div className="overlap-group">
                        <div className="icon">
                            <div className="overlap-group-2">
                                <div className="icon-2">
                                    <img className="combined-shape" alt="Combined shape" src={combinedShape} />
                                </div>
                                <img className="oval" alt="Oval" src={oval} />
                                <div className="text-wrapper-2">6</div>
                            </div>
                        </div>
                        <img className="img" alt="Oval" src={image} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;