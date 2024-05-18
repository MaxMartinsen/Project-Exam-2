import { CgTrash } from 'react-icons/cg';
import { TbPhotoPlus } from 'react-icons/tb';

import DEFAULT_IMAGE from '../../assets/image/default-image.png';

/**
 * ImageForm component allows users to dynamically manage a list of images. Users can add new images,
 * update existing ones, or remove them. It is designed to handle image URLs and provide visual feedback
 * by displaying a thumbnail of the entered URL.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Array} props.images - An array of objects, each containing the properties `url` and `alt` for each image.
 * @param {Function} props.onImagesChange - Callback function that updates the state in the parent component when the images change.
 *
 * @returns {JSX.Element} - A form that allows users to manipulate image URLs interactively. It displays a set of input fields
 * for entering URLs, buttons to remove or add fields, and a preview of the image from the entered URL.
 */

function ImageForm({ images, onImagesChange }) {
  const handleImageChange = (index, value) => {
    const newImages = images.map((img, i) => {
      if (i === index) {
        return { ...img, url: value };
      }
      return img;
    });
    onImagesChange(newImages);
  };

  const handleAddImage = (event) => {
    event.preventDefault();
    onImagesChange([...images, { url: '', alt: '' }]);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-8 items-center">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col items-end gap-2 w-fit">
            <div className="w-full flex items-center gap-2">
              {images.length > 1 && (
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="p-2 border rounded-lg bg-gray-300 text-gray-800 hover:bg-red-400"
                >
                  <CgTrash
                    className="h-6 w-6 text-gray-600"
                    aria-label="Remove image icon"
                  />
                </button>
              )}
              <div className="relative w-full">
                <input
                  className="bg-white/45 border-white border-2 rounded-xl text-fuscous-gray-700 text-sm font-semibold focus:outline-none focus:ring-0 focus:border-pelorous-300 block w-full py-2 px-4 ps-4"
                  type="url"
                  id="image"
                  placeholder="Image URL"
                  value={image.url}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                />
                <label htmlFor="image" className="sr-only">
                  Image
                </label>
              </div>
            </div>
            <div>
              <img
                className="max-w-64 h-64"
                src={image.url || DEFAULT_IMAGE}
                alt={image.alt || 'Default image'}
              />
            </div>
          </div>
        ))}
        <button
          onClick={handleAddImage}
          className="p-2 border rounded-lg bg-gray-300 text-gray-800 hover:bg-pelorous-400"
          aria-label="Add a new image url input field"
        >
          <TbPhotoPlus
            className="h-6 w-6 text-gray-600"
            aria-label="Add more images icon"
          />
        </button>
      </div>
    </div>
  );
}

export default ImageForm;
