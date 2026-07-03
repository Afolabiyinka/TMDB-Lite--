import { ListIcon, MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/app/components/ui/Logo";
import { LINKS } from "@/app/libs/nav";
import { ModeToggle } from "@/app/components/ModeToggle";
import ProfileAvatar from "@/app/components/ui/ProfileAvatar";
import NavIcon from "@/app/components/ui/NavIcon";

const MobileNav = () => {
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();

  return (
    <div className={`w-full p-4 fixed z-50 top-0 bg-white dark:bg-[#0f0e0e]`}>
      <div className="flex justify-between items-center">
        <Logo />

        <div className="flex gap-3 items-center  justify-center p-1">
          <NavIcon link="/search" icon={MagnifyingGlassIcon} tooltip="Search" />
          <ModeToggle />
          <NavIcon
            onClick={() => setOpenNav(!openNav)}
            icon={openNav ? XIcon : ListIcon}
          />
        </div>
      </div>

      <AnimatePresence>
        {openNav && (
          <motion.span
            className="flex flex-col gap-8 p-5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {LINKS.map(({ icon: Icon, href, title }, i) => {
              const isActive = href === location.pathname;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{
                    duration: 0.2,
                    delay: i * 0.06,
                    ease: "easeOut",
                  }}
                >
                  <NavLink
                    to={href}
                    className="flex gap-2 items-center"
                    onClick={() => setOpenNav(false)}
                  >
                    <div
                      className={`flex items-center justify-center ${
                        isActive
                          ? "rounded-full bg-black text-white p-2 transition-all duration-500 dark:bg-white dark:text-black"
                          : ""
                      }`}
                    >
                      <Icon size={25} weight={isActive ? "fill" : "regular"} />
                    </div>
                    <p>{title}</p>
                  </NavLink>
                </motion.div>
              );
            })}
            <ProfileAvatar />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
