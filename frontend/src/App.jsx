import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Counters from './components/Counters';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Quality from './components/Quality';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import GrainLoader from './components/GrainLoader';

function App() {
  return (
    <>
      <GrainLoader />
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Counters />
      <Process />
      <Gallery />
      <Services />
      <Quality />
      <Partners />
      <Contact />
      <Footer />
      <WhatsAppFab />
    </>
  );
}

export default App;
