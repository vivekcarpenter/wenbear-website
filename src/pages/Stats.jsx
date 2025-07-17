import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Counter = ({ target, label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const numberControls = useAnimation();

  useEffect(() => {
    const duration = 2000;
    const increment = target / (duration / 16);

    let started = false;

    const animateCount = () => {
      setCount(0);
      let current = 0;

      const step = () => {
        current += increment;
        if (current < target) {
          setCount(Math.floor(current));
          requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          setTimeout(() => {
            controls.start({ opacity: 1, y: 0 });
            numberControls.start({ opacity: 1, y: 0 });
            animateCount();
          }, delay * 1000);
        }
      },
      { threshold: 0.5 }
    );

    const el = document.getElementById(`counter-${label}`);
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [target, label, delay, controls, numberControls]);

  return (
    <motion.div
      id={`counter-${label}`}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={numberControls}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-4xl md:text-5xl font-bold mb-2"
      >
        {count}+
      </motion.div>
      <p className="text-lg">{label}</p>
    </motion.div>
  );
};

const Stats = () => {
  const counters = [
    { target: 250, label: "Completed Projects" },
    { target: 30, label: "Happy Clients" },
    { target: 10, label: "Team Members" },
    { target: 5, label: "Years Experience" },
  ];

  return (
    <section className="py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {counters.map((item, index) => (
            <Counter
              key={item.label}
              target={item.target}
              label={item.label}
              delay={index * 0.5} // stagger delay
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
