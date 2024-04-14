import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import About from '../../pages/About/About';
import Contact from '../../pages/Contact/Contact';
import VenuesCard from '../Venues/VenuesCard';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={`${ROUTES.VENUE}/:id`} element={<VenuesCard />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
