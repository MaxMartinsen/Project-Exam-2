// src/components/Forms/SearchForm.jsx
// import { useState, useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';

// import { DateRange } from 'react-date-range';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';
// import format from 'date-fns/format';
// import addDays from 'date-fns/addDays';

// import useDisableCalendarDates from '../../hooks/useDisableCalendarDates';

// import { FaDoorOpen, FaDoorClosed } from 'react-icons/fa';
// import { MdOutlineLocationCity } from 'react-icons/md';

// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedValue(value), delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

// function SearchForm({ onSearch, isLoggedIn }) {
//   const bookings = useSelector((state) => state.bookings.bookings);
//   const [searchQuery, setSearchQuery] = useState('');
//   const debouncedSearchQuery = useDebounce(searchQuery, 500);
//   const [open, setOpen] = useState(false);
//   const calendarRef = useRef(null);
//   const { disabledDates } = useDisableCalendarDates({ bookings });
//   const [isCalendarDisabled, setIsCalendarDisabled] = useState(false);
//   const [range, setRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date(), 1),
//       key: 'selection',
//     },
//   ]);

//   const handleChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate check-in and check-out dates
//     const { startDate, endDate } = range[0];
//     if (!startDate || !endDate) {
//       console.error('Check-in and check-out dates are required.');
//       return;
//     }

//     // Ensure that startDate is before endDate
//     if (startDate >= endDate) {
//       console.error('Check-in date must be before check-out date.');
//       return;
//     }

//     // Prepare the data to pass to `onSearch`
//     const searchInfo = {
//       checkIn: startDate.toISOString(),
//       checkOut: endDate.toISOString(),
//       query: searchQuery,
//     };

//     // Trigger the search logic
//     setIsCalendarDisabled(true);
//     onSearch(searchInfo);
//   };

//   useEffect(() => {
//     if (debouncedSearchQuery.trim()) {
//       onSearch(debouncedSearchQuery);
//     }
//   }, [debouncedSearchQuery, onSearch]);

//   const handleOutsideClick = (e) => {
//     if (calendarRef.current && !calendarRef.current.contains(e.target)) {
//       setOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (open) {
//       document.addEventListener('click', handleOutsideClick);
//     } else {
//       document.removeEventListener('click', handleOutsideClick);
//     }

//     return () => {
//       document.removeEventListener('click', handleOutsideClick);
//     };
//   }, [open]);

//   return (
//     <div ref={calendarRef} className="relative">
//       <form
//         onSubmit={handleSubmit}
//         className="relative flex flex-col md:flex-row items-center mx-auto bg-orange-500 bg-opacity-80 p-4 rounded-xl gap-4"
//       >
//         <div className="relative w-full">
//           <label htmlFor="location" className="sr-only">
//             Search location
//           </label>
//           <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//             <MdOutlineLocationCity className="text-gray-500 w-6 h-6" />
//           </div>
//           <input
//             id="location"
//             type="text"
//             value={searchQuery}
//             onChange={handleChange}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
//             placeholder="Search for venue"
//           />
//         </div>
//         {isLoggedIn && (
//           <>
//             <div className="relative w-full">
//               <label htmlFor="checkIn" className="sr-only">
//                 Check in
//               </label>
//               <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                 <FaDoorOpen className="text-gray-500 w-6 h-6" />
//               </div>
//               <input
//                 id="checkIn"
//                 type="text"
//                 value={format(range[0].startDate, 'dd.MM.yyyy')}
//                 onClick={() => setOpen(true)}
//                 onChange={() => {}}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
//                 placeholder="Check in"
//               />
//             </div>
//             <div className="relative w-full">
//               <label htmlFor="checkOut" className="sr-only">
//                 Check out
//               </label>
//               <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                 <FaDoorClosed className="text-gray-500 w-6 h-6" />
//               </div>
//               <input
//                 id="checkOut"
//                 type="text"
//                 value={format(range[0].endDate, 'dd.MM.yyyy')}
//                 onClick={() => setOpen(true)}
//                 onChange={() => {}}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
//                 placeholder="Check out"
//               />
//             </div>
//           </>
//         )}
//         <button
//           type="submit"
//           className="tracking-widest inline-flex items-center py-2.5 px-3 text-sm font-bold text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
//         >
//           Search
//         </button>
//       </form>
//       {open && isLoggedIn && (
//         <div
//           id="calendar"
//           className="absolute md:left-80 z-10 flex items-center justify-center mb-4 gap-4"
//         >
//           <DateRange
//             ranges={range}
//             onChange={(item) => setRange([item.selection])}
//             editableDateInputs={true}
//             moveRangeOnFirstSelection={false}
//             months={1}
//             direction="horizontal"
//             className="calendarElement rounded-xl w-full"
//             rangeColors={['#f27777']}
//             minDate={new Date()}
//             disabledDates={isCalendarDisabled ? disabledDates : []}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchForm;
