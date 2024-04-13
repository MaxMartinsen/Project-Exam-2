import { Link } from 'react-router-dom';

import { ROUTES } from '../../utils/routes';

import styles from '../../styles/Footer.module.css';

import LOGO from '/HolidazeLogo.svg';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="bg-alizarin-crimson-50">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              to={ROUTES.HOME}
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src={LOGO} className="h-8" alt="Holidaze Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Holidaze
              </span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-white sm:mx-auto lg:my-8" />
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
