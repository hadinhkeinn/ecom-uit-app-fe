import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import axios from "axios";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  axios.defaults.withCredentials = true;

  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
