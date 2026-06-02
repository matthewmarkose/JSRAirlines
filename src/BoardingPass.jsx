import React from "react";
import planeImage from "./ram_on_plane.png";
import "./BoardingPass.css";

const BoardingPass = ({ name, departureAirport, arrivalAirport, seatNumber }) => {
    return (
        <div className="boarding-pass">
            <header className="boarding-pass__header">
                <img className="boarding-pass__logo" src={planeImage} alt="" />
                <span className="boarding-pass__airline">Jai Shri Ram Airlines</span>
            </header>

            <section className="boarding-pass__body">
                <div className="boarding-pass__airport boarding-pass__align-left">
                    <span className="boarding-pass__label">From</span>
                    <span className="boarding-pass__code">{departureAirport}</span>
                </div>
                <span className="boarding-pass__connector" aria-hidden="true">✈</span>
                <div className="boarding-pass__airport boarding-pass__align-right">
                    <span className="boarding-pass__label">To</span>
                    <span className="boarding-pass__code">{arrivalAirport}</span>
                </div>
                <div className="boarding-pass__field boarding-pass__align-left">
                    <span className="boarding-pass__label">Passenger</span>
                    <span className="boarding-pass__value">{name}</span>
                </div>
                <div className="boarding-pass__field boarding-pass__align-right">
                    <span className="boarding-pass__label">Seat</span>
                    <span className="boarding-pass__value">{seatNumber}</span>
                </div>
            </section>
        </div>
    );
};

export default BoardingPass;
