import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './Body/Home';
import Login from './Body/Login';
import Signup from './Body/Signup';
import Navbar from './Shared/Navbar';
import EmployeeActivation from './Body/EmployeeActivation';
import ChangePassword from './Components/ChangePassword';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import DashNav from './Shared/DashNav';
import EmployeeList from './Components/EmployeeComponents/EmployeeList';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <DashNav />
      <div className='body-content'>

      <Routes>
        {/* <Route path="/" exact element={<Home/>}></Route> */}
        <Route path="/" element={<Login/>}></Route>
        {/* login-user-dashboard-route-link */}
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
        <Route path='/employees' element={<PrivateRoute><EmployeeList /></PrivateRoute>}></Route>
        
        {/* <Route path="/signup" element={<Signup/>}></Route> */}
        {/* <Route path='/changepassword' element={<ChangePassword />} /> */}
        {/* <Route path="/activation/:url" element={<EmployeeActivation />}></Route> */}
        <Route path="*" element={<Navigate to={"/"} />}></Route>
      
      </Routes>
      </div>
    </div>
  );
}

export default App;
