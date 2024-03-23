import React, {useState, useEffect} from "react";
import {encode} from "bcbp";
// import AztecBarcode from "./AztecBarcode";
const InputFields = () => {
    const [airportCode, setAirportCode] = useState('');
    const [firstName, setFirstName] = useState('Matthew');
    const [lastName, setLastName] = useState('Markose');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [flightNumber, setFlightNumber] = useState(0);
    const [currentDate, setCurrentDate] = useState(0);

    useEffect(() => {
        const generateFlightNumber = () => {
            setFlightNumber(Math.floor(Math.random() * 9000)+1000);
        };

        // Generate a random reference number on component mount
        generateFlightNumber();
    }, []);

    useEffect(() => {
        const calculateDayNumber = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();

            // Calculate days passed in previous months
            const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            let totalDays = 0;
            for (let i = 0; i < month; i++) {
                totalDays += daysInMonths[i];
            }

            // Add current day for the current month
            totalDays += day;

            // Check for leap year for February
            if (year % 4 === 0 && month>1) {
                totalDays++;
            }

            setCurrentDate(totalDays);
        };

        calculateDayNumber();
    }, []);

    useEffect(() => {
        const generateReferenceNumber = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let reference = '';
            for (let i = 0; i < 3; i++) {
                reference += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            for (let i = 0; i < 3; i++) {
                reference += Math.floor(Math.random() * 10);
            }
            setReferenceNumber(reference);
        };

        // Generate a random reference number on component mount
        generateReferenceNumber();
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

    const getFormattedName = () => {
        const fullName = `${lastName.toUpperCase()}/${firstName.toUpperCase()}`;
        // Add trailing spaces to fill the remaining space in the 20 character limit
        return fullName.padEnd(20, ' ');
    };

    const formatRawData = ()=>{
        // const rawData = `M1${getFormattedName()}E${referenceNumber} ${airportCode.toUpperCase()}FNJJSR${flightNumber} ${currentDate}F003D0010 100`;
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
                        fastTrack:true,
                        frequentFlyerNumber:1711218796000,
                        airlineInfo:"JR00180YFCK13E"
                    },
                ],
                passengerName: lastName.toUpperCase()+"/"+firstName.toUpperCase(),
                boardingPassIssuanceSource : 'W',
                boardingPassIssuerDesignator: "JR",
                issuanceDate: new Date(),
                documentType: "B"

            },
        });
        console.log(output);
        return output;
    }

    const getUrl = () => {
        return `https://barcode.tec-it.com/barcode.ashx?data=${formatRawData()}&code=Aztec`;
    }

    return (
        <div>
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
            {/*<p>*/}
            {/*    {formatRawData()}*/}
            {/*</p>*/}
            <div>
            {airportCode.length === 3 ? <img src={getUrl()}/> : <div/>}
            </div>
            {/*<div className={"barcode-modal"}>*/}
            {/*    {airportCode.length === 3 ? <AztecBarcode data={formatRawData()}/>:<div/>}*/}
            {/*</div>*/}

        </div>
    );
};
export default InputFields;