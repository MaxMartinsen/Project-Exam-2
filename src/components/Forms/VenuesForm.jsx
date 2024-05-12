import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVenue, updateVenue } from '../../features/venues/venuesSlice';
import { IoIosPersonAdd } from 'react-icons/io';
import { FaStarHalfAlt } from 'react-icons/fa';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import ImageForm from './ImageForm';
import VenueConfirmation from '../Modal/VenueConfirmation';

/**
 * VenuesForm component handles the creation and updating of venue details.
 * It provides a comprehensive form for entering venue information, managing images, and toggling amenities.
 * The form is capable of operating in two modes: 'create' and 'edit', determined by the `mode` prop.
 *
 * @param {Object} props - The props passed to the component.
 * @param {string} props.mode - A string indicating the form mode, either 'create' or 'edit', to configure form behavior.
 * @param {Object} props.initialData - The initial data for the venue in 'edit' mode to pre-fill the form fields.
 *                                  This should include all necessary venue details such as name, location, amenities, etc.
 *
 * @returns {JSX.Element} - A form that adapts to either creating or updating venue details with various input controls and visual feedback mechanisms.
 */

function VenuesForm({ mode, initialData }) {
  const dispatch = useDispatch();
  const { token, apiKey } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    continent: '',
    maxGuests: '',
    price: '',
    rating: '',
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    images: [{ url: '', alt: '' }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImagesChange = (newImages) => {
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      if (initialData.location && initialData.meta && initialData.media) {
        setFormData({
          name: initialData.name || '',
          description: initialData.description || '',
          address: initialData.location.address || '',
          city: initialData.location.city || '',
          zip: initialData.location.zip || '',
          country: initialData.location.country || '',
          continent: initialData.location.continent || '',
          maxGuests: initialData.maxGuests.toString(),
          price: initialData.price.toString(),
          rating: initialData.rating.toString(),
          wifi: initialData.meta.wifi,
          parking: initialData.meta.parking,
          breakfast: initialData.meta.breakfast,
          pets: initialData.meta.pets,
          images: initialData.media || [{ url: '', alt: '' }],
        });
      }
    }
  }, [mode, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const filteredMedia = formData.images.filter(
      (img) => img.url.trim() !== ''
    );

    const venueData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      media: filteredMedia,
      price: parseFloat(formData.price),
      maxGuests: parseInt(formData.maxGuests),
      rating: formData.rating ? parseInt(formData.rating) : 0,
      meta: {
        wifi: formData.wifi,
        parking: formData.parking,
        breakfast: formData.breakfast,
        pets: formData.pets,
      },
      location: {
        address: formData.address.trim(),
        city: formData.city.trim(),
        zip: formData.zip.trim(),
        country: formData.country.trim(),
        continent: formData.continent.trim(),
        lat: formData.lat || 0,
        lng: formData.lng || 0,
      },
    };

    if (mode === 'edit') {
      try {
        await dispatch(
          updateVenue({ venueId: initialData.id, venueData, token, apiKey })
        );
        setShowConfirmation(true);
        setError('');
      } catch (error) {
        setError('Failed to update venue: ' + error.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      try {
        await dispatch(createVenue({ venueData, token, apiKey }));
        setShowConfirmation(true);
        setError('');
      } catch (error) {
        setError('Failed to create venue: ' + error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleModalClose = () => {
    setShowConfirmation(false);
  };

  return (
    <section className="max-w-screen-xxl px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800">
          {mode === 'edit' ? 'Update Venue' : 'Create Venue'}
        </h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="w-full h-full space-y-5">
          <div className="mt-4 md:max-w-64">
            <label htmlFor="name" className="block text-sm text-gray-500">
              Venue name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pelorous-500 block w-full ps-4 p-2.5"
            />
          </div>
          <h2 className="mb-4 font-semibold text-gray-900">Location</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-96">
              <label htmlFor="address" className="block text-sm text-gray-500">
                Adress
              </label>

              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                id="address"
                type="text"
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pelorous-500 block w-full ps-4 p-2.5"
              />
            </div>
            <div className="md:max-w-64 ">
              <label htmlFor="city" className="block text-sm text-gray-500">
                City
              </label>

              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                id="city"
                type="text"
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pelorous-500 block w-full ps-4 p-2.5"
              />
            </div>
            <div className="md:max-w-32 ">
              <label htmlFor="zip" className="block text-sm text-gray-500">
                Zip
              </label>

              <input
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                id="zip"
                type="text"
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pelorous-500 block w-full ps-4 p-2.5"
              />
            </div>
            <div className="md:w-80 ">
              <label htmlFor="country" className="block text-sm text-gray-500">
                Country
              </label>

              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                id="country"
                type="text"
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pelorous-500 block w-full ps-4 p-2.5"
              />
            </div>
            <div className="md:max-w-64 ">
              <label
                htmlFor="continent"
                className="block text-sm text-gray-500"
              >
                Continent
              </label>

              <input
                name="continent"
                value={formData.continent}
                onChange={handleChange}
                id="continent"
                type="text"
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pelorous-500 block w-full ps-4 p-2.5"
              />
            </div>
          </div>

          <h2 className="mb-4 font-semibold text-gray-900">Facilities</h2>
          <ul className="items-center w-full text-sm font-medium text-gray-900 border-gray-300 bg-white border rounded-lg md:flex">
            <li className="w-full border-b sm:border-b-0 sm:border-r border-gray-300">
              <div className="flex items-center ps-3">
                <input
                  type="checkbox"
                  name="wifi"
                  checked={formData.wifi}
                  onChange={handleChange}
                  id="meta-checkbox-wifi"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-pelorous-500"
                />
                <label
                  htmlFor="meta-checkbox-wifi"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                >
                  Wi-Fi
                </label>
              </div>
            </li>
            <li className="w-full border-b sm:border-b-0 sm:border-r border-gray-300">
              <div className="flex items-center ps-3">
                <input
                  type="checkbox"
                  name="parking"
                  checked={formData.parking}
                  onChange={handleChange}
                  id="meta-checkbox-parking"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-pelorous-500"
                />
                <label
                  htmlFor="meta-checkbox-parking"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                >
                  Parking
                </label>
              </div>
            </li>
            <li className="w-full border-b sm:border-b-0 sm:border-r border-gray-300">
              <div className="flex items-center ps-3">
                <input
                  type="checkbox"
                  name="breakfast"
                  checked={formData.breakfast}
                  onChange={handleChange}
                  id="meta-checkbox-breakfast"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-pelorous-500"
                />
                <label
                  htmlFor="meta-checkbox-breakfast"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                >
                  Breakfast
                </label>
              </div>
            </li>
            <li className="w-full border-gray-300">
              <div className="flex items-center ps-3">
                <input
                  type="checkbox"
                  name="pets"
                  checked={formData.pets}
                  onChange={handleChange}
                  id="meta-checkbox-pets"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-pelorous-500"
                />
                <label
                  htmlFor="meta-checkbox-pets"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                >
                  Pets
                </label>
              </div>
            </li>
          </ul>

          <h2 className="mb-4 font-semibold text-gray-900">Property</h2>
          <div className=" grid md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <label
                htmlFor="max-guests"
                className="block text-sm text-gray-500"
              >
                Guest&apos;s amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <IoIosPersonAdd className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="number"
                  id="max-guests"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleChange}
                  className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pelorous-500 block w-full ps-10 p-2.5"
                  min="1"
                  max="999"
                  placeholder="1 - 999"
                  required
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="col-span-1">
                <label htmlFor="rating" className="block text-sm text-gray-500">
                  Poll rating
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <FaStarHalfAlt className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pelorous-500 focus:border-pelorous-500 block w-full ps-10 p-2.5"
                    placeholder="1 - 5"
                    min="1"
                    max="5"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="col-span-1">
                <label htmlFor="price" className="block text-sm text-gray-500">
                  Price per night
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <FaMoneyBill1Wave className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pelorous-500 focus:border-pelorous-500 block w-full ps-10 p-2.5"
                    placeholder="Enter price per night"
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <h2 className="mb-4 font-semibold text-gray-900">Details</h2>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-500"
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              id="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pelorous-500 focus:border-pelorous-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
          <h2 className="mb-4 font-semibold text-gray-900">Gallery</h2>
          <div>
            <ImageForm
              images={formData.images}
              onImagesChange={handleImagesChange}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer w-fit py-1 px-4 lg:py-2 lg:px-6 flex  items-center rounded-xl border-2 text-white font-semibold text-lg lg:text-xl border-white bg-gradient-to-br from-pelorous-600 to-pelorous-400 hover:from-pelorous-500 hover:to-pelorous-300"
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
              {isSubmitting
                ? mode === 'edit'
                  ? 'Updating...'
                  : 'Creating...'
                : mode === 'edit'
                  ? 'Update Venue'
                  : 'Create Venue'}
            </button>
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </form>
      </div>
      <VenueConfirmation isOpen={showConfirmation} onClose={handleModalClose} />
    </section>
  );
}

export default VenuesForm;
