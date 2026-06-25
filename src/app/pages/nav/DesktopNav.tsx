import { ModeToggle } from "@/app/components/ModeToggle";
import Logo from "@/app/components/ui/Logo";
import NavIcon from "@/app/components/ui/NavIcon";
import ProfileAvatar from "@/app/components/ui/ProfileAvatar";
import { useScrollNav } from "@/app/hooks/useScroll";
import { LINKS } from "@/app/libs/nav";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

const DesktopNav = () => {
  const { isScrolled } = useScrollNav();

  return (
    <nav
      className={`p-4 w-full  hidden lg:flex justify-center items-center fixed z-50 top-0 ${
        isScrolled && "bg-white dark:bg-[#0f0e0e]"
      }`}
    >
      <div className="lg:flex w-full justify-between max-w-7xl items-center">
        <Logo />

        <div className="flex items-center gap-6">
          {LINKS.map(({ href, icon: Icon, title }) => {
            return (
              <NavLink
                to={href}
                className="flex items-center gap-x-2 p-2 text-sm font-medium transition-colors duration-100 group"
              >
                <NavIcon icon={Icon} link={href} />
                <p className="">{title}</p>
              </NavLink>
            );
          })}
        </div>

        <div className="flex items-center gap-6">
          <ProfileAvatar />
          <NavIcon link="/search" icon={MagnifyingGlassIcon} tooltip="Search" />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
