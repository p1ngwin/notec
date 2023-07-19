import { Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";

const Header = () => {
  return (
    <AppBar position="static">
      <div className="HeaderMobile">
        <Toolbar></Toolbar>
      </div>
    </AppBar>
  );
};
export default Header;
