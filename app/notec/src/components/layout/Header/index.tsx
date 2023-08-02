import { useUserStore } from "@/stores/useUserStore";
import AppBar from "@mui/material/AppBar";
import styles from "./styles.module.sass";
import { IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthActions } from "@/auth/authHelpers";

const Header = () => {
  const { HeaderDesktop, AppBarWrapper } = styles;

  const { handleSignOut } = useAuthActions();

  const user = useUserStore((state) => state.user);

  return (
    <AppBar
      position="static"
      className={AppBarWrapper}
    >
      <div className={HeaderDesktop}>
        {user ? (
          <Typography
            sx={{ marginRight: "1rem" }}
            fontSize={"1.5rem"}
          >
            {user.email}
          </Typography>
        ) : (
          "Login"
        )}

        <IconButton onClick={handleSignOut}>
          <LogoutIcon />
        </IconButton>
      </div>
    </AppBar>
  );
};
export default Header;
