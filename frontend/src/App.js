import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import Routes from './pages/Routes'
import './App.scss';
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {
  BrowserRouter,
  Switch
} from "react-router-dom";

const App =() => {
  console.log("huuuuuuuuuuuuuuuuuuu")
  return (
    <div className="App">
      <BrowserRouter>
              <Routes />
      </BrowserRouter>
        
    </div>
  );
}

export default App;
