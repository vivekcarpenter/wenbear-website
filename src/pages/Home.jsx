import { motion } from "framer-motion";
import Header from "./Header";
import Hero from "./Hero";
import Services from "./Services";
import Stats from "./Stats";
import About from "./About";
import Work from "./Work";
import Testimonials from "./Testimonials";
import Clients from "./Clients";
import Contact from "./Contact";
import CTA from "./CTA";
import Footer from "./Footer";
import AISolutions from "./AiSolutions";
import Blogs from "./Blogs";
import MouseBlob from "../components/MouseBlob";

// Animation presets
const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 70, damping: 16 },
  },
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 70, damping: 16 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "backOut" },
  },
};

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white overflow-x-hidden"
    >
      <MouseBlob />
      <Header />

      <main>
        {/* Hero */}
        <section id="home" className="scroll-mt-24">
          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            layout
          >
            <Hero />
          </motion.div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-24">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            layout
          >
            <Services />
          </motion.div>
        </section>

        {/* Blogs */}
        <section id="blogs" className="scroll-mt-24">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            layout
          >
            <Blogs />
          </motion.div>
        </section>

        {/* AI Solutions */}
        <section id="ai-solutions" className="scroll-mt-24">
          <motion.div
            variants={slideInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            layout
          >
            <AISolutions />
          </motion.div>
        </section>

        {/* Stats */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          layout
        >
          <Stats />
        </motion.section>

        {/* About */}
        <section id="about" className="scroll-mt-24">
          <motion.div
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            layout
          >
            <About />
          </motion.div>
        </section>

        {/* Work */}
        <section id="work" className="scroll-mt-24">
          <motion.div
            variants={slideInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            layout
          >
            <Work />
          </motion.div>
        </section>

        {/* Testimonials */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          layout
        >
          <Testimonials />
        </motion.section>

        {/* Clients */}
        <motion.section
          variants={slideInFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          layout
        >
          <Clients />
        </motion.section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24">
          <motion.div
            variants={slideInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            layout
          >
            <Contact />
          </motion.div>
        </section>

        {/* CTA */}
        <motion.section
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          layout
        >
          <CTA />
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        layout
      >
        <Footer />
      </motion.footer>
    </motion.div>
  );
}

export default Home;
