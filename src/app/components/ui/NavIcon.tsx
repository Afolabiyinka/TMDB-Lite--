import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@material-tailwind/react";
import type { IconProps } from "@phosphor-icons/react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  icon: React.ForwardRefExoticComponent<IconProps>;
  tooltip?: string;
  link?: string;
  onClick?: () => void;
}
const NavIcon = ({ icon: Icon, link, tooltip, onClick }: Props) => {
  const location = useLocation();
  const isActive = location.pathname === link;
  const navigate = useNavigate();

  function goToLink() {
    navigate(`${link}`);
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          onClick={link ? goToLink : onClick}
          className={`flex items-center justify-center p-2  ${
            isActive
              ? "rounded-full bg-black text-white transition-all duration-700 dark:bg-white dark:text-black"
              : ""
          }`}
        >
          <Icon size={25} weight={isActive ? "fill" : "regular"} />
        </div>
      </TooltipTrigger>
      {tooltip && (
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default NavIcon;
