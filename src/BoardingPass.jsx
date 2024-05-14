import React from "react";
import planeImage from "./ram_on_plane.png";

const BoardingPass = ({ name, departureAirport, arrivalAirport, seatNumber }) => {
    return (
        <div className="boarding-pass">
            {/*style={{marginTop:50, marginBottom:500}}*/}
            {/* Airline and Logo */}
            <div className="airline">
                <img id={"rama"} src={planeImage} alt="Plane Logo" width={'100%'}/>
                <p>Jai Shri Ram Airlines</p>
            </div>

            {/* Passenger Information */}
            <div className="passenger-info">
                <p>Passenger: {name}</p>
                <p>Seat: {seatNumber}</p>
            </div>

            {/* Flight Information */}
            <div className="flight-info">
                <p>Departure: {departureAirport}</p>
                <p>Arrival: {arrivalAirport}</p>
            </div>

            {/*/!* Boarding Information *!/*/}
            {/*<div className="boarding-details">*/}
            {/*    <p>Boarding Time: 12:30 PM</p>*/}
            {/*    <p>Gate: A12</p>*/}
            {/*</div>*/}
        </div>
    );
};

export default BoardingPass;
