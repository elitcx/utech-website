import '../../styles/home.css';
import Nav from '../../components/Nav';
import Hero from './Hero';
import Marquee from '../../components/Marquee';
import DivisionsShowcase from './DivisionsShowcase';
import Terminal from './Terminal';
import HomeAbout from './HomeAbout';
import Pillars from './Pillars';
import HomeEvents from './HomeEvents';
import CTA from './CTA';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <DivisionsShowcase />
      <Terminal />
      <HomeAbout />
      <Pillars />
      <HomeEvents />
      <CTA />
      <Footer />
    </>
  );
}
