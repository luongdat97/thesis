import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import Routes from './pages/Routes'
import './App.scss';
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProvideAuth, PrivateRoute } from './components/authenticate'
import {
  BrowserRouter,
  Switch
} from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <ProvideAuth>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ProvideAuth>


    </div>
  );
}

export default App;
