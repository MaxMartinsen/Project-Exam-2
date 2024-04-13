import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Allvenues from '../List/Allvenues';
import Search from './../Forms/Search';

function Home() {
  return (
    <main className="">
      <Breadcrumb />
      <Search />
      <Allvenues />
    </main>
  );
}

export default Home;
