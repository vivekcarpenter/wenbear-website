import { useEffect, useRef } from "react";

const MouseBlob = () => {
  const blobRef = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;

    // Follow mouse animation
    const handleMouseMove = (e) => {
      if (!blob) return;
      blob.animate(
        {
          left: `${e.clientX}px`,
          top: `${e.clientY}px`,
        },
        {
          duration: 300,
          fill: "forwards",
        }
      );
    };

    window.addEventListener("pointermove", handleMouseMove);

    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const color = getSectionColor(id);
            if (blobRef.current) {
              blobRef.current.style.setProperty("--blob-color", color);
            }
          }
        }
      },
      { threshold: 0.4 }
    );

    // Observe all section IDs
    document
      .querySelectorAll("section, footer")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getSectionColor = (section) => {
    switch (section) {
      case "home":
        return "#14b8a6"; // Teal
      case "services":
        return "#f59e0b"; // Amber
      case "blogs":
        return "#6366f1"; // Indigo
    //   case "ai-solutions":
    //     return "#ec4899"; // Pink
      case "about":
        return "#10b981"; // Emerald
      case "work":
        return "#f43f5e"; // Rose
    //   case "contact":
    //     return "#3b82f6"; // Blue
    //   case "footer":
    //     return "#8b5cf6"; // Violet
    //   default:
    //     return "#9333ea"; // Default Purple
    }
  };

  return (
    <div
      ref={blobRef}
      className="pointer-events-none fixed top-0 left-0 z-0 h-72 w-72 rounded-full opacity-30 blur-3xl transition-colors duration-500"
      style={{
        backgroundColor: "var(--blob-color, #9333ea)",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default MouseBlob;
