// src/components/Forms/ImageForm.jsx
import { CgTrash } from 'react-icons/cg';
import { TbPhotoPlus } from 'react-icons/tb';
import DEFAULT_IMAGE from '../../assets/image/default-image.png';

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
                  className="p-2 border rounded-lg bg-gray-300 text-gray-800"
                >
                  <CgTrash
                    className="h-6 w-6 text-gray-600"
                    aria-label="Remove image icon"
                  />
                </button>
              )}
              <div className="relative w-full">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pelorous-500 block w-full ps-4 p-2.5"
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
          className="p-2 border rounded-lg bg-gray-300 text-gray-800"
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
