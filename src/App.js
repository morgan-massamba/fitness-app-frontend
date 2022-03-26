import React, { useState } from 'react';
import { AuthContext } from './context/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//COMPONENTS
import Layout from './pages/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Exercises from './pages/Exercises';
import Training from './pages/Training';
import Account from './pages/Account';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import TrainingCreate from './pages/TrainingCreate';
import Exercise from './pages/Exercise';

const App = () => {
    const [user, setUser] = useState(
        localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user'))
            : null
    );

    return (
        <AuthContext.Provider value={{ user: user, setUser: setUser }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route
                            index
                            element={
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="training/new"
                            element={
                                <PrivateRoute>
                                    <TrainingCreate />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="training/:id"
                            element={
                                <PrivateRoute>
                                    <Training />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="exercises"
                            element={
                                <PrivateRoute>
                                    <Exercises />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="exercises/:id"
                            element={
                                <PrivateRoute>
                                    <Exercise />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="account"
                            element={
                                <PrivateRoute>
                                    <Account />
                                </PrivateRoute>
                            }
                        />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
