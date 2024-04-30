import { CgTrash } from 'react-icons/cg';
import { TbPhotoPlus } from 'react-icons/tb';
import IMAGE from '../../assets/image/default-image.png';

function ImageForm() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-8 items-center">
        <div className="flex flex-col items-end gap-2 w-fit">
          <div className="w-full flex items-center gap-2">
            <button className="p-2 border rounded-lg bg-gray-300 text-gray-800">
              <CgTrash
                className="h-6 w-6 text-gray-600"
                aria-label="Trash icon"
              />
            </button>
            <div className="relative w-full">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-4 p-2.5"
                type="url"
                placeholder="Image URL"
              />

              <label className="sr-only">Image</label>
            </div>
          </div>
          <div>
            <img className="w-full h-64" src={IMAGE} alt="" />
          </div>
        </div>
        <button
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
