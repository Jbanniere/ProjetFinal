import React from 'react';
import {StoreContext} from "./tools/context.js"
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx"
import ErrorPage from "./components/ErrorPage.jsx"

function App() {
  const [state, dispatch] = React.useContext(StoreContext)
  
  const increment = () => {
      dispatch({
        type : 'INCR' ,
      })
  }
  
   const decrement = () => {
      dispatch({
        type : 'DECR' ,
      })
  }
  
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="logs" element={<Log />} />
        <Route path="*" element = {<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

