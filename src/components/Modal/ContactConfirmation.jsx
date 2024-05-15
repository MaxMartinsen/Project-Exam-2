import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../utils/routes';

/**
 * ContactConfirmation component displays a modal dialog to confirm successful submission of the contact form.
 * It provides an affirmative response to users after they have interacted with the contact form, ensuring them
 * that their message has been received.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onClose - A callback function that is called when the user decides to close the modal.
 *                                   This function should handle any necessary cleanup or state resetting.
 *
 * @returns {JSX.Element} A modal dialog that informs the user of successful contact form submission with options to close the modal or navigate away.
 */

function ContactConfirmation({ onClose }) {
  const navigate = useNavigate();
  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow">
        <div className="p-4 md:p-5 border-b rounded-t ">
          <h3 className="text-lg font-semibold text-gray-900 text-center px-14">
            Your Contact Form Is Confirmed
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
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
        <div className="p-4 md:p-5">
          <p className="text-gray-500 text-center mb-4">
            Thank you for booking with Holidaze!
          </p>
          <button
            type="button"
            onClick={() => navigate(ROUTES.HOME)}
            className="text-white inline-flex w-full justify-center bg-gradient-to-br from-pelorous-600 to-pelorous-400 hover:from-pelorous-500 hover:to-pelorous-300  font-semibold rounded-lg text-lg px-5 py-2.5 text-center"
          >
            Venues
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactConfirmation;
