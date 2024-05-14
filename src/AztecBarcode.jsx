import React, { useEffect, useRef } from 'react';
import bwipjs from 'bwip-js'; // Assuming you have bwipjs installed

const AztecBarcode = ({data}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        try {
            // The return value is the canvas element
            bwipjs.toCanvas(canvasRef.current, {
                bcid: 'azteccode', // Barcode type
                text: data, // Text to encode
                backgroundcolor: "#FFFFFF"
            });
        } catch (error) {
            // Handle errors gracefully, e.g., log to console or display user-friendly message
            console.error('AztecBarcode error:', error);
        }
    }); // Empty dependency array ensures initialization only once

    return (
        <canvas id="mycanvas" ref={canvasRef}/> // Pass the ref to the canvas element
    );
};

export default AztecBarcode;
