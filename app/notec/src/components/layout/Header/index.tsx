import { useUserStore } from "@/stores/useUserStore";
import AppBar from "@mui/material/AppBar";
import styles from "./styles.module.sass";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import UserIcon from "@mui/icons-material/Person";
import { useAuthActions } from "@/auth/authHelpers";
import { Logout } from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/router";
import { lightBlue } from "@mui/material/colors";

const Header = () => {
  const { HeaderDesktop, AppBarWrapper } = styles;

  const router = useRouter();

  const { handleSignOut } = useAuthActions();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useUserStore((state) => state.user);

  return (
    <AppBar
      position="static"
      className={AppBarWrapper}
    >
      <div className={HeaderDesktop}>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ bgcolor: lightBlue["800"] }}>
                <UserIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => router.push("/profile")}>
            <Avatar
              sx={{
                width: 28,
                height: 28,
                marginRight: 1,
                bgcolor: lightBlue["800"],
              }}
            />
            {user?.displayName ?? user?.email}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </AppBar>
  );
};
export default Header;
