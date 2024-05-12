import DEFAULT_AVATAR from '../../assets/image/default-profile.png';

/**
 * AvatarForm component allows users to update their profile picture by providing an image URL.
 * It features an input field for the URL, a preview of the current or default avatar, and buttons
 * for clearing the input field or submitting the new avatar. The form is embedded in a modal layout.
 *
 * @param {Object} props - The props passed to the component.
 * @param {string} props.avatarUrl - The URL of the avatar, used to populate the input field and preview image.
 * @param {boolean} props.isLoading - Indicates if the form submission is in progress, disabling the submit button during processing.
 * @param {string} props.error - An error message to be displayed if the update fails.
 * @param {Function} props.handleCloseModal - Function to close the modal containing the form.
 * @param {Function} props.handleSubmit - Function to handle the submission of the form.
 * @param {Function} props.handleAvatarUrlChange - Function to update the state of the avatar URL upon input change.
 * @param {Function} props.handleClearAvatarUrl - Function to clear the avatar URL input field.
 *
 * @returns {JSX.Element} A modal with a form that allows users to update their avatar by providing a URL,
 * previewing the avatar, and submitting the changes. Displays an error message if the update fails.
 */

function AvatarForm({
  avatarUrl,
  isLoading,
  error,
  handleCloseModal,
  handleSubmit,
  handleAvatarUrlChange,
  handleClearAvatarUrl,
}) {
  return (
    <>
      <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">Edit Avatar</h3>
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
                    htmlFor="avatar-url"
                  >
                    Insert image URL
                  </label>
                  <input
                    type="url"
                    name="avatar"
                    id="avatar-url"
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
                  className="text-white inline-flex items-center border-white bg-gradient-to-br from-pelorous-600 to-pelorous-400 hover:from-pelorous-500 hover:to-pelorous-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
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
                className="h-[150px] w-[150px] rounded my-5 m-auto"
                src={avatarUrl || DEFAULT_AVATAR}
                alt="Preview of user avatar"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="text-white inline-flex items-center border-white bg-gradient-to-br from-pelorous-600 to-pelorous-400 hover:from-pelorous-500 hover:to-pelorous-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
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
    </>
  );
}

export default AvatarForm;
