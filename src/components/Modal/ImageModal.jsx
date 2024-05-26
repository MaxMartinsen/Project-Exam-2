import { useState } from 'react';
import IMAGE from '../../assets/image/default-image.png';

/**
 * ImageModal component showcases images in a modal overlay, using a custom carousel for multiple images.
 * This is particularly useful in galleries or product displays.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.images - An array of image objects that contain the URLs and alternative text for the images.
 * @param {boolean} props.isOpen - A boolean flag to determine if the modal should be visible.
 * @param {Function} props.onClose - A callback function that is called to close the modal.
 *
 * @returns {JSX.Element} The modal dialog displaying images either in a carousel or singly, based on the number of images.
 */

function ImageModal({ images, isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToPrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="relative rounded-2xl shadow w-[300px] sm:w-[370px] md:w-[700px] xl:w-[1000px]">
          <div className="relative p-4 text-center bg-white rounded-2xl shadow sm:p-5">
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6">
              <div className="relative h-56 overflow-hidden rounded-lg md:h-[620px]">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`duration-700 ease-in-out w-full h-full ${index === activeIndex ? 'block' : 'hidden'}`}
                  >
                    <img
                      src={img.url || IMAGE}
                      alt={img.alt || 'Image'}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                ))}
              </div>
              {images.length > 1 && (
                <>
                  <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full active:right-2 ${index === activeIndex ? 'bg-pelorous-500' : 'bg-fuscous-gray-700'}`}
                        aria-current={index === activeIndex ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => goToSlide(index)}
                      ></button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="absolute top-0 start-11 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={goToPrev}
                    style={{ display: images.length > 1 ? 'flex' : 'none' }}
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 active:group-focus:ring-4 group-focus:ring-pelorous-500 group-focus:outline-none">
                      <svg
                        className="w-4 h-4 text-black rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 1 1 5l4 4"
                        />
                      </svg>
                      <span className="sr-only">Previous</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="absolute top-0 end-11 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={goToNext}
                    style={{ display: images.length > 1 ? 'flex' : 'none' }}
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 active:group-focus:ring-4 group-focus:ring-pelorous-500 group-focus:outline-none">
                      <svg
                        className="w-4 h-4 text-black rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <span className="sr-only">Next</span>
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageModal;
