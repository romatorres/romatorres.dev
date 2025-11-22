import About from "@/components/landingpage/About";
import Contacts from "@/components/landingpage/Contacts";
import Footer from "@/components/landingpage/Footer";
import Header from "@/components/landingpage/Header";
import Hero from "@/components/landingpage/Hero";
/* import Portfolio from "@/components/landingpage/Projects/Projects"; */
import Projects from "@/components/landingpage/Projects/Projects";
import Services from "@/components/landingpage/Services";

export default function Home() {
  return (
    <>
      <section id="header">
        <Header />
      </section>

      <section>
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="projects">
        <Projects />
      </section>

      {/* <Portfolio /> */}

      <section id="contacts">
        <Contacts />
      </section>

      <Footer />
    </>
  );
}
