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

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav
      className={`fixed top-0 z-50 w-full flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] supports-backdrop-blur:bg-white/60 ${isScrolled ? 'backdrop-blur-sm dark:bg-ebony-950/25' : 'dark:bg-transparent'}`}
    >
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
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          {isLoggedIn ? (
            <>
              <div className="flex justify-end w-[142px]">
                <button
                  type="button"
                  className="flex text-sm rounded md:me-0 focus:ring-4 focus:ring-gray-300"
                  id="user-menu-button"
                  aria-expanded="false"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-10 h-10 rounded"
                    src={
                      currentUser.avatar
                        ? currentUser.avatar.url
                        : DEFAULT_AVATAR
                    }
                    alt={
                      currentUser.avatar
                        ? currentUser.avatar.alt
                        : 'User avatar'
                    }
                  />
                </button>
              </div>
              {showDropdown && (
                <div
                  className="z-40 absolute top-10 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
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
              className="w-[142px] text-white bg-alizarin-crimson-500 hover:bg-alizarin-crimson-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
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
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border bg-white border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-inherit">
            <li>
              <NavLink
                to={ROUTES.HOME}
                className={({ isActive }) =>
                  `font-bold block py-2 px-3 rounded md:bg-transparent md:p-0 md:hover:text-alizarin-crimson-600 ${isActive ? 'md:text-alizarin-crimson-500 text-white bg-alizarin-crimson-500' : 'text-gray-900'} `
                }
              >
                Venues
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.ABOUT}
                className={({ isActive }) =>
                  `font-bold block py-2 px-3 rounded md:bg-transparent md:p-0 md:hover:text-alizarin-crimson-600 ${isActive ? 'md:text-alizarin-crimson-500 text-white bg-alizarin-crimson-500' : 'text-gray-900'} `
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.CONTACT}
                className={({ isActive }) =>
                  `font-bold block py-2 px-3 rounded md:bg-transparent md:p-0 md:hover:text-alizarin-crimson-600 ${isActive ? 'md:text-alizarin-crimson-500 text-white bg-alizarin-crimson-500' : 'text-gray-900'} `
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
