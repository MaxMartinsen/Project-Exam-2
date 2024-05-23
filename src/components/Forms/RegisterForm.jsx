import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

import { createUser, clearErrors } from '../../features/user/userSlice';
import {
  validateEmail,
  validatePassword,
  validateNameCharacters,
  validateNameLength,
} from '../../utils/validation';

/**
 * RegisterForm component allows new users to sign up by entering their personal information and credentials.
 * It validates user input before submission and provides feedback on the registration process. This form also
 * includes an option for users to register as venue managers.
 *
 *
 * @returns {JSX.Element} - A structured form that allows new users to register by providing their name, email,
 * and password. The form includes validation, error feedback, and conditional navigation based on the user's state.
 */

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);
  const [isVenueManager, setIsVenueManager] = useState(false);

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value, checked } }) => {
    setValues({ ...values, [name]: value });
    if (name === 'venueManager') {
      setIsVenueManager(checked);
    }
    setErrors({ ...errors, [name]: '' });
    if (userError) {
      dispatch(clearErrors());
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password } = values;

    const newErrors = {};
    // Check name character types
    if (!validateNameCharacters(name))
      newErrors.name =
        'Name must contain only letters, numbers, and underscores.';
    // Check name length
    if (!validateNameLength(name))
      newErrors.name = 'Name must be no more than 20 characters long.';

    if (!validateEmail(email))
      newErrors.email = "Email must be a valid '@stud.noroff.no' address.";

    if (!validatePassword(password))
      newErrors.password = 'Password must be at least 8 characters long.';

    // Check if there are any validation errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
      venueManager: isVenueManager,
    };
    const resultAction = await dispatch(createUser(userData));
    if (createUser.fulfilled.match(resultAction)) {
      navigate(ROUTES.LOGIN);
    } else {
      setErrors({
        form: `Registration failed: ${resultAction.error.message || 'Please try again'}`,
      });
    }
  };
  return (
    <div className="justify-center items-center ">
      <div className=" p-4">
        <div className="bg-white/45 rounded-3xl border-white border-2 p-4 gap-4 shadow-inner">
          <div className="flex items-center justify-between p-4 md:p-5">
            <h3 className="text-xl font-semibold text-fuscous-gray-700">
              Sign in to Holidaze
            </h3>
          </div>
          <div className="p-4 md:p-5">
            <form onSubmit={handleSubmit} className="space-y-4" action="#">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-semibold text-fuscous-gray-700"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-white/45 border-white border-2 rounded-xl text-fuscous-gray-700 text-sm font-semibold focus:outline-none focus:ring-0 focus:border-pelorous-300 block w-full py-2 px-4"
                  placeholder="Username"
                  required
                  onChange={handleChange}
                  autoComplete="given-name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
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
                  autoComplete="email"
                  className="bg-white/45 border-white border-2 rounded-xl text-fuscous-gray-700 text-sm font-semibold focus:outline-none focus:ring-0 focus:border-pelorous-300 block w-full py-2 px-4"
                  placeholder="name@stud.noroff.no"
                  onChange={handleChange}
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
                  placeholder="••••••••"
                  className="bg-white/45 border-white border-2 rounded-xl text-fuscous-gray-700 text-sm font-semibold focus:outline-none focus:ring-0 focus:border-pelorous-300 block w-full py-2 px-4"
                  required
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex h-5">
                    <input
                      id="manager"
                      name="venueManager"
                      type="checkbox"
                      className="w-4 h-4 text-pelorous-400 bg-white/45 border-white rounded focus:outline-none focus:ring-0"
                      onChange={handleChange}
                    />
                  </div>
                  <label
                    htmlFor="manager"
                    className="ms-2 text-sm font-medium text-fuscous-gray-700"
                  >
                    Venue Manager
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={userStatus === 'loading'}
                className={`w-full rounded-xl border-2 text-white font-semibold border-white bg-gradient-to-br from-pelorous-600 to-pelorous-400 ${userStatus === 'loading' ? 'bg-gray-400' : 'hover:from-pelorous-500 hover:to-pelorous-300'} text-lg px-5 py-2.5 text-center`}
              >
                {userStatus === 'loading' ? 'Processing...' : 'Sign Up'}
              </button>
              {userError && (
                <p className="text-red-500 text-xs italic mt-1">{userError}</p>
              )}

              <div className="text-sm font-medium text-gray-500 text-center">
                Not registered?{' '}
                <Link
                  to={ROUTES.LOGIN}
                  className="text-pelorous-500 hover:underline"
                >
                  Sign in to account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
