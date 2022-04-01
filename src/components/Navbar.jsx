import '../styles/navbar.scss';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

//ICONS
import { BiHomeAlt } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiCloseCircleLine } from 'react-icons/ri';
import { IoFitnessOutline } from 'react-icons/io5';
import { IoMdFitness } from 'react-icons/io';
import { VscAccount } from 'react-icons/vsc';
import { MdLogout } from 'react-icons/md';
import useAuth from '../services/useAuth';

const Navbar = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        //CLOSE MOBILE MENU WHEN NAVIGATE WITH THE LINK
        setShowMenu(false);
    }, [pathname]);

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="navbar">
            <div className="logo">
                <img src="24-hour-fitness.svg" alt="logo" />
            </div>

            {/* MAIN NAVIGATION */}
            <nav className={showMenu ? 'show' : ''}>
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'activeLinkClass' : ''
                            }
                        >
                            <BiHomeAlt />
                            <span>Accueil</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/training/new"
                            className={({ isActive }) =>
                                isActive ? 'activeLinkClass' : ''
                            }
                        >
                            <IoFitnessOutline />
                            <span>Entrainement</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/exercises"
                            className={({ isActive }) =>
                                isActive ? 'activeLinkClass' : ''
                            }
                        >
                            <IoMdFitness />
                            <span>Exercices</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/account"
                            className={({ isActive }) =>
                                isActive ? 'activeLinkClass' : ''
                            }
                        >
                            <VscAccount />
                            <span>Mon compte</span>
                        </NavLink>
                    </li>
                    <li onClick={logout}>
                        <NavLink to="#">
                            <MdLogout />
                            <span>Déconnexion</span>
                        </NavLink>
                    </li>
                </ul>
                <RiCloseCircleLine
                    onClick={() => setShowMenu(false)}
                    className="close-icon"
                />
            </nav>

            <GiHamburgerMenu
                className="hamburger-icon"
                onClick={() => setShowMenu(true)}
            />
        </div>
    );
};

export default Navbar;
