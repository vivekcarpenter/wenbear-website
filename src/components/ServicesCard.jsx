const ServiceCard = ({ service }) => {
  const IconComponent = require(`react-icons/ri`)[service.icon];
  
  return (
    <div className="service-card bg-white rounded-lg shadow-lg p-8 transition-all duration-400 hover:-translate-y-2 hover:shadow-xl">
      <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full mb-6">
        <IconComponent className="text-primary text-xl" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <ul className="space-y-2 mb-6">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <div className="w-5 h-5 flex items-center justify-center text-primary mr-2 mt-0.5">
              <RiCheckLine />
            </div>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="text-primary font-medium flex items-center hover:underline"
      >
        Learn more
        <div className="w-5 h-5 flex items-center justify-center ml-1">
          <RiArrowRightLine />
        </div>
      </a>
    </div>
  );
};