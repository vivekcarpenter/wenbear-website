import { motion } from "framer-motion";
import { RiCheckLine } from "react-icons/ri";

const workItems = [
  {
    title: "Healthcare Management System",
    image:
      "https://readdy.ai/api/search-image?query=A%20modern%20healthcare%20management%20system%20interface%20displayed%20on%20multiple%20devices%20%28desktop%2C%20tablet%2C%20mobile%29.%20The%20interface%20shows%20patient%20records%2C%20medical%20charts%2C%20appointment%20scheduling%2C%20and%20analytics%20dashboards.%20The%20design%20is%20clean%20and%20professional%20with%20a%20blue%20and%20white%20color%20scheme%2C%20featuring%20medical%20icons%20and%20data%20visualizations.%20The%20system%20appears%20user-friendly%20and%20sophisticated%2C%20suitable%20for%20hospital%20staff&width=600&height=400&seq=healthcare123&orientation=landscape",

    description:
      "Developed a comprehensive hospital management system for a leading healthcare provider in Indore...",
    results: [
      "40% reduction in administrative workload",
      "Improved patient satisfaction by 35%",
      "Seamless integration with existing systems",
    ],
    tags: ["Healthcare", "Web Application", "AI Integration"],
  },
  {
    title: "AI-Powered E-commerce Platform",
    image:
      "https://readdy.ai/api/search-image?query=A%20sophisticated%20e-commerce%20platform%20interface%20displayed%20on%20multiple%20devices.%20The%20interface%20shows%20product%20listings%2C%20shopping%20cart%2C%20payment%20gateway%2C%20and%20inventory%20management%20dashboard.%20The%20design%20is%20modern%20and%20sleek%20with%20a%20professional%20aesthetic%2C%20featuring%20high-quality%20product%20images%2C%20clean%20navigation%2C%20and%20data%20analytics%20visualizations.%20The%20platform%20appears%20comprehensive%20and%20user-friendly%20for%20both%20customers%20and%20administrators&width=600&height=400&seq=ecommerce123&orientation=landscape",

    description:
      "Built a custom e-commerce solution with AI-driven product recommendations and inventory management...",
    results: [
      "28% increase in average order value",
      "45% reduction in inventory costs",
      "Personalized shopping experience for customers",
    ],
    tags: ["E-commerce", "Machine Learning", "Inventory Management"],
  },
];

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay },
  }),
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const Work = () => {
  return (
    <motion.section
      id="work"
      className="py-16 md:py-24 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      <motion.div className="container mx-auto px-6">
        <motion.div className="text-center mb-16" variants={fadeInLeft}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our recent projects and see how we've helped businesses
            transform through technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {workItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              {/* Image Animation on Scroll */}
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover object-top"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={imageVariant}
              />

              {/* Content From Left */}
              <motion.div
                className="p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInLeft}
                custom={index * 0.3}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Key Results:
                  </h4>
                  <ul className="space-y-2">
                    {item.results.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-5 h-5 flex items-center justify-center text-primary mr-2 mt-0.5">
                          <RiCheckLine />
                        </div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-12" variants={fadeInLeft}>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition inline-block shadow-md"
          >
            Discuss Your Project
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Work;
