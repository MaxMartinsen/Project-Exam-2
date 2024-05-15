// App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the AppRoutes component and give it a display name
jest.mock('../Routes/Routes', () => {
  const MockedAppRoutes = () => <div>Mocked AppRoutes</div>;
  MockedAppRoutes.displayName = 'MockedAppRoutes';
  return MockedAppRoutes;
});

// Mock the useScrollToTop hook
jest.mock('../../hooks/useScrollToTop', () => jest.fn());

test('renders App component', () => {
  render(<App />);

  // Check if the mocked AppRoutes component is rendered
  expect(screen.getByText('Mocked AppRoutes')).toBeInTheDocument();
});
