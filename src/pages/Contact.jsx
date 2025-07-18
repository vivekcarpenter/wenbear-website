import React from "react";
import { useForm } from "react-hook-form";
import {
  RiMapPinLine,
  RiMailLine,
  RiPhoneLine,
} from "react-icons/ri";
import { useAddEnquiryMutation } from "../store/services/enquiryApi";
import { toast } from "react-toastify";

const Contact = () => {
  const [addInquiry, { isLoading }] = useAddEnquiryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      await addInquiry({
        name: formData.name,
        email: formData.email,
        title: formData.subject,
        message: formData.message,
      }).unwrap();

      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to send message.");
    }
  };

  const contactInfo = [
    {
      icon: <RiMapPinLine className="text-blue-600 text-xl" />,
      title: "Our Location",
      content: "2 Revenue Nagar Road, Indore, Madhya Pradesh, 452009, India.",
    },
    {
      icon: <RiMailLine className="text-blue-600 text-xl" />,
      title: "Email Us",
      content: "info@wenbear.com",
    },
    {
      icon: <RiPhoneLine className="text-blue-600 text-xl" />,
      title: "Call Us",
      content: "+91 9871331699",
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Left - Info & Map */}
          <div className="w-full md:w-1/2 space-y-8 animate-fade-in">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600">
                Ready to discuss your project? Contact us today and let's build something amazing together.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
              <div
                className="w-full h-64 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://public.readdy.ai/gen_page/map_placeholder_1280x720.png')",
                }}
              />
            </div>
          </div>

          {/* Right - Form */}
          <div className="w-full md:w-1/2 animate-fade-in delay-100">
            <div className="bg-white rounded-xl shadow-lg p-8 transition hover:shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name", { required: "Name is required" })}
                    className={`w-full px-4 py-3 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full px-4 py-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Project Inquiry"
                    {...register("subject", { required: "Subject is required" })}
                    className={`w-full px-4 py-3 border ${
                      errors.subject ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us about your project..."
                    {...register("message", { required: "Message is required" })}
                    className={`w-full px-4 py-3 border ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition transform hover:scale-105 focus:outline-none disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
