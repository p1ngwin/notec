import { Drawer } from "@mui/material";
import styles from "./styles.module.sass";
import { useSidebar } from "@/context/mobileSidebar/useSidebar";
import { MenuNav } from "@/components/MenuNav";

const MobileMenu = () => {
  const { isDrawerOpen, toggleDrawer } = useSidebar();

  const { MobileMenuWrapper } = styles;

  return (
    <div className={MobileMenuWrapper}>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        <MenuNav isMobile />
      </Drawer>
    </div>
  );
};

export default MobileMenu;
