import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import {
  RiHospitalFill,
  RiBankFill,
  RiStoreFill,
  RiBuilding4Fill,
} from "react-icons/ri";

const clients = [
  { name: "Indore Health", icon: <RiHospitalFill /> },
  { name: "MP Finance", icon: <RiBankFill /> },
  { name: "RetailPlus", icon: <RiStoreFill /> },
  { name: "TechCorp", icon: <RiBuilding4Fill /> },
];

const Clients = () => {
  const controls = useAnimation();

  // Start animation on load
  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        duration: 15,
        ease: "linear",
      },
    });
  }, [controls]);

  const handlePause = () => controls.stop();
  const handleResume = () => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        duration: 15,
        ease: "linear",
      },
    });
  };

  const loopClients = [...clients, ...clients];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Businesses
          </h2>
          <p className="text-lg text-gray-600">
            We've partnered with leading organizations across various industries.
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
        >
          <motion.div className="flex space-x-10" animate={controls}>
            {loopClients.map((client, i) => (
              <div
                key={i}
                className="flex items-center justify-center min-w-[250px] p-4 bg-white rounded-lg shadow hover:shadow-md transition"
              >
                <div className="flex items-center text-gray-600 space-x-3">
                  <div className="text-4xl text-primary">{client.icon}</div>
                  <span className="text-xl font-semibold">{client.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
