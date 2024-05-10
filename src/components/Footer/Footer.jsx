import { Link } from 'react-router-dom';

import { ROUTES } from '../../utils/routes';

import LOGO from '/HolidazeLogo.svg';

function Footer() {
  return (
    <footer className="mt-auto">
      <div className="bg-mandys-pink-300 border-t-8 border-white">
        <div className="w-full max-w-screen-xxl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              to={ROUTES.HOME}
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src={LOGO} className="h-7" alt="Holidaze Logo" />
              <span className="text-fuscous-gray-700 font-lato font-semibold text-xl italic">
                Holidaze
              </span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-fuscous-gray-700 sm:mb-0">
              <li>
                <Link
                  to={ROUTES.ABOUT}
                  className="hover:underline me-4 md:me-6"
                >
                  About
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-white sm:mx-auto lg:my-4" />
          <span className="block text-sm text-gray-500 sm:text-center">
            © 2024{' '}
            <a href="https://flowbite.com/" className="hover:underline">
              Holidaze™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
