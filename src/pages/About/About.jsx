import aboutImg from '../../assets/image/default-about.png';

/**
 * About component that provides a detailed description of the holidaze service.
 * This component can optionally display an image and text.
 *
 * @returns {JSX.Element} The rendered About component.
 */

function About() {
  return (
    <section className="pt-24 pb-3">
      <div className="max-w-screen-xxl px-6 py-10 mx-auto">
        <div className="gap-8 items-center py-8 px-4 mx-auto xl:gap-16 md:grid md:grid-cols-2 sm:pt-40 lg:px-6">
          <div className="flex items-center justify-center">
            <img className="h-full" src={aboutImg} alt="dashboard image" />
          </div>
          <div className="mt-4 md:mt-0 flex flex-col">
            <h1 className="mb-4 text-4xl tracking-tight font-semibold text-gray-900">
              Discover Your Perfect Holiday Home
            </h1>
            <p className="mb-6 font-light text-gray-500 md:text-lg max-w-96">
              At Holidaze, we make the search for your next vacation stay as
              easy and enjoyable as the getaway itself. Explore a wide range of
              homes—from beach front bungalows to mountain chalets—all tailored
              to meet your holiday needs. Whether you&apos;re planning a
              romantic retreat or a family reunion, find your perfect escape
              with Holidaze.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
