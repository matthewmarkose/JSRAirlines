import React, {useState, useEffect, useRef} from "react";
import {encode} from "bcbp";
import html2canvas from "html2canvas";
import AztecBarcode from "./AztecBarcode";
import BoardingPass from "./BoardingPass";

const InputFields = () => {
    const [airportCode, setAirportCode] = useState('');
    const [firstName, setFirstName] = useState('Matthew');
    const [lastName, setLastName] = useState('Markose');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [flightNumber, setFlightNumber] = useState(0);
    const boardingPassRef = useRef(null);
    const downloadLinkRef = useRef(null);

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

    const handleCaptureAndDownload = async () => {
        if (!boardingPassRef.current || !downloadLinkRef.current) return;

        try {
            const canvas = await html2canvas(boardingPassRef.current, {
                backgroundColor: '#1e1a16',
                scale: 2,
                logging: false
            });
            
            canvas.toBlob((blob) => {
                if (blob && downloadLinkRef.current) {
                    const url = URL.createObjectURL(blob);
                    downloadLinkRef.current.href = url;
                    downloadLinkRef.current.download = 'boarding-pass.png';
                    downloadLinkRef.current.click();
                    URL.revokeObjectURL(url);
                }
            }, 'image/png');
        } catch (error) {
            console.error('Error capturing boarding pass:', error);
        }
    };

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
            {airportCode.length === 3 && (
                <>
                    <button 
                        onClick={handleCaptureAndDownload}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Download Boarding Pass as Image
                    </button>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                        ref={downloadLinkRef}
                        href="#"
                        download="boarding-pass.png"
                        style={{ display: 'none' }}
                        aria-label="Download boarding pass image"
                    >
                        Download
                    </a>
                </>
            )}
            {airportCode.length === 3 && (
                <div ref={boardingPassRef} className="boarding_pass">
                    <BoardingPass name={firstName.toUpperCase() + " " + lastName.toUpperCase()}
                                  arrivalAirport={"FNJ"}
                                  departureAirport={airportCode.toUpperCase()}
                                  seatNumber={"3D"}/>
                    <img
                        className="boarding-pass__footer"
                        src={`${process.env.PUBLIC_URL}/footer@3x.png`}
                        alt=""
                    />
                    <div className="boarding-pass__tear" aria-hidden="true" />
                    <div className="boarding-pass__barcode">
                        <AztecBarcode data={formatRawData()}/>
                    </div>
                </div>
            )}

        </div>
    );
};
export default InputFields;