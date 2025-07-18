import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/loading.json";
import {
  RiArrowRightLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCloseLine,
} from "react-icons/ri";
import { useInView } from "react-intersection-observer";
import { useGetAllBlogsQuery } from "../store/services/blogApi";

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  // Trigger API call when scrolled into view
  useEffect(() => {
    if (inView && !shouldLoad) {
      setShouldLoad(true);
      setTimeout(() => {
        setShowContent(true);
      }, 1000); // 3s delay
    }
  }, [inView]);

  const { data: allBlog, isLoading } = useGetAllBlogsQuery(undefined, {
    skip: !shouldLoad,
  });

  const handleOpen = (blog) => {
    setSelectedBlog(blog);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedBlog) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedBlog.images.length);
  };

  const prevImage = () => {
    if (!selectedBlog) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedBlog.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    document.body.style.overflowY = selectedBlog ? "scroll" : "auto";
    document.body.classList.toggle("hide-scrollbar", !!selectedBlog);
  }, [selectedBlog]);

  return (
    <section id="blogs" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Blogs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights and updates from our team on technology, design, and innovation.
          </p>
        </motion.div>

        {/* Content or Animation */}
        <div ref={ref} className="min-h-[60vh]">
          {!showContent || isLoading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <Player
                autoplay
                loop
                src={animationData}
                style={{ height: "150px", width: "150px" }}
              />
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              viewport={{ once: true }}
            >
              {allBlog?.data?.posts.map((blog, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden cursor-pointer"
                  onClick={() => handleOpen(blog)}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                >
                  <img
                    src={blog.images?.[0]}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{blog?.content}</p>
                    <div className="text-sm text-gray-500 mb-2">
                      By{" "}
                      <span className="font-medium text-gray-700">
                        {blog?.author?.name}
                      </span>{" "}
                      on{" "}
                      {new Date(blog?.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-primary font-medium flex items-center hover:underline">
                      Read more <RiArrowRightLine className="ml-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Blog Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              className="bg-white max-w-2xl w-full p-6 rounded-lg relative shadow-lg overflow-y-auto max-h-[90vh] hide-scrollbar"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
                onClick={() => setSelectedBlog(null)}
              >
                <RiCloseLine size={24} />
              </button>

              <div className="relative mb-4">
                <img
                  src={selectedBlog?.images?.[currentImageIndex] || "/default.jpg"}
                  alt={`Slide ${currentImageIndex + 1}`}
                  className="w-full h-72 object-cover rounded"
                />
                {selectedBlog.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    >
                      <RiArrowLeftSLine size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    >
                      <RiArrowRightSLine size={20} />
                    </button>
                  </>
                )}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedBlog.title}</h3>
              <div className="text-sm text-gray-500 mb-4">
                By <span className="font-medium">{selectedBlog.author.name}</span> on{" "}
                {new Date(selectedBlog.createdAt).toLocaleDateString()}
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedBlog.content}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blogs;
