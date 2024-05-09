import { useState, useEffect } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/user/userSlice';

import { ROUTES } from '../../utils/routes';
import LOGO from '/HolidazeLogo.svg';
import DEFAULT_AVATAR from '../../assets/image/default-profile.png';

import { LuSettings } from 'react-icons/lu';
import { BsFillLuggageFill } from 'react-icons/bs';
import { GrUserManager } from 'react-icons/gr';
import { LuLogOut } from 'react-icons/lu';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const profile = useSelector((state) => state.profile.profile);
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

  const handleBookings = () => {
    setShowDropdown(false);
    navigate(ROUTES.BOOKINGS);
  };

  const handleManager = () => {
    setShowDropdown(false);
    navigate(ROUTES.MANAGER);
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
      className={`fixed top-0 z-50 w-full flex-none transition-colors duration-500 lg:z-50 border-b border-white supports-backdrop-blur:bg-white/60 ${isScrolled ? 'backdrop-blur-sm bg-white/90' : 'backdrop-blur-sm bg-white/30'}`}
    >
      <div className="flex max-w-screen-xxl flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={ROUTES.HOME}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={LOGO} className="h-8" alt="Holidaze Logo" />
          <span className="hidden text-fuscous-gray-700 font-lato italic md:block self-center text-2xl font-semibold whitespace-nowrap">
            Holidaze
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          {isLoggedIn ? (
            <>
              <div className="flex justify-end md:w-[142px]">
                <button
                  type="button"
                  className="flex text-sm rounded md:me-0"
                  id="user-menu-button"
                  aria-expanded="false"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-12 h-12 rounded-full hover:ring-4 ring-white"
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
                  className="z-40 absolute top-12 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-b-lg shadow"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-base font-semibold text-gray-900">
                      {currentUser.name}
                    </span>
                    {profile && profile.venueManager && (
                      <span className="block text-sm text-blue-700 truncate">
                        Venue Manager
                      </span>
                    )}
                    <span className="block text-sm text-gray-500 truncate">
                      {currentUser.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <button
                        onClick={handleBookings}
                        className="w-full flex items-center text-left  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <BsFillLuggageFill className="mr-2" />
                        Bookings
                      </button>
                    </li>
                    {profile && profile.venueManager && (
                      <li>
                        <button
                          onClick={handleManager}
                          className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <GrUserManager className="mr-2" />
                          Manager
                        </button>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleSettings}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LuSettings className="mr-2" />
                        Settings
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LuLogOut className="mr-2" />
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
              className="w-[142px] cursor-pointer py-1 px-4 lg:py-2 lg:px-6 flex items-center  justify-center rounded-xl border-4 text-white font-semibold text-lg lg:text-xl border-white bg-gradient-to-br from-pelorous-400 to-pelorous-200 hover:from-pelorous-500 hover:to-pelorous-300"
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
                  `font-bold text-xl block py-2 px-3 rounded md:bg-transparent md:p-0 text-fuscous-gray-700 ${isActive ? 'md:text-fuscous-gray-700 md:decoration-pelorous-500 md:underline md:underline-offset-4 md:decoration-4 text-white bg-pelorous-500' : 'text-fuscous-gray-700 hover:text-pelorous-500'} `
                }
              >
                Venues
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.ABOUT}
                className={({ isActive }) =>
                  `font-bold text-xl block py-2 px-3 rounded md:bg-transparent md:p-0 text-fuscous-gray-700 ${isActive ? 'md:text-fuscous-gray-700 md:decoration-pelorous-500 md:underline md:underline-offset-4 md:decoration-4 text-white bg-pelorous-500' : 'text-fuscous-gray-700 hover:text-pelorous-500'} `
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.CONTACT}
                className={({ isActive }) =>
                  `font-bold text-xl block py-2 px-3 rounded md:bg-transparent md:p-0 text-fuscous-gray-700 ${isActive ? 'md:text-fuscous-gray-700 md:decoration-pelorous-500 md:underline md:underline-offset-4 md:decoration-4 text-white bg-pelorous-500' : 'text-fuscous-gray-700 hover:text-pelorous-500'} `
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
