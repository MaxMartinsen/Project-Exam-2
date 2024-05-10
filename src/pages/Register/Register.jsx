import RegisterForm from '../../components/Forms/RegisterForm';

function Register() {
  return (
    <main className="bg-[url('/src/assets/image/hero-pattern.png')] w-full h-[300px] md:h-[600px] bg-cover flex">
      <section className="relative md:container md:mx-auto p-4 w-full flex items-end justify-center">
        <div className="w-full max-w-[500px] absolute top-36 sm:top-40 md:top-50">
          <div className="space-y-2">
            <RegisterForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
