import NotFoundComponent from '../components/NotFoundComponent';
import Footer from "../components/Footer"
import Header from '../components/Header';

function NotFoundPage() {
  return (
    <div className="flex flex-col w-screen">
      <Header />
      <NotFoundComponent/>
      <Footer/>
    </div>
  );
}


export default NotFoundPage