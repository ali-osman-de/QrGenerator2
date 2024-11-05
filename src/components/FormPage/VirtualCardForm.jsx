import { Button, Form, Input, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setName, setPhoneNumber, setJob, setEmail, setAboutSelf, setAddress, setPhoneType, setEmailType } from '../../features/formSlice';
import { useState } from 'react';

const VirtualCardForm = ({ setFormSubmit }) => {
    const dispatch = useDispatch();
    const formValues = useSelector((state) => state.form);

    const [phoneTypes] = useState([
        { value: 'No label', label: 'No label' },
        { value: 'Mobile', label: 'Mobile' },
        { value: 'Work', label: 'Work' },
        { value: 'Home', label: 'Home' },
        { value: 'Main', label: 'Main' },
    ]);

    const [emailTypes] = useState([
        { value: 'No label', label: 'No label' },
        { value: 'Home', label: 'Home' },
        { value: 'Work', label: 'Work' },
        { value: 'Other', label: 'Other' },
    ]);

    const onFinish = () => {
        setFormSubmit(true)
    };



    return (
        <Form
            name="virtual_card_form"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
            autoComplete="off"
        >
            {/* Ad Soyad Kismi */}
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please enter your full name!' }]}
            >
                <Input placeholder="Full Name" onChange={(e) => { dispatch(setName(e.target.value)) }} />
            </Form.Item>

            {/* Job */}
            <Form.Item
                name="job"
                rules={[{ required: true, message: 'Please enter your job!' }]}
            >
                <Input placeholder="What is your job?" onChange={(e) => { dispatch(setJob(e.target.value)) }} />
            </Form.Item>

            {/* AboutYourSelf */}
            <Form.Item
                name="aboutYourself"
                rules={[{ required: true, message: 'Please tell us about yourself!' }]}
            >
                <Input placeholder="About yourself?" onChange={(e) => { dispatch(setAboutSelf(e.target.value)) }} />
            </Form.Item>

            {/* Gsm Kismi */}
            <div className='d-flex justify-content-start'>
                <Form.Item
                    className='w-25'
                    name="phoneTypes"
                    rules={[{ required: true, message: 'Lütfen bir telefon türü seçin!' }]}
                >
                    <Select placeholder="Select" onChange={(value) => {dispatch(setPhoneType(value)) }}>
                        {phoneTypes.map((type) => (
                            <Select.Option key={type.value} value={type.value}>
                                {type.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    className='w-75'
                    name="gsm"
                    rules={[{ required: true, message: 'Please enter your GSM number!' }]}
                >
                    <Input placeholder='(5xx) xxx xxxx' onChange={(e) => { dispatch(setPhoneNumber(e.target.value)) }} />
                </Form.Item>
            </div>

            {/* Email Kismi */}
            <div className='d-flex justify-content-start'>
                <Form.Item
                    className='w-25'
                    name="emailType"
                    rules={[{ required: true, message: 'Lütfen bir email türü seçin!' }]}
                >
                    <Select
                        placeholder="Select"
                        onChange={(value) => dispatch(setEmailType(value))}
                    >
                        {emailTypes.map((type) => (
                            <Select.Option key={type.value} value={type.value}>
                                {type.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    className='w-75'
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input placeholder="email@example.com" onChange={(e) => { dispatch(setEmail(e.target.value)) }} />
                </Form.Item>
            </div>

            {/* Live Kismi */}
            <Form.Item
                name="live"
                rules={[{ required: true, message: 'Please enter your location!' }]}
            >
                <Input placeholder="Address" onChange={(e) => { dispatch(setAddress(e.target.value)) }} />
            </Form.Item>

            {/* Submit Kismi */}

            <Form.Item className="text-center">
                <Button type="primary" htmlType="submit">
                    Generate QR
                </Button>
            </Form.Item>
        </Form>

    )
}

export default VirtualCardForm;
