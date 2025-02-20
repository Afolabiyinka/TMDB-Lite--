import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../Components/Theme-Items/Dropdown";
import { Button } from "../Components/Theme-Items/Button";
import { Menu, Home, Video, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { ModeToggle } from "../Contexts/ModeToggle";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nav, setNav] = useState(true);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={handleToggle}>
          <Button size="icon">
            {!nav ? (
              <AiOutlineClose onClick={setNav(false)} />
            ) : (
              <Menu onClick={closeModal} />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" isOpen={isOpen} onClick={closeModal}>
          <DropdownMenuItem onClick={closeModal}>
            <Link
              to="/"
              className=" py-2 text-sm text-gray-700 flex justify-between px-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              Home <Home />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={closeModal}>
            <Link
              to="/favourites"
              className=" py-2 text-sm text-gray-700 flex justify-between px-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              Favourites <Heart />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={closeModal}>
            <Link
              to="/trending-actors"
              className=" py-2 text-sm text-gray-700 flex justify-around px-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              Celebrities
              <Video />
            </Link>
          </DropdownMenuItem>
          <ModeToggle />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileNavBar;
