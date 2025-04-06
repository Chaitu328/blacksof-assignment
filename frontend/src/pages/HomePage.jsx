import Footer from "../components/Footer"
import ContactForm from '../components/FormComponent';
import Header from '../components/Header'
import HeroPage from '../components/HeroPage'
import { lazy } from 'react';
const Automotive = lazy(() =>import('../components/Automotive'))

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