import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

function LoginForm() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(credentials)).unwrap();
      navigate(ROUTES.HOME);
    } catch (error) {
      setError(error.message || 'Failed to login');
    }
  };

  return (
    <div className="justify-center items-center">
      <div className="p-4">
        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5">
            <h3 className="text-xl font-semibold text-gray-900">
              Sign in to Holidaze
            </h3>
          </div>
          <div className="p-4 md:p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@stud.noroff.no"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login to your account
              </button>
              <div className="text-sm font-medium text-gray-500 text-center">
                Not registered?{' '}
                <Link
                  to={ROUTES.REGISTER}
                  className="text-blue-700 hover:underline"
                >
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
