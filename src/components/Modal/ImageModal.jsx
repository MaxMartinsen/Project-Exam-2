import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ImageModal({ images, isOpen, onClose }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="relative bg-white rounded-2xl shadow max-w-[300px] sm:max-w-[370px] md:max-w-[700px] xl:max-w-[1000px] px-3">
          <div className="relative p-4 text-center bg-white rounded-2xl shadow sm:p-5">
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="deleteModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="modal-backdrop p-6">
              <div className="modal-content">
                {images.length > 1 ? (
                  <Slider {...settings}>
                    {images.map((img, index) => (
                      <div className="rounded-2xl" key={index}>
                        <img
                          className="rounded-2xl"
                          src={img.url}
                          alt={img.alt || 'Venue image'}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <img
                    src={images[0].url}
                    alt={images[0].alt || 'Venue image'}
                    className="w-full rounded-2xl"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageModal;
