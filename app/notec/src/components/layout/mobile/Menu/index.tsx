import { Drawer, MenuItem, Avatar } from "@mui/material";
import { useSidebar } from "@/context/mobileSidebar/useSidebar";
import { MenuNav } from "@/components/MenuNav";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthActions } from "@/auth/authHelpers";
import { useRouter } from "next/router";
import { useUserStore } from "@/stores/useUserStore";

const MobileMenu = () => {
  const { isDrawerOpen, toggleDrawer } = useSidebar();
  const { handleSignOut } = useAuthActions();
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const toProfile = () => {
    router.push("/profile");
  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={toggleDrawer}
    >
      <MenuNav isMobile />
      <MenuItem
        onClick={toProfile}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "#3b3941",
        }}
      >
        {user?.displayName ?? user?.email}
        <Avatar
          sx={{
            width: 28,
            height: 28,
            marginLeft: 1,
          }}
        />
      </MenuItem>
    </Drawer>
  );
};

export default MobileMenu;
