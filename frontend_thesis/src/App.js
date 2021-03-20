import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import Home from './pages/HomePage';
import JobDetailPage from './pages/JobDetailPage'
import Routes from './pages/Routes'
import './App.scss';
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {
  BrowserRouter,
  Switch
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Switch>
              <Routes />
            </Switch>
      </BrowserRouter>
        
    </div>
  );
}

export default App;
