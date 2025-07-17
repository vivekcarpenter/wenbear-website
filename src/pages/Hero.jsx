import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import { RiArrowRightLine } from "react-icons/ri";
import animationData from "../assets/image.json";

const Hero = () => {
  const words = ["Where", "Code", "Meets", "Intelligence"];

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25, // 👈 delay between each word
        delayChildren: 0.2,
      },
    },
  };

  const wordAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut", // 👈 smooth slide up
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.section
      id="home"
      className="hero-section pt-28 md:pt-32 pb-16 md:pb-24"
      initial="hidden"
      animate="visible"
      variants={container}
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-12">
        <div className="flex flex-col md:flex-row items-center w-full">
          {/* Left Side */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Animated Heading (word by word, smooth) */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 flex flex-wrap gap-2"
              variants={container}
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordAnimation}
                  transition={{ duration: 0.6 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl"
            >
              Custom software solutions powered by AI to transform your
              business. We build intelligent applications that drive growth and
              efficiency.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#services"
                className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                Explore Services
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="border-2 border-gray-800 text-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-800 hover:text-white transition"
              >
                Contact Us
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side (optional image/animation) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
            className="w-full md:w-1/2 relative flex justify-center items-center"
          >
            {/* Glowing animated background */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.2 }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
              className="absolute w-72 h-72 bg-purple-500 blur-3xl rounded-full z-0"
            ></motion.div>

            {/* AI Brain Animation */}
            <Player
              autoplay
              loop
              src={animationData}
              className="w-full h-[28rem] z-10"
            />
          </motion.div>

          {/* <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
  className="w-full md:w-1/2 flex justify-center"
>
  <img
    src="https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="AI Illustration"
    className="w-full h-auto object-contain rounded-lg "
  />
</motion.div> */}
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
