import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../features/profile/profileSlice';
import { updateUser } from '../../features/user/userSlice';
import UpdateAvatarModal from '../Modal/updateAvatar';
import DEFAULT_AVATAR from '../../assets/image/default-profile.png';
import { DEFAULT_AVATAR_URL } from '../../utils/constans';

function SettingsProfile() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.profile.isLoading);
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);
  const apiKey = useSelector((state) => state.user.apiKey);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    currentUser.avatar ? currentUser.avatar.url : ''
  );
  const error = useSelector((state) => state.profile.error);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setAvatarUrl(currentUser.avatar ? currentUser.avatar.url : '');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const finalAvatarUrl = avatarUrl || DEFAULT_AVATAR_URL;

    const result = await dispatch(
      updateProfile({
        username: currentUser.name,
        token,
        apiKey,
        avatarUrl: finalAvatarUrl,
      })
    );

    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(
        updateUser({ avatar: { url: finalAvatarUrl, alt: 'User avatar' } })
      );
    }

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
            className="btn p-2 rounded-full absolute bottom-2 right-2 shadow bg-blue-gray-100 hover:bg-gray-400"
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

      {isModalOpen && (
        <UpdateAvatarModal
          avatarUrl={avatarUrl}
          isLoading={isLoading}
          error={error}
          handleCloseModal={() => setIsModalOpen(false)}
          handleSubmit={handleSubmit}
          handleAvatarUrlChange={handleAvatarUrlChange}
          handleClearAvatarUrl={handleClearAvatarUrl}
        />
      )}
    </>
  );
}

export default SettingsProfile;
