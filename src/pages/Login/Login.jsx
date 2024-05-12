import LoginForm from '../../components/Forms/LoginForm';

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
