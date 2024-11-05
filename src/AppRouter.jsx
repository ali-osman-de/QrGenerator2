import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormPage from './pages/FormPage';
import ErrorPage from './pages/ErrorPage'
function AppRouter() {


    return (
        <Router>
            <Routes>
                <Route path="/" element={<FormPage />} />
                <Route path="/generate" element={<FormPage />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}

export default AppRouter