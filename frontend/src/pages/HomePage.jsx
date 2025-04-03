import Automotive from '../components/Automotive';
import Footer from "../components/Footer"
import ContactForm from '../components/formComponent';
import Header from '../components/Header'
import HeroPage from '../components/HeroPage'

function HomePage() {
  return (
    <div className="flex flex-col w-screen">
      <Header />
      <HeroPage />
      <Automotive/>
      <ContactForm/>
      <Footer/>
    </div>
  );
}
export default HomePage