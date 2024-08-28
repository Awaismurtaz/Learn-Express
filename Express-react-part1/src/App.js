import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/authentication/register';
import Login from './components/authentication/login';
import Home from './components/pages/myJobs';
import ForgotPassword from './components/authentication/forgotPassword';
import ResetPassword from "./components/authentication/resetPassword"
import Activate from './components/authentication/activate'
import Layout from './components/layout/layout';
import CreateJob from './components/pages/createJob'
import { useState } from 'react';

function App() {
  const [job, setJob] = useState()
  return (
    <div >
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
          <Route path='/activate' element={<Activate />} />
          <Route path='/guest' element={<Layout />}>
            <Route path='my-jobs' element={<Home setJob={setJob} />} />
            <Route path='create-job' element={<CreateJob />} />
            <Route path='create-job/:id' element={<CreateJob job={job} />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
