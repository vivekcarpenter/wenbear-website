import {
  RiBrainLine,
  RiCustomerService2Line,
  RiEyeLine,
  RiHeartPulseLine,
  RiBankLine,
  RiStore2Line,
  RiCheckLine,
} from "react-icons/ri";
import {GiWeightLiftingUp} from "react-icons/gi"
import { motion } from "framer-motion";

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  viewport: { once: false,amount: 0.2 },
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

const flipUp = {
  hidden: { opacity: 0, rotateX: 90, y: 60 },
  viewport: { once: false ,amount: 0.2},
  visible: (delay = 0) => ({
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      delay,
      duration: 0.9,
      ease: "easeOut",
    },
  }),
};


const AiSolutions = () => {
  return (
    <motion.section
      id="ai-solutions"
      className="py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.3,
            delayChildren: 0.3,
          },
        },
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <motion.div
            className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-12"
            variants={fadeInLeft}
            custom={0.1}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              AI-First Approach to Software Development
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We integrate artificial intelligence into every aspect of our
              development process, creating smarter solutions that adapt, learn,
              and evolve with your business.
            </p>

            <div className="space-y-6">
              {/* Feature 1 */}
              <motion.div
                className="flex items-start"
                variants={fadeInLeft}
                custom={0.2}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mr-4 shrink-0">
                  <RiBrainLine className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Machine Learning Integration
                  </h3>
                  <p className="text-gray-600">
                    Custom ML models that analyze your data to provide
                    actionable insights and automate complex processes.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="flex items-start"
                variants={fadeInLeft}
                custom={0.3}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mr-4 shrink-0">
                  <RiCustomerService2Line className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Intelligent Automation
                  </h3>
                  <p className="text-gray-600">
                    Smart workflows that reduce manual effort, minimize errors,
                    and accelerate business processes.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                className="flex items-start"
                variants={fadeInLeft}
                custom={0.4}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mr-4 shrink-0">
                  <RiEyeLine className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Predictive Analytics
                  </h3>
                  <p className="text-gray-600">
                    Forward-looking insights that help you anticipate market
                    changes and customer needs.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="w-full md:w-1/2"
            variants={fadeInLeft}
            custom={0.5}
          >
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://readdy.ai/api/search-image?query=A%20modern%20visualization%20of%20artificial%20intelligence%20and%20machine%20learning%20concepts%2C%20showing%20neural%20networks%2C%20data%20patterns%2C%20and%20intelligent%20algorithms.%20The%20image%20features%20a%20clean%2C%20professional%20aesthetic%20with%20blue%20and%20purple%20color%20tones.%20It%20includes%20abstract%20representations%20of%20AI%20processing%2C%20decision%20trees%2C%20and%20data%20analysis%20in%20a%20visually%20appealing%20way%20that%20conveys%20technological%20sophistication%20and%20innovation&width=600&height=500&seq=ai123&orientation=landscape"
                alt="AI Solutions"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Use Cases */}
       {/* Use Cases */}
<motion.div
  className="mt-20"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.4,
      },
    },
  }}
>
  <motion.h3
    className="text-2xl font-bold text-gray-900 mb-8 text-center"
    variants={flipUp}
    custom={0.2}
  >
    AI Solutions for Various Industries
  </motion.h3>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
    {[
      {
        title: "Healthcare",
        icon: <RiHeartPulseLine />,
        description:
          "AI-powered diagnostic tools, patient monitoring systems, and predictive health analytics.",
        items: [
          "Disease prediction models",
          "Medical image analysis",
          "Patient risk assessment",
        ],
      },
      {
  title: "Gym",
  icon: <GiWeightLiftingUp />,
  description:
    "AI-powered fitness systems to enhance workouts, monitor health, and provide personalized training programs.",
  items: [
    "Smart workout recommendation system",
    "AI-based fitness progress tracking",
    "Personalized diet and training plans",
    // "Real-time form correction using vision AI",
    "Virtual fitness coach integration",
  ],
},
      {
        title: "Retail",
        icon: <RiStore2Line />,
        description:
          "Smart retail solutions for inventory management, customer insights, and personalized shopping.",
        items: [
          "Demand forecasting",
          "Recommendation engines",
          "Customer segmentation",
        ],
      },
    ].map((sector, index) => (
      <motion.div
        key={index}
        className="bg-white rounded-lg shadow-lg p-8"
        variants={flipUp}
        custom={0.5 + index * 0.3}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full mb-6 text-primary text-2xl">
          {sector.icon}
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-3">
          {sector.title}
        </h4>
        <p className="text-gray-600 mb-4">{sector.description}</p>
        <div className="space-y-2">
          {sector.items.map((item, i) => (
            <div key={i} className="flex items-center">
              <div className="w-5 h-5 flex items-center justify-center text-primary mr-2">
                <RiCheckLine />
              </div>
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

      </div>
    </motion.section>
  );
};

export default AiSolutions;
