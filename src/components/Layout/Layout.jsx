import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

/**
 * Layout component acts as a structural template for pages within the application. It wraps the content of
 * individual pages with common components like the Header and Footer, ensuring a consistent layout across the site.
 *
 * Features:
 * - Provides a consistent structure by placing the Header at the top, the Footer at the bottom, and the main
 *   content dynamically inserted between them using the Outlet component from React Router.
 * - The Outlet component is used to render the appropriate page content based on the current route.
 *
 * This setup enables the Layout to apply the Header and Footer consistently across all child routes (like HomePage, AboutPage, etc.),
 * while allowing each child route to define its own specific content that gets rendered in place of the Outlet.
 *
 * @returns {JSX.Element} A component that renders the Header, main content based on routing (via Outlet), and the Footer.
 */

function Layout() {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
