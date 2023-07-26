import useStore from "@/stores/useStore";
import { useUserStore } from "@/stores/useUserStore";
import AppBar from "@mui/material/AppBar";
import styles from "./styles.module.sass";
import Button from "@/components/Button";
import { IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const { HeaderDesktop } = styles;

  const user = useStore(useUserStore, (state) => state.user);

  const actions = useUserStore();

  const logout = () => {
    actions.setUser(null);
  };

  return (
    <AppBar position="static">
      <div className={HeaderDesktop}>
        {user ? <Typography sx={{marginRight: "1rem"}} fontSize={"1.5rem"}>{user}</Typography> : "Login"}

        <IconButton onClick={logout}>
          <LogoutIcon />
        </IconButton>
      </div>
    </AppBar>
  );
};
export default Header;
