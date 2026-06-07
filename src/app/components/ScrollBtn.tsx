import { IconButton } from "@material-tailwind/react";
import { ArrowUpIcon } from "@phosphor-icons/react"
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
      <IconButton
        isCircular
        size="xl"
        color="primary"
        className="fixed bottom-12 right-5  z-50 cursor-pointer"
        onClick={scrollToTop}
      >
        <ArrowUpIcon size={20} />
      </IconButton>
    )
  );
}
