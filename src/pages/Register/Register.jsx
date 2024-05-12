import RegisterForm from '../../components/Forms/RegisterForm';

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
