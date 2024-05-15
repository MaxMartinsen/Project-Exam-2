import { Link } from 'react-router-dom';

import { ROUTES } from '../../utils/routes';

import LOGO from '/holidaze-logo.svg';

/**
 * Footer component presents a consistent bottom navigation and branding across the application.
 * It includes links to the Home, About, and Contact pages, alongside the application logo and a copyright statement.
 * This component is styled with specific colors, margins, and typographical settings to fit the application's design theme.
 *
 * Usage:
 * - Placed at the bottom of the layout, visible on all pages.
 *
 * Features:
 * - Links are provided to the Home, About, and Contact pages using routing paths from a centralized routes configuration.
 * - Displays the application logo and the name "Holidaze" styled in a distinctive manner.
 * - Copyright year and rights information are clearly stated.
 *
 * @returns {JSX.Element} Renders the footer element of the application with navigation links and branding.
 */

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
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-black sm:mb-0">
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
          <div className="block text-sm text-fuscous-gray-700 sm:text-center">
            © 2024{' '}
            <Link to={ROUTES.HOME} className="hover:underline">
              Holidaze™
            </Link>
            . All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
