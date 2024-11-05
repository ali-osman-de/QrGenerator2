import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import NavigationBar from "../components/NavigationBar"
import ErrorContainer from '../components/ErrorContainer'
const FormPage = () => {

    return (
        <>
            <NavigationBar />
            <Container>
                <Row>
                    <Col xs={12} >
                        <ErrorContainer />
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default FormPage