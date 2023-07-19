import { useSidebar } from "@/context/mobileSidebar/useSidebar";
import { Toolbar, IconButton, AppBar } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";

const HeaderMobile = () => {
  const { toggleDrawer, isDrawerOpen } = useSidebar();

  const handleDrawerToggle = () => {
    toggleDrawer();
  };

  return (
    <AppBar position="static">
      <div className="HeaderMobile">
        <Toolbar>
          <IconButton onClick={handleDrawerToggle}>
            {!isDrawerOpen ? <Menu /> : <Close />}
          </IconButton>
        </Toolbar>
      </div>
    </AppBar>
  );
};
export default HeaderMobile;
