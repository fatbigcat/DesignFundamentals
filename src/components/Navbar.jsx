
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="header">
            <NavLink
                to="/"
                className="pl-2 pr-2 w-fit h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
                <p className="blue-gradient_text">Kalina</p>
            </NavLink>
            <nav className="flex test-lg gap-7 font-medium">
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-500' : 'text-black'
                    }>
                    About
                </NavLink>
                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-500' : 'text-black'
                    }>
                    Projects
                </NavLink>
            </nav>
        </header>
    );
};

export default Navbar;
