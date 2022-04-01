import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />

            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
