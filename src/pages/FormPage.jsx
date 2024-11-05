import React, { useEffect, useState } from 'react'
import VirtualCardForm from '../components/FormPage/VirtualCardForm'
import { Container, Col, Row } from 'reactstrap'
import NavigationBar from "../components/NavigationBar"
import PreviewCard from '../components/FormPage/PreviewCard'
const FormPage = () => {
  const [typeOfPhone, setTypeOfPhone] = useState();
  const [typeOfEmail, setTypeOfEmail] = useState();
  const [formSubmit, setFormSubmit] = useState(false);





  return (
    <>
      <NavigationBar />
      <Container>
        <Row className="mt-5">
          <Col xs={6}>
            <VirtualCardForm setFormSubmit={setFormSubmit} setTypeOfPhone={setTypeOfPhone} setTypeOfEmail={setTypeOfEmail} />
          </Col>
          <Col xs={6} className="d-flex justify-content-center align-items-center">
            <PreviewCard typeOfPhone={typeOfPhone} typeOfEmail={typeOfEmail} formSubmit={formSubmit} setFormSubmit={setFormSubmit}/>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default FormPage