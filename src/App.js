
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import ActivitySelect from './Components/assets/ActivitySelect';

import ContextProvider from './Context';

import Footer from './Components/assets/Footer';
import Header from './Components/assets/Header';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './Components/screens/Home';
import Login from './Components/screens/Login';
import Progress from './Components/screens/Progress';
import Timer from './Components/screens/Timer';
import Workouts from './Components/screens/Workouts';
import AllWorkouts from './Components/screens/AllWorkouts';
import Notfound from './Components/screens/Notfound';

function App() {

  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <main className='container'>
                <Outlet />
              </main>
              <Footer />
            </>
          }>
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="progress" element={<Progress />} />
            <Route path="timer" element={<Timer />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="allworkouts" element={<AllWorkouts />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );

}

export default App;
