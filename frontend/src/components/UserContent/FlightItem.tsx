import React, {useState} from 'react';
import ticket from '../../assets/images/ticket.png'
import vn from '../../assets/images/vietnamairline_logo.png'
import qh from '../../assets/images/Bamboo_Airways_Logo_QH-BAV.png'
import vj from '../../assets/images/VietJet_Air_logo.svg.png'
import './FlightItem.css';

export interface FlightItemProps {
    ticketid: string;
    flightid: string;
    userid: string;
    seatnumber: string;
    ticketclass: string;
    status: string;
    from: string;
    datefrom: string;
    timeFrom: string;
    codeFrom: string;
    to: string;
    dateto: string;
    timeTo: string;
    codeTo: string;
    airline: string;
}

const FlightItem: React.FC<FlightItemProps> = ({
    ticketid,
    flightid,
    userid,
    seatnumber,
    ticketclass,
    status,
    from,
    datefrom,
    timeFrom,
    codeFrom,
    to,
    dateto,
    timeTo,
    codeTo,
    airline,
}) => {

    const [isActiveDetail, setActiveDetail] = useState<boolean | null>(false);

  return (
    <div className="flight-item">
        <div className='ticket-up'>
            <div className='ticket-left'>
                <div className="flight-status">
                    {status == "ongoing" && (<div className='ticket-status'><div className='ticket-status-icon-ongoing'></div><div className="ticket-ongoing">Ongoing</div></div>)}
                    {status == "canceled" && (<div className='ticket-status'><div className='ticket-status-icon-canceled'></div><div className="ticket-canceled">Canceled</div></div>)}
                    {status == "completed" && (<div className='ticket-status'><div className='ticket-status-icon-completed'></div><div className="ticket-completed">Completed</div></div>)}
                </div>
                <img className="ticket-icon" src={ticket} />
            </div>
            <div className='ticket-right'>
                <div className="ticket-info">
                    <div className='ticket-header'>
                        <div>From <b>{from}</b> → To <b>{to}</b></div>
                        {airline == "VN" && (<img className='ticket-airline-logo' src={vn} />)}
                        {airline == "QH" && (<img className='ticket-airline-logo' src={qh} />)}
                        {airline == "VJ" && (<img className='ticket-airline-logo' src={vj} />)}
                    </div>
                    <div className='ticket-content'>
                        <div className="ticket-from">
                            <div>{datefrom}</div>
                            <div>{timeFrom}</div>
                            <div className='code'>{codeFrom}</div>
                        </div>
                        <div className="ticket-to">
                            <div>{dateto}</div>
                            <div>{timeTo}</div>
                            <div className='code'>{codeTo}</div>
                        </div>
                        <div className='ticket-action'>
                            <button className='ticket-more-detail' onClick={() => {
                                setActiveDetail(!isActiveDetail);
                            }}>Xem thêm</button>
                            {status == "ongoing" && (<button className='ticket-checking'>Làm thủ tục</button>)}
                            {status == "ongoing" && (<button className='ticket-cancel'>Hủy vé</button>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {isActiveDetail && (
            <div className='ticket-detail'>
                <div className='ticket-detail-content'>
                    <div className='left-column'>
                        <div className='label'>Mã số vé</div>
                        <div className='label'>Mã số chuyến bay</div>
                        <div className='label'>Mã người dùng</div>
                        <div className='label'>Ghế số</div>
                        <div className='label'>Hạng vé</div>
                    </div>
                    <div className='right-column'>
                        <div className='data'>{ticketid}</div>
                        <div className='data'>{flightid}</div>
                        <div className='data'>{userid}</div>
                        <div className='data'>{seatnumber}</div>
                        <div className='data'>{ticketclass}</div>
                    </div>
                </div>
                <div className='ticket-detail-footer'>
                    <div className='qairline'>QAirline</div>
                </div>
            </div>
        )}
    </div>
  );
};

export default FlightItem;
