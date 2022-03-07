import React, { useState } from 'react';
import { AuthContext } from './context/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/style.scss';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import List from './pages/List';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';

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
                    <Route element={<Layout />}>
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="list"
                            element={
                                <PrivateRoute>
                                    <List />
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
