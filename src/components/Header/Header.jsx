import { useState, useEffect } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/user/userSlice';

import { ROUTES } from '../../utils/routes';
import LOGO from '/HolidazeLogo.svg';
import DEFAULT_AVATAR from '../../assets/image/default-profile.png';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoggedIn = Boolean(currentUser);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(ROUTES.HOME);
  };

  const handleSettings = () => {
    setShowDropdown(false);
    navigate(ROUTES.SETTINGS);
  };

  useEffect(() => {
    const closeDropdown = (event) => {
      if (
        !event.target.closest('#user-menu-button') &&
        !event.target.closest('#user-dropdown')
      ) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('click', closeDropdown);
    }
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [showDropdown]);
  return (
    <nav className="bg-white sticky w-full z-40 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={ROUTES.HOME}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={LOGO} className="h-8" alt="Holidaze Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Holidaze
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 relative"
                id="user-menu-button"
                aria-expanded="false"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    currentUser.avatar ? currentUser.avatar.url : DEFAULT_AVATAR
                  }
                  alt={
                    currentUser.avatar ? currentUser.avatar.alt : 'User avatar'
                  }
                />
              </button>
              {showDropdown && (
                <div
                  className="z-40 absolute top-12 right-1 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-base font-semibold text-gray-900">
                      {currentUser.name}
                    </span>
                    <span className="block text-sm text-gray-500 truncate">
                      {currentUser.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <button
                        onClick={handleSettings}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="text-white bg-alizarin-crimson-500 hover:bg-alizarin-crimson-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Sign in
            </Link>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <NavLink
                to={ROUTES.HOME}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded md:bg-transparent md:p-0 ${isActive ? 'md:text-alizarin-crimson-500 text-white bg-alizarin-crimson-500' : 'text-gray-900'} `
                }
              >
                Venues
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.ABOUT}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded md:bg-transparent md:p-0 ${isActive ? 'md:text-alizarin-crimson-500 text-white bg-alizarin-crimson-500' : 'text-gray-900'} `
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.CONTACT}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded md:bg-transparent md:p-0 ${isActive ? 'md:text-alizarin-crimson-500 text-white bg-alizarin-crimson-500' : 'text-gray-900'} `
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
