import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './Body/Login';
import ChangePassword from './Components/ChangePassword';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import DashNav from './Shared/DashNav';
import EmployeeList from './Components/EmployeeComponents/EmployeeList';
import EmployeeProfile from './Components/EmployeeProfile/EmployeeProfile';
import Leave from './pages/Leave';
import Projects from './pages/Projects';
import SingleProjectInfo from './pages/SingleProjectInfo';
import EditProfile from './Components/EditProfile/EditProfile';
import AddEmp from './Components/EmployeeProfileComponents/addemp/AddEmp';
import AdminRoute from './Components/SuperAdminRoute/AdminRoute';
import Profile from './pages/Profile';
import ProfileNotFound from './Components/NotFoundPages/ProfileNotFound';

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
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
        <Route path='/employees' element={<PrivateRoute><EmployeeList /></PrivateRoute>}></Route>
        <Route path='/addemployee' element={<AdminRoute><AddEmp /></AdminRoute>}></Route>
        <Route path='/leave' element={<PrivateRoute>< Leave/></PrivateRoute>}></Route>
        <Route path='/projects' element={<PrivateRoute>< Projects/></PrivateRoute>}></Route>
        <Route path='/editprofile' element={<AdminRoute>< EditProfile/></AdminRoute>}></Route>
        <Route path='/profilenotfound' element={<PrivateRoute>< ProfileNotFound/></PrivateRoute>}></Route>
        <Route path='/employees/:pid' element={<PrivateRoute><EmployeeProfile /></PrivateRoute>}></Route>
        <Route path='/employees/:pid/update' element={<AdminRoute><EditProfile /></AdminRoute>}></Route>
        <Route path='/projects/:pid' element={<PrivateRoute><SingleProjectInfo /></PrivateRoute>}></Route>


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
