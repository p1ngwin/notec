import { IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import styles from "./styles.module.sass";
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
