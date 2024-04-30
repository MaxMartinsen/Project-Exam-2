import IMAGE from '../../assets/image/default-image.png';
import RegisterForm from '../../components/Forms/RegisterForm';

function Register() {
  return (
    <>
      <main className="w-full max-w-screen-xl mx-auto flex items-center gap-20">
        <div className="hidden w-1/2 grid-cols-2 grid-rows-3 gap-4 h-[700px] lg:grid ">
          <img
            className="h-full w-full rounded-3xl row-span-1 shadow-xl"
            src={IMAGE}
            alt="Breakfast plate"
          />
          <img
            className="h-full w-full rounded-3xl row-span-2 shadow-xl"
            src={IMAGE}
            alt="Couple relaxing by the water"
          />

          <img
            className="h-full w-full rounded-3xl row-span-2 shadow-xl"
            src={IMAGE}
            alt="Small and cozy living room"
          />

          <img
            className="h-full w-full rounded-3xl row-span-1 shadow-xl"
            src={IMAGE}
            alt="Hotel bed"
          />
        </div>

        <div className="w-full max-w-[500px] m-auto">
          <div className="space-y-2 pb-5">
            <RegisterForm />
          </div>
        </div>
      </main>
    </>
  );
}

export default Register;
