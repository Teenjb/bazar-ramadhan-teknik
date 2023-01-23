import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import React from "react";
import Home from "./Pages/Home";
import ResponseGood from "./Pages/ResponseGood";
import ResponseBad from './Pages/ResponseBad';
function App() {
    return (
        <Router>
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/goodresponse" element={<ResponseGood />} />
            <Route exact path="/badresponse" element={<ResponseBad />} />
            <Route
              path="*"
              element = {<Navigate to="/home" />}
            />
          </Routes>
        </Router>
    );
}

export default App;
