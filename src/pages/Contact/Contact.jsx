import { useState } from 'react';
import ContactConfirmation from '../../components/Modal/ContactConfirmation';

/**
 * Contact component to handle user inquiries through a form.
 * Manages form state and handles submission.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The Contact component that includes input fields for first name, last name, email, and a message textarea, with a submission button that triggers a modal confirmation.
 */

function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('');
  };
  return (
    <section className="pt-24 pb-3">
      <div className="max-w-screen-xxl px-6 py-10 mx-auto">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 md:text-3xl">
            Chat to our friendly team
          </h1>

          <p className="mt-3 text-gray-500">
            We&apos;d love to hear from you.
            <br /> Please fill out this form or shoot us an email.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
          <div className="p-4 py-6 rounded-lg bg-white/45 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="-mx-2 md:items-center md:flex">
                <div className="flex-1 px-2">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    First Name
                  </label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="name"
                    id="firstName"
                    type="text"
                    placeholder="John "
                    className="bg-white/45 border-white border-2 rounded-xl text-fuscous-gray-700 text-sm font-semibold focus:outline-none focus:ring-0 focus:border-pelorous-300 block w-full py-2 px-4"
                  />
                </div>

                <div className="flex-1 px-2 mt-4 md:mt-0">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Last Name
                  </label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className="bg-white/45 border-white border-2 rounded-xl text-fuscous-gray-700 text-sm font-semibold focus:outline-none focus:ring-0 focus:border-pelorous-300 block w-full py-2 px-4"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  id="email"
                  type="email"
                  placeholder="johndoe@stud.noroff.no"
                  className="bg-white/45 border-white border-2 rounded-xl text-fuscous-gray-700 text-sm font-semibold focus:outline-none focus:ring-0 focus:border-pelorous-300 block w-full py-2 px-4"
                />
              </div>

              <div className="w-full mt-4">
                <label
                  htmlFor="textarea"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  id="textarea"
                  className="block w-full h-32 px-5 py-2.5 mt-2 text-sm font-semibold text-fuscous-gray-700 bg-white/45 border-2 border-white rounded-lg md:h-56 focus:border-pelorous-300  focus:outline-none focus:ring-0"
                  placeholder="Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 mt-4 text-lg font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform rounded-xl border-2 border-white bg-gradient-to-br from-pelorous-600 to-pelorous-400 hover:from-pelorous-500 hover:to-pelorous-300"
              >
                Send message
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <span className="inline-block p-3 text-pelorous-500 rounded-full bg-white/45">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </span>

              <h2 className="mt-4 text-base font-medium text-gray-800">
                Email
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Our friendly team is here to help.
              </p>
              <p className="mt-2 text-sm text-pelorous-500">
                post@holidaze-venue.netlify.app
              </p>
            </div>

            <div>
              <span className="inline-block p-3 text-pelorous-500 rounded-full bg-white/45">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </span>

              <h2 className="mt-4 text-base font-medium text-gray-800">
                Live chat
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Our friendly team is here to help.
              </p>
              <p className="mt-2 text-sm text-pelorous-500">Start new chat</p>
            </div>

            <div>
              <span className="inline-block p-3 text-pelorous-500 rounded-full bg-white/45">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </span>

              <h2 className="mt-4 text-base font-medium text-gray-800">
                Office
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Come say hello at our office HQ.
              </p>
              <p className="mt-2 text-sm text-pelorous-500">
                100 Smith Street Collingwood VIC 3066 AU
              </p>
            </div>

            <div>
              <span className="inline-block p-3 text-pelorous-500 rounded-full bg-white/45">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </span>

              <h2 className="mt-4 text-base font-medium text-gray-800">
                Phone
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Mon-Fri from 8am to 5pm.
              </p>
              <p className="mt-2 text-sm text-pelorous-500">
                +1 (555) 000-0000
              </p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ContactConfirmation onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}

export default Contact;
