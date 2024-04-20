import { useState } from 'react';
import { useSelector } from 'react-redux';

import { API_URL } from '../../utils/constans';
import DEFAULT_AVATAR from '../../assets/image/default-avatar.png';

function SettingsProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);
  const apiKey = useSelector((state) => state.user.apiKey);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    currentUser.avatar ? currentUser.avatar.url : ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setAvatarUrl(currentUser.avatar ? currentUser.avatar.url : '');
    }
  };

  const updateProfile = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${API_URL}/holidaze/profiles/${currentUser.name}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'X-Noroff-API-Key': apiKey,
          },
          body: JSON.stringify({
            avatar: { url: avatarUrl, alt: 'User avatar' },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update avatar.');
      }

      const data = await response.json();
      console.log('Update successful:', data);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAvatarUrlChange = (event) => {
    setAvatarUrl(event.target.value);
  };

  const handleClearAvatarUrl = (event) => {
    event.preventDefault();
    setAvatarUrl('');
  };

  return (
    <>
      <div className="flex flex-col text-center items-center gap-3 m-auto mb-10">
        <div className="relative">
          <img
            className="w-[200px] h-[200px] rounded-full shadow"
            src={currentUser.avatar ? currentUser.avatar.url : DEFAULT_AVATAR}
            alt={currentUser.avatar ? currentUser.avatar.alt : 'User avatar'}
          />
          <button
            className="btn p-2 rounded-full absolute bottom-2 right-2 shadow bg-slate-100 hover:bg-slate-300"
            onClick={handleModalToggle}
          >
            <svg
              className="w-6 h-6 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
              />
              <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h1 className="font-semibold">{currentUser.name}</h1>
          <p className="text-sm text-lightGrey">{currentUser.email}</p>
        </div>
      </div>

      {/* Modal for settings */}
      {isModalOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Edit Avatar
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="flex flex-col sm:flex-row gap-4 mb-4 items-end">
                <div className="col-span-2 sm:col-span-1">
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900"
                      htmlFor="url"
                    >
                      Insert image URL
                    </label>
                    <input
                      type="url"
                      name="avatar"
                      id="url"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={avatarUrl}
                      onChange={handleAvatarUrlChange}
                      placeholder="Avatar URL"
                    />
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <button
                    type="button"
                    onClick={handleClearAvatarUrl}
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                    Clear
                  </button>
                </div>
              </div>
              <div className="col-span-2">
                <img
                  className="h-[150px] w-[150px] rounded-full my-5 m-auto"
                  src={
                    currentUser.avatar ? currentUser.avatar.url : DEFAULT_AVATAR
                  }
                  alt={
                    currentUser.avatar ? currentUser.avatar.alt : 'User avatar'
                  }
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Update
              </button>
              {error && <p className="error">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SettingsProfile;
