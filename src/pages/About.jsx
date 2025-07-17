import { motion } from "framer-motion";
import {
  RiFocus2Line,
  RiEyeLine,
  RiHeartLine,
} from "react-icons/ri";

const fadeInUp = {
  hidden: { opacity: 0, y: 200 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration: 0.9,
      ease: "easeOut",
    },
  }),
};


const About = () => {
  return (
    <motion.section
      id="about"
      className="py-16 md:py-24 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
          },
        },
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-12"
            variants={slideInLeft}
          >
            <motion.img
            variants={fadeInUp}
            src="https://readdy.ai/api/search-image?query=A%20modern%20office%20space%20in%20Indore%2C%20India%20with%20a%20professional%20tech%20company%20atmosphere.%20The%20image%20shows%20a%20collaborative%20workspace%20with%20developers%20working%20on%20computers%2C%20whiteboards%20with%20software%20architecture%20diagrams%2C%20and%20a%20view%20of%20the%20city%20skyline.%20The%20office%20has%20a%20contemporary%20design%20with%20blue%20accent%20colors%2C%20plants%2C%20and%20a%20professional%20yet%20comfortable%20environment%20that%20reflects%20a%20software%20development%20company&width=600&height=500&seq=office123&orientation=landscape"
            alt="About WenBear Technologies"
            className="w-full h-auto rounded-lg shadow-xl"
          />
          </motion.div>

          {/* Text Section */}
          <motion.div
  className="w-full md:w-1/2"
  variants={slideInRight}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.4 }}
>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About WenBear Technologies
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2022 in Indore, Madhya Pradesh, WenBear Technologies
              has grown into a trusted partner for businesses seeking innovative
              software solutions. We combine technical expertise with a deep
              understanding of business needs to deliver transformative digital
              experiences.
            </p>

            {/* Mission, Vision, Values */}
            <div className="space-y-6 mb-8">
              <motion.div className="flex items-start" variants={fadeInUp}>
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mr-4 shrink-0">
                  <RiFocus2Line className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Our Mission
                  </h3>
                  <p className="text-gray-600">
                    To empower businesses with intelligent software solutions
                    that drive growth, efficiency, and innovation.
                  </p>
                </div>
              </motion.div>

              <motion.div className="flex items-start" variants={fadeInUp}>
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mr-4 shrink-0">
                  <RiEyeLine className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Our Vision
                  </h3>
                  <p className="text-gray-600">
                    To be the leading AI-driven software development company in
                    India, known for excellence and innovation.
                  </p>
                </div>
              </motion.div>

              <motion.div className="flex items-start" variants={fadeInUp}>
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mr-4 shrink-0">
                  <RiHeartLine className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Our Values
                  </h3>
                  <p className="text-gray-600">
                    Excellence, innovation, integrity, and client-centricity
                    guide everything we do.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition inline-block whitespace-nowrap shadow-md"
            >
              Get to Know Us
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
