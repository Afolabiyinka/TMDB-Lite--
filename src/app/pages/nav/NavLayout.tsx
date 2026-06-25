import { useIsMobile } from "@/app/hooks/useMobile";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const NavLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="h-full w-full">
      <DesktopNav />

      {isMobile && <MobileNav />}
    </div>
  );
};

export default NavLayout;
