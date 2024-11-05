import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from 'antd';
import { IoIosCloudDownload } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";



const QrCodeForm = ({ setFormSubmit }) => {
    const formValues = useSelector((state) => state.form);


    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${formValues.name}
TEL;TYPE=${formValues.phoneType},VOICE:+90${formValues.phoneNumber}
EMAIL;TYPE=${formValues.emailType}:${formValues.email}
ADR;TYPE#HOME:${formValues.address};
PHOTO;TYPE=JPEG;VALUE=URI:https://firebasestorage.googleapis.com/v0/b/qrcreatorbyunique.appspot.com/o/avatars%2F1705770294093.jpeg?alt=media&token=c588a1c6-2235-4000-b385-f358217760d4;
END:VCARD`;


    const downloadVCard = () => {
        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formValues.name || 'contact'}.vcf`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const downloadQRCode = () => {
        const canvas = document.querySelector('#qrCodeCanvas');
        if (canvas) {
            const pngUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = pngUrl;
            a.download = `${formValues.name || 'contact'}_qrcode.png`;
            a.click();
        }
    };

    const handleBackClick = () => {
        setFormSubmit(false);
    };


    return (<>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }} className='mb-5'>
            <Button type="default" onClick={handleBackClick} className='d-flex justify-content-start align-items-center '>
                <IoArrowBackCircleOutline size={18} /> Back
            </Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='mb-5'>
            <QRCodeCanvas
                id="qrCodeCanvas"
                value={vCardData}
                size={200}
                level={"H"}
            />
        </div>
        <div className='d-flex justify-content-evenly align-items-center'>
            <Button type="primary" onClick={downloadVCard}>
                <IoIosCloudDownload size={14} /> vCard
            </Button>
            <Button type="primary" onClick={downloadQRCode}>
                <IoIosCloudDownload size={14} /> QR Code
            </Button>
        </div>
    </>
    );
};

export default QrCodeForm;
