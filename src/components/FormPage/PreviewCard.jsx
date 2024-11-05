import React, { useState, useRef } from 'react';
import { Card, Col, Row, message, Upload, Button } from 'antd';
import { useSelector } from 'react-redux';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import QrCodeForm from './QrCodeForm';
import imageCompression from 'browser-image-compression';
import { IoIosCloudDownload } from "react-icons/io";
import html2canvas from 'html2canvas';


const PreviewCard = ({ formSubmit, setFormSubmit }) => {
    const { name, phoneNumber, job, email, aboutSelf, address, phoneType, emailType } = useSelector((state) => state.form);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [ImageBase64, setImageBase64] = useState();
    const cardRef = useRef(null);


    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                resolve(reader.result);
            };

            reader.onerror = (error) => {
                reject(error);
            };


            reader.readAsDataURL(file);
        });
    };


    const handleUpload = async (options) => {
        const { file, onSuccess, onError } = options;
        setLoading(true);

        try {
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 0.2,
                maxWidthOrHeight: 800,
                useWebWorker: true,
            });

            const base64String = await convertToBase64(compressedFile);
            setImageBase64(base64String);

            const fileRef = ref(storage, `avatars/${file.name}`);
            await uploadBytes(fileRef, compressedFile);
            const downloadURL = await getDownloadURL(fileRef);

            setImageUrl(downloadURL);
            onSuccess("Upload successful");
            message.success('Upload successful!');
        } catch (error) {
            onError(error);
            message.error(`Upload failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const downloadCard = () => {
        if (cardRef.current) {
            html2canvas(cardRef.current).then((canvas) => {

                const base64Image = canvas.toDataURL("image/png");


                const link = document.createElement("a");
                link.href = base64Image;
                link.download = "card.png";
                link.click();
            });
        }
    };


    return (
        <>
            {!formSubmit ? (
                name ? (
                    <Card
                        ref={cardRef}
                        style={{
                            width: 350,
                            backgroundColor: '#ffffff',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <div className="d-flex flex-column align-items-center">
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                className="avatar-uploader"
                                showUploadList={false}
                                customRequest={handleUpload}
                            >
                                {imageUrl ? (
                                    <img
                                        src={ImageBase64}
                                        alt="avatar"
                                        style={{ width: '100%', borderRadius: '50%' }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>

                            <h2 className="mt-3 mb-1 fs-4 fw-semibold">{name}</h2>
                            <p className="text-muted mb-3">{job}</p>
                            <div style={{ textAlign: "justify" }}>
                                <p className="text-center mb-3" style={{ color: '#606060' }}>
                                    {aboutSelf}
                                </p>
                            </div>
                        </div>

                        {aboutSelf && <div style={{ borderBottom: '1px solid #e0e0e0', width: '100%' }}></div>}

                        <div className="d-flex justify-content-center">
                            <Card style={{ border: 'none' }}>
                                <div>
                                    {phoneNumber && (
                                        <Row className="d-flex justify-content-between mb-3">
                                            <Col xs="4" className="text-muted font-weight-bold">{phoneType} Phone</Col>
                                            <Col xs="8" className="text-dark">+90 {phoneNumber}</Col>
                                        </Row>
                                    )}
                                    {email && (
                                        <Row className="d-flex justify-content-between mb-3">
                                            <Col xs="4" className="text-muted font-weight-bold">{emailType} E-mail</Col>
                                            <Col xs="8" className="text-dark">{email}</Col>
                                        </Row>
                                    )}
                                    {address && (
                                        <Row className="d-flex justify-content-between mb-3">
                                            <Col xs="4" className="text-muted font-weight-bold">Address</Col>
                                            <Col xs="8" className="text-dark">{address}</Col>
                                        </Row>
                                    )}
                                </div>
                            </Card>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <Button onClick={downloadCard} type="primary">
                                <IoIosCloudDownload size={14} /> Virtual Card
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <></>
                )
            ) : (
                <Card
                    style={{
                        width: 350,
                        padding: '20px',
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center'
                    }}
                >
                    <QrCodeForm formSubmit={formSubmit} setFormSubmit={setFormSubmit} />
                </Card>
            )}
        </>
    );
};

export default PreviewCard;
