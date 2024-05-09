// src/components/Forms/LoginForm.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/user/userSlice';
import { fetchUserProfile } from '../../features/profile/profileSlice';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);
  const apiKey = useSelector((state) => state.user.apiKey);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email: values.email,
      password: values.password,
    };

    try {
      await dispatch(loginUser(userData));
      // Navigation moved to useEffect to ensure profile is fetched first
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Effect to fetch profile after successful login
  useEffect(() => {
    if (currentUser && token && apiKey) {
      dispatch(
        fetchUserProfile({
          username: currentUser.name,
          token,
          apiKey,
        })
      ).then(() => navigate(ROUTES.HOME));
    }
  }, [dispatch, currentUser, token, apiKey, navigate]);

  return (
    <div className="justify-center items-center">
      <div className="p-4">
        <div className="bg-white/45 rounded-3xl border-white border-2 p-4 gap-4 shadow-inner">
          <div className="flex items-center justify-between p-4 md:p-5">
            <h4 className="text-xl font-semibold text-fuscous-gray-700">
              Sign in to Holidaze
            </h4>
          </div>
          <div className="p-4 md:p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-semibold text-fuscous-gray-700"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="bg-white/45 border-white border-2 rounded-xl text-fuscous-gray-700 text-sm font-semibold focus:ring-0 focus:border-pelorous-300 block w-full py-2 px-4 "
                  placeholder="name@stud.noroff.no"
                  value={values.email}
                  onChange={handleChange}
                  autoComplete="given-email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-semibold text-fuscous-gray-700"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="bg-white/45 border-white border-2 rounded-xl text-fuscous-gray-700 text-sm font-semibold focus:ring-0 focus:border-pelorous-300 block w-full py-2 px-4"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl border-2 text-white font-semibold border-white bg-gradient-to-br from-pelorous-400 to-pelorous-200 hover:from-pelorous-500 hover:to-pelorous-300 text-sm px-5 py-2.5 text-center"
              >
                Login to your account
              </button>
              <div className="text-sm font-medium text-gray-500 text-center">
                Not registered?{' '}
                <Link
                  to={ROUTES.REGISTER}
                  className="text-pelorous-500 hover:underline"
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
