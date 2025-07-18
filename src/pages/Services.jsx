import { useState } from "react";
import {
  RiCodeSSlashLine,
  RiGlobalLine,
  RiRobotLine,
  RiLayoutLine,
  RiTeamLine,
  RiHospitalLine,
  RiCheckLine,
  RiArrowRightLine,
  RiCloseLine,
  RiSmartphoneLine
} from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  const services = [
    {
      icon: RiCodeSSlashLine,
      title: "Custom Software Development",
      description:
        "Tailored software solutions designed to address your specific business challenges and requirements.",
      features: ["ERP Systems", "HRM Solutions", "Inventory Management"],
      fullDescription: [
        {
          title: "✅ Business-Centric Solutions",
          description:
            "We develop software aligned with your exact workflows, goals, and challenges—ensuring maximum business impact.",
        },
        {
          title: "✅ Scalable Architecture",
          description:
            "Systems are designed to grow with your business—modular, maintainable, and scalable for future expansion.",
        },
        {
          title: "✅ End-to-End Development",
          description:
            "From planning to deployment and maintenance—we handle every phase of the software lifecycle.",
        },
        {
          title: "✅ Third-Party Integration",
          description:
            "Seamlessly connect with CRMs, ERPs, payment gateways, APIs, and other tools your business relies on.",
        },
        {
          title: "✅ Security-First Approach",
          description:
            "We embed best-in-class security protocols to safeguard your data and ensure compliance with industry standards.",
        },
        {
          title: "✅ Ongoing Support & Optimization",
          description:
            "Post-launch support ensures your software runs smoothly and evolves with your business needs.",
        },
      ],
    },
    {
      icon: RiGlobalLine,
      title: "Web Development",
      fullDescription: [
        {
          title: "✅ Responsive Design",
          description:
            "We build websites that adapt seamlessly to all devices, ensuring an optimal experience for desktop, tablet, and mobile users.",
        },
        {
          title: "✅ SEO-Optimized Architecture",
          description:
            "Our web solutions are designed with performance and search engine visibility in mind to drive traffic and engagement.",
        },
        {
          title: "✅ CMS & Custom Portals",
          description:
            "From WordPress to fully custom-built portals, we tailor content management systems to suit your workflow and business goals.",
        },
        {
          title: "✅ E-commerce Integration",
          description:
            "Robust online store development with shopping cart, payment gateway, and inventory features integrated smoothly.",
        },
        {
          title: "✅ API & Backend Connectivity",
          description:
            "We ensure your frontend communicates efficiently with secure backends and third-party APIs for dynamic functionality.",
        },
        {
          title: "✅ Performance & Security",
          description:
            "Optimized loading speed, HTTPS, and secure coding practices ensure your website is fast and safe for users.",
        },
      ],

      description:
        "Modern, responsive websites and web applications that deliver exceptional user experiences.",
      features: [
        "E-commerce Platforms",
        "Progressive Web Apps",
        "Custom Web Portals",
      ],
    },
    {
      icon: RiRobotLine,
      title: "AI Applications",
      description:
        "Intelligent solutions powered by machine learning and artificial intelligence technologies.",
      fullDescription: [
        {
          title: "✅ Intelligent Automation",
          description:
            "We automate complex workflows using AI-driven systems to reduce manual efforts and improve operational efficiency.",
        },
        {
          title: "✅ Machine Learning Models",
          description:
            "Custom-trained models for classification, prediction, and recommendation based on your business data.",
        },
        {
          title: "✅ Natural Language Processing (NLP)",
          description:
            "Enable your apps to understand and process human language through sentiment analysis, entity recognition, and more.",
        },
        {
          title: "✅ AI-Powered Chatbots",
          description:
            "24/7 intelligent support bots trained on your data to assist users, capture leads, or guide processes effectively.",
        },
        {
          title: "✅ Predictive Analytics",
          description:
            "Analyze historical data to forecast trends, risks, or customer behavior, helping you make proactive decisions.",
        },
        {
          title: "✅ Scalable AI Infrastructure",
          description:
            "We build AI systems on scalable cloud platforms ensuring high availability, speed, and long-term flexibility.",
        },
      ],
      features: [
        "Machine Learning Models",
        "Intelligent Chatbots",
        "Predictive Analytics",
      ],
    },
    {
      icon: RiLayoutLine,
      title: "UI/UX Design",
      description:
        "User-centered design that creates intuitive, engaging and accessible digital experiences.",
      features: ["User Research", "Interface Design", "Usability Testing"],
      fullDescription: [
        {
          title: "✅ User-Centered Design",
          description:
            "Our design process focuses on user needs, behaviors, and goals to create intuitive and meaningful experiences.",
        },
        {
          title: "✅ Wireframes & Prototypes",
          description:
            "We create interactive wireframes and high-fidelity prototypes to visualize and test user flows before development.",
        },
        {
          title: "✅ Visual Identity & Branding",
          description:
            "We align the interface design with your brand’s visual language, ensuring consistency across all touchpoints.",
        },
        {
          title: "✅ Accessibility-First Approach",
          description:
            "Designs are optimized to be inclusive and accessible for users of all abilities, following WCAG guidelines.",
        },
        {
          title: "✅ Usability Testing",
          description:
            "We conduct real-user testing to validate designs, gather feedback, and continuously refine the user experience.",
        },
        {
          title: "✅ Design-to-Code Handoff",
          description:
            "We provide pixel-perfect assets and collaborate with developers to ensure seamless implementation of UI designs.",
        },
      ],
    },
    {
      icon: RiSmartphoneLine, // Aap chaho to koi aur icon bhi use kar sakte ho
      title: "App Development",
      description:
        "Custom mobile and web applications built to solve your business challenges and engage your users.",
      features: [
        "iOS & Android Development",
        "Cross-Platform Apps",
        "UI/UX Design & Prototyping",
      ],
      fullDescription: [
        {
          title: "✅ End-to-End App Development",
          description:
            "From ideation to deployment, we handle the full app development lifecycle across platforms.",
        },
        {
          title: "✅ Native & Cross-Platform Expertise",
          description:
            "Build high-performance apps using Swift, Kotlin, React Native, or Flutter, tailored to your needs.",
        },
        {
          title: "✅ User-Centered Design",
          description:
            "Engaging and intuitive interfaces crafted through UX research and modern UI practices.",
        },
        {
          title: "✅ Scalable Architecture",
          description:
            "Robust backend and cloud-ready solutions that grow with your user base and business demands.",
        },
      ],
    },
    {
      icon: RiHospitalLine,
      title: "Healthcare Solutions",
      description:
        "Specialized software for healthcare providers that improves patient care and operational efficiency.",
      features: [
        "Hospital Management",
        "Electronic Health Records",
        "Telemedicine Platforms",
      ],
      fullDescription: [
        {
          title: "✅ Hospital Management Systems",
          description:
            "Centralized platforms to manage appointments, patients, billing, staff, and departments efficiently.",
        },
        {
          title: "✅ Electronic Health Records (EHR)",
          description:
            "Secure, interoperable EHR systems that allow easy access, sharing, and analysis of patient medical data.",
        },
        {
          title: "✅ Telemedicine Platforms",
          description:
            "Virtual consultation tools for doctors and patients with secure video, chat, and prescription features.",
        },
        {
          title: "✅ Lab & Diagnostic Integrations",
          description:
            "Seamless integration with pathology, radiology, and diagnostic systems to streamline test management.",
        },
        {
          title: "✅ Data Privacy & HIPAA Compliance",
          description:
            "Systems built with strong security and compliance in mind to protect patient data and ensure legal standards.",
        },
        {
          title: "✅ Custom Patient Portals",
          description:
            "Personalized portals where patients can access reports, book appointments, and communicate with providers.",
        },
      ],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 14,
      },
    },
  };

  return (
    <>
      <motion.section
        id="services"
        className="py-16 md:py-24 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" variants={item}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We deliver end-to-end software solutions tailored to your unique
              business needs.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={item}>
                <ServiceCard service={service} onLearnMoreClick={openModal} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <AnimatePresence>
        {modalOpen && selectedService && (
          <ServiceModal service={selectedService} handleClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
};

const ServiceCard = ({ service, onLearnMoreClick }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    transition={{
      type: "spring",
      stiffness: 60,
      damping: 12,
    }}
    className="group relative overflow-hidden bg-white rounded-xl shadow-md p-8 h-full border border-gray-100 hover:shadow-xl transition-shadow duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="relative z-10">
      <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full mb-6 group-hover:bg-white transition-colors duration-300">
        <service.icon className="text-primary text-xl group-hover:text-blue-600 transition-colors duration-300" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
        {service.title}
      </h3>

      <p className="text-gray-600 mb-4">{service.description}</p>

      <ul className="space-y-2 mb-6">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <div className="w-5 h-5 flex items-center justify-center text-primary mr-2 mt-0.5">
              <RiCheckLine />
            </div>
            <span className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onLearnMoreClick(service)}
        className="text-primary font-medium flex items-center hover:underline group-hover:text-blue-600 transition-colors duration-300 focus:outline-none"
      >
        Learn more
        <div className="w-5 h-5 flex items-center justify-center ml-1 transform group-hover:translate-x-1 transition-transform duration-300">
          <RiArrowRightLine />
        </div>
      </button>
    </div>
  </motion.div>
);

const ServiceModal = ({ service, handleClose }) => {
  const [isHovered, setIsHovered] = useState(false);

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      y: "-50px",
      opacity: 0,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 25 },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 sm:p-6 sm:h-[100vh] overflow-y-auto scrollbar-none"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={handleClose}
    >
      {/* Blur Glow Bubble Animation */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.3, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-10 left-10 w-52 h-52 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full blur-3xl z-0 pointer-events-none"
        />
      )}

      {/* Modal Box */}
      <motion.div
        className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl p-5 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition-colors duration-300 p-1 rounded-full hover:bg-gray-100"
          aria-label="Close modal"
        >
          <RiCloseLine size={24} />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full">
            <service.icon className="text-primary text-2xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {service.title}
          </h2>
        </div>

        {/* Short Description */}
        <p className="text-gray-600 mb-6">{service.description}</p>

        {/* Key Features */}
        {service.fullDescription && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Key Features
            </h3>
            <ul className="space-y-5">
              {service.fullDescription.map((feature, i) => (
                <li
                  key={i}
                  className="rounded-lg bg-gray-50 p-4 border border-gray-200"
                >
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Services;
