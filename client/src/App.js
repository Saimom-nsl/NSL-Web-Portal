import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Body/Home';
import Login from './Body/Login';
import Signup from './Body/Signup';
import Navbar from './Shared/Navbar';
import EmployeeActivation from './Body/EmployeeActivation';
import ChangePassword from './Components/ChangePassword';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path='/changepassword' element={<ChangePassword />} />
        <Route path="/activation/:url" element={<EmployeeActivation />}></Route>
      </Routes>
    </div>
  );
}

export default App;
