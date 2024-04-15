import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import Layout from '../Layout/Layout';
import Home from '../../pages/Home/Home';
import About from '../../pages/About/About';
import Contact from '../../pages/Contact/Contact';
import Venue from '../../pages/Venue/Venue';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

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
      </Route>
    </Routes>
  );
}

export default AppRoutes;
