import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import "./NavigationBar.css"

const NavigationBar = () => {
    return (
        <>
            <Navbar
                style={{
                    backgroundColor: "#F7FFF7"
                }}
            >
                <a href="/"><img src="vite.svg" alt="logo" className='mx-5' width={36} /></a>
                <div className='d-flex justify-content-center mx-end m-3 mx-5'>
                    <NavbarBrand className='nav-link fs-5 fw-light mx-3' href="/generate">
                        Generate
                    </NavbarBrand>
                </div>

            </Navbar>
        </>
    )
}

export default NavigationBar