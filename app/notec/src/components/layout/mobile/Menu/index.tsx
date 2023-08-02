import { Drawer, IconButton } from "@mui/material";
import { useSidebar } from "@/context/mobileSidebar/useSidebar";
import { MenuNav } from "@/components/MenuNav";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthActions } from "@/auth/authHelpers";

const MobileMenu = () => {
  const { isDrawerOpen, toggleDrawer } = useSidebar();
  const { handleSignOut } = useAuthActions();

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={toggleDrawer}
    >
      <MenuNav isMobile />
      <IconButton onClick={handleSignOut}>
        <LogoutIcon />
      </IconButton>
    </Drawer>
  );
};

export default MobileMenu;
