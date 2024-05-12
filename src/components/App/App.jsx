import AppRoutes from '../Routes/Routes';
import useScrollToTop from '../../hooks/useScrollToTop';

function App() {
  useScrollToTop();
  return (
    <div className="app font-body">
      <AppRoutes />
    </div>
  );
}

export default App;
