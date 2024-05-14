import React, {useState, useEffect} from "react";
import {encode} from "bcbp";
import AztecBarcode from "./AztecBarcode";
import BoardingPass from "./BoardingPass";

const InputFields = () => {
    const [airportCode, setAirportCode] = useState('');
    const [firstName, setFirstName] = useState('Matthew');
    const [lastName, setLastName] = useState('Markose');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [flightNumber, setFlightNumber] = useState(0);

    useEffect(() => {
        setFlightNumber(Math.floor(Math.random() * 9000)+1000);
    }, []);

    useEffect(() => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let reference = '';
        for (let i = 0; i < 3; i++) {
            reference += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        for (let i = 0; i < 3; i++) {
            reference += Math.floor(Math.random() * 10);
        }
        setReferenceNumber(reference);
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'airportCode':
                setAirportCode(value); // Limit airport code to 3 characters
                break;
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            default:
                break;
        }
    };

    const formatRawData = ()=>{
        let output = encode({
            data: {
                legs: [
                    {
                        operatingCarrierPNR: referenceNumber,
                        departureAirport: airportCode.toUpperCase(),
                        arrivalAirport: "FNJ",
                        operatingCarrierDesignator: "JR",
                        flightNumber: flightNumber,
                        flightDate: new Date(),
                        compartmentCode: "J",
                        seatNumber: "003D",
                        checkInSequenceNumber: "0015",
                        passengerStatus: "1",
                        fastTrack:true
                    },
                ],
                passengerName: lastName.toUpperCase()+"/"+firstName.toUpperCase(),
                boardingPassIssuanceSource : 'W',
                boardingPassIssuerDesignator: "JR",
                issuanceDate: new Date(),
                documentType: "B"

            },
        });
        return output;
    }

    return (
        <div>

            <div className={"inputs"}>
                <input
                    type="text"
                    name="airportCode"
                    maxLength={3}
                    placeholder="Airport Code (e.g., SFO)"
                    value={airportCode}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleInputChange}
                />
            </div>
            <div className={"boarding_pass"} style={{paddingTop:50, paddingBottom:500}}>
                {airportCode.length === 3 &&
                    <div>
                        <BoardingPass name={firstName.toUpperCase() + " " + lastName.toUpperCase()}
                                      arrivalAirport={"FNJ"}
                                      departureAirport={airportCode.toUpperCase()}
                                      seatNumber={"3D"}/>
                        <AztecBarcode data={formatRawData()}/>
                    </div>}
            </div>

        </div>
    );
};
export default InputFields;