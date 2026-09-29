import { useIsMobile } from "@/app/hooks/search/useMobile";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const NavLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="h-full w-full border">
      <DesktopNav />

      {isMobile && <MobileNav />}
    </div>
  );
};

export default NavLayout;
