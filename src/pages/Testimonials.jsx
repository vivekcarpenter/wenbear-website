import { useState, useEffect } from "react";
import {
  RiStarFill,
  RiStarHalfFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiUserLine,
} from "react-icons/ri";

const Testimonials = () => {
  const testimonials = [
    {
      rating: 5,
      content:
        "WenBear Technologies transformed our healthcare operations with their hospital management system. The entire workflow is now digital and efficient.",
      author: "Dr. Rajesh Sharma",
      position: "Medical Director, Indore Health Services",
    },
    {
      rating: 4.5,
      content:
        "Their AI integration helped us forecast inventory better and understand customer behavior. Amazing results!",
      author: "Neha Mehta",
      position: "Product Head, RetailPlus",
    },
    {
      rating: 5,
      content:
        "We reduced fraud incidents by 40% using WenBear’s custom AI solution. Their team truly understands finance tech.",
      author: "Amit Deshmukh",
      position: "VP, MP Finance",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const [isHovered, setIsHovered] = useState(false);

  function getSlidesToShow() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev < testimonials.length - slidesToShow ? prev + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : testimonials.length - slidesToShow
    );
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, slidesToShow, isHovered]);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it – hear what our clients have to say about working with us.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                width: `${(testimonials.length * 100) / slidesToShow}%`,
                transform: `translateX(-${
                  (100 / testimonials.length) * currentIndex
                }%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`w-full px-4 transition-all duration-500 ${
                    slidesToShow === 3
                      ? "lg:w-1/3"
                      : slidesToShow === 2
                      ? "md:w-1/2"
                      : "w-full"
                  }`}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white shadow text-gray-800 mx-2 flex items-center justify-center hover:bg-blue-50 transition"
            >
              <RiArrowLeftSLine className="text-xl" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white shadow text-gray-800 mx-2 flex items-center justify-center hover:bg-blue-50 transition"
            >
              <RiArrowRightSLine className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(testimonial.rating);
    const hasHalfStar = testimonial.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <RiStarFill key={`star-${i}`} className="text-yellow-400 mr-1" />
      );
    }

    if (hasHalfStar) {
      stars.push(<RiStarHalfFill key="half" className="text-yellow-400 mr-1" />);
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full hover:shadow-lg transition-all duration-300">
      <div className="mb-4 flex items-center">{renderStars()}</div>
      <p className="text-gray-600 italic mb-6 leading-relaxed">
        “{testimonial.content}”
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-4">
          <RiUserLine className="text-xl" />
        </div>
        <div>
          <h4 className="text-md font-bold text-gray-800">
            {testimonial.author}
          </h4>
          <p className="text-sm text-gray-600">{testimonial.position}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
