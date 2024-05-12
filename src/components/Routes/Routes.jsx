import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import Layout from '../Layout/Layout';
import Home from '../../pages/Home/Home';
import About from '../../pages/About/About';
import Contact from '../../pages/Contact/Contact';
import Venue from '../../pages/Venue/Venue';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import Settings from '../../pages/Settings/Settings';
import BookingsProfile from '../../pages/Bookings/BookingsProfile';
import ManagerProfile from '../../pages/Manager/ManagerProfile';

/**
 * AppRoutes component sets up the routing for the entire application using React Router.
 * It defines the main navigation paths and associates them with their respective page components.
 * All routes are nested within a single Layout component to maintain a consistent layout across different pages.
 *
 * Routes are defined using a constants file (`ROUTES`) which holds the paths to ensure consistency and reusability.
 *
 * @returns {JSX.Element} Renders the routing structure encapsulated within the Layout component.
 * This setup allows for the implementation of a common layout across various pages like Home, About, Contact, etc.
 *
 * Detailed Routes:
 * - Home: The main landing page of the application.
 * - About: Provides information about the application or service.
 * - Contact: Contact form and contact information page.
 * - Venue: Detailed page for individual venues.
 * - Login: User login page.
 * - Register: New user registration page.
 * - Settings: User-specific settings page.
 * - BookingsProfile: User page to view and manage bookings.
 * - ManagerProfile: Venue manager page to manage their listings.
 */

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.VENUE} element={<Venue />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
        <Route path={ROUTES.BOOKINGS} element={<BookingsProfile />} />
        <Route path={ROUTES.MANAGER} element={<ManagerProfile />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
