import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import React from "react";
import Home from "./Pages/Home";
import Response from "./Pages/Response";
function App() {
    return (
        <Router>
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/Response" element={<Response />} />
            <Route
              path="*"
              element = {<Navigate to="/home" />}
            />
          </Routes>
        </Router>
    );
}

export default App;
