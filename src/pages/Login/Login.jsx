import LoginForm from '../../components/Forms/LoginForm';

/**
 * `Login` is a React component that serves as the main user interface for user authentication on the Holidaze platform.
 * It provides a container for the `LoginForm` component, which handles user login processes.
 * This component is designed to centrally place the login form on the page, providing a focused and user-friendly experience.
 *
 * @returns {JSX.Element} The `Login` component, which includes the `LoginForm` for handling user login.
 */

function Login() {
  return (
    <section className="relative md:container md:mx-auto p-4 w-full flex items-end justify-center">
      <div className="w-full max-w-[500px] absolute top-36 sm:top-40 md:top-60">
        <div className="space-y-2">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}

export default Login;
