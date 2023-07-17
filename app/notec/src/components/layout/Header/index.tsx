import { IconButton, Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
