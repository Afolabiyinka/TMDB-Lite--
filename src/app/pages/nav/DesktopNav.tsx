import { ModeToggle } from "@/app/components/ModeToggle";
import Logo from "@/app/components/ui/Logo";
import NavIcon from "@/app/components/ui/NavIcon";
import ProfileAvatar from "@/app/components/ui/ProfileAvatar";
import { LINKS } from "@/app/libs/nav";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

const DesktopNav = () => {
  return (
    <nav
      className={`fixed  top-0  hidden lg:flex justify-center items-center w-full bg-white dark:bg-[#0f0e0e] z-50 py-3 px-4 `}
    >
      <div className="flex w-full justify-between items-center">
        <Logo />

        <div className="flex items-center gap-6">
          {LINKS.map(({ href, icon: Icon, title }, i) => (
            <NavLink
              key={i}
              to={href}
              className={({ isActive }) =>
                `flex items-center gap-x-2 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 group ${
                  isActive
                    ? "bg-black/5 dark:bg-white/10 text-black dark:text-white"
                    : ""
                }`
              }
            >
              <NavIcon icon={Icon} link={href} />
              <p>{title}</p>
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <NavIcon link="/search" icon={MagnifyingGlassIcon} tooltip="Search" />
          <ModeToggle />
          <div className="w-px h-6 bg-black/10 dark:bg-white/10" />
          <ProfileAvatar />
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
