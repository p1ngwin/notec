import { Drawer } from "@mui/material";
import { useSidebar } from "@/context/mobileSidebar/useSidebar";
import { MenuNav } from "@/components/MenuNav";

const MobileMenu = () => {
  const { isDrawerOpen, toggleDrawer } = useSidebar();
  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={toggleDrawer}
    >
      <MenuNav isMobile />
    </Drawer>
  );
};

export default MobileMenu;
