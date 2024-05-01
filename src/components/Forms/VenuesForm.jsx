// src/components/Forms/VenuesForm.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVenue } from '../../features/venues/venuesSlice';
import { IoIosPersonAdd } from 'react-icons/io';
import { FaStarHalfAlt } from 'react-icons/fa';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import ImageForm from './ImageForm';
import VenueConfirmation from '../Modal/VenueConfirmation';

function VenuesForm() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Filter out images where the URL is empty
    const filteredMedia = formData.images.filter(
      (img) => img.url.trim() !== ''
    );

    const venueData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      media: filteredMedia, // Only include non-empty images
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

    try {
      await dispatch(createVenue({ venueData, token, apiKey }));
      setShowConfirmation(true);
      setError('');
    } catch (error) {
      setError('Failed to create venue: ' + error.message);
      console.error('Creation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleModalClose = () => {
    setShowConfirmation(false);
  };

  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Create Venue
        </h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="w-full h-full space-y-5">
          <div className="mt-4 md:max-w-64">
            <label
              htmlFor="name"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Venue name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength="4"
              className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-4 p-2.5"
            />

            <p className="mt-3 hidden text-xs text-red-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <h2 className="mb-4 font-semibold text-gray-900">Location</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-96">
              <label
                htmlFor="address"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Adress
              </label>

              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                id="address"
                type="text"
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-4 p-2.5"
              />

              <p className="mt-3 hidden text-xs text-red-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="md:max-w-64 ">
              <label
                htmlFor="city"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                City
              </label>

              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                id="city"
                type="text"
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-4 p-2.5"
              />

              <p className="mt-3 hidden text-xs text-red-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="md:max-w-32 ">
              <label
                htmlFor="zip"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Zip
              </label>

              <input
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
                id="zip"
                type="text"
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-4 p-2.5"
              />

              <p className="mt-3 hidden text-xs text-red-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="md:w-80 ">
              <label
                htmlFor="country"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Country
              </label>

              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                id="country"
                type="text"
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-4 p-2.5"
              />

              <p className="mt-3 hidden text-xs text-red-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="md:max-w-64 ">
              <label
                htmlFor="continent"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Continent
              </label>

              <input
                name="continent"
                value={formData.continent}
                onChange={handleChange}
                required
                id="continent"
                type="text"
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-4 p-2.5"
              />

              <p className="mt-3 hidden text-xs text-red-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>

          <h2 className="mb-4 font-semibold text-gray-900">Facilities</h2>
          <ul className="items-center w-full text-sm font-medium text-gray-900 border-gray-300 bg-white border rounded-lg sm:flex">
            <li className="w-full border-b sm:border-b-0 sm:border-r border-gray-300">
              <div className="flex items-center ps-3">
                <input
                  type="checkbox"
                  name="wifi"
                  checked={formData.wifi}
                  onChange={handleChange}
                  id="meta-checkbox-wifi"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
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
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
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
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
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
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
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
                  className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-10 p-2.5"
                  min="1"
                  max="999"
                  placeholder="1 - 999"
                  required
                />
              </div>
              <p
                id="helper-text-explanation"
                className="mt-1 text-sm text-gray-500 dark:text-gray-400"
              >
                Please select a digit number from 1 to 999.
              </p>
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
                    className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                    placeholder="1 - 5"
                    min="1"
                    max="5"
                    required
                  />
                </div>
                <p
                  id="helper-text-explanation"
                  className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                >
                  Please select a digit number from 1 to 5.
                </p>
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
                    className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                    placeholder="Enter price per night"
                    min="1"
                    required
                  />
                </div>
                <p
                  id="helper-text-explanation"
                  className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                >
                  Please select a digit number from 1.
                </p>
              </div>
            </div>
          </div>
          <h2 className="mb-4 font-semibold text-gray-900">Details</h2>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              id="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
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
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
              {isSubmitting ? 'Creating...' : 'Create Venue'}
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
