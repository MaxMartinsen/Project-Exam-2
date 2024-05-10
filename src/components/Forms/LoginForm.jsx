// src/components/Forms/LoginForm.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/user/userSlice';
import { fetchUserProfile } from '../../features/profile/profileSlice';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import { validateEmail, validatePassword } from '../../utils/validation';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);
  const apiKey = useSelector((state) => state.user.apiKey);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email: values.email,
      password: values.password,
    };
    const { email, password } = values;

    // Validation
    const newErrors = {};
    if (!validateEmail(email))
      newErrors.email = "Email must be a valid 'stud.noroff.no' address.";
    if (!validatePassword(password))
      newErrors.password = 'Password must be at least 8 characters long.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const resultAction = await dispatch(loginUser(userData));
    if (loginUser.fulfilled.match(resultAction)) {
      // handle success in useEffect to ensure profile is fetched
    } else {
      setErrors({ form: resultAction.error.message || 'Login failed' });
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
                {errors.email && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errors.email}
                  </p>
                )}
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
                {errors.password && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errors.password}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={userStatus === 'loading'}
                className="w-full rounded-xl border-2 text-white font-semibold border-white bg-gradient-to-br from-pelorous-400 to-pelorous-200 hover:from-pelorous-500 hover:to-pelorous-300 text-sm px-5 py-2.5 text-center"
              >
                {userStatus === 'loading'
                  ? 'Processing...'
                  : 'Login to your account'}
              </button>
              {userError && (
                <p className="text-red-500 text-xs italic mt-1">{userError}</p>
              )}
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
