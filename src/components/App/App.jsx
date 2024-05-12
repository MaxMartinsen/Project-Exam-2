import AppRoutes from '../Routes/Routes';
import useScrollToTop from '../../hooks/useScrollToTop';

/**
 * App component acts as the root component for the entire application.
 * It uses the AppRoutes component to manage navigation and routing across different pages.
 * Additionally, it employs the useScrollToTop hook to ensure that the viewport returns to the top of the page
 * on route changes, enhancing user experience by providing a consistent starting position on each page.
 *
 * This component sets the font style for the application and encapsulates all route-based rendering.
 *
 * @returns {JSX.Element} Renders the root layout of the application with routing capabilities.
 *                        It includes a top-level div with a specified font style that contains the AppRoutes component.
 */

function App() {
  useScrollToTop();
  return (
    <div className="app font-body">
      <AppRoutes />
    </div>
  );
}

export default App;
