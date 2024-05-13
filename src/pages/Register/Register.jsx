import RegisterForm from '../../components/Forms/RegisterForm';

/**
 * `Register` is a React component that provides a registration interface for new users on the Holidaze platform.
 * It is designed to be used as part of the authentication flow, allowing users to create new accounts. This component
 * encapsulates the `RegisterForm` which handles the user input and submission logic.
 *
 * @returns {JSX.Element} The registration section with the `RegisterForm` to handle new user registrations.
 */

function Register() {
  return (
    <section className="relative md:container md:mx-auto p-4 w-full flex items-end justify-center">
      <div className="w-full max-w-[500px] absolute top-36 sm:top-40 md:top-50">
        <div className="space-y-2">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}

export default Register;
