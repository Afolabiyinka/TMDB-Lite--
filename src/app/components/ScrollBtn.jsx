import { ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
export default function ScrollBtn() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showBtn = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", showBtn);
    return () => window.removeEventListener("scroll", showBtn);
  }, []);
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    isVisible && (
      <div
        className="fixed bottom-12 right-5 bg-blue-950 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 cursor-pointer"
        onClick={scrollToTop}
      >
        <ChevronUp size={20} />
      </div>
    )
  );
}
