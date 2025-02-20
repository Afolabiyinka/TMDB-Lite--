import React from "react";
import { Github, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="h-[7vh] flex justify-center items-center gap-3">
      <h1>Made with ❤ from</h1>
      <a href="">Offixial_SM</a>
      <span className="flex gap-3 bg-gray-200 px-2 py-1 rounded-lg">
        <a href="" target="_blank">
          <Github />
        </a>
        <a href="" target="_blank">
          <Instagram color="red" />
        </a>
        <a href="" target="_blank">
          <FaWhatsapp size={27} color="green" />
        </a>
      </span>
    </div>
  );
};

export default Footer;
