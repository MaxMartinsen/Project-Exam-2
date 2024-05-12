function BookingError({ onClose }) {
  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow">
        <div className="p-4 md:p-5 border-b rounded-t ">
          <h3 className="text-lg font-semibold text-gray-900 text-center px-14">
            Booking failed to create
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
            Please change dates or number of guests.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="text-white inline-flex w-full justify-center bg-gradient-to-br from-pelorous-600 to-pelorous-400 hover:from-pelorous-500 hover:to-pelorous-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingError;
