import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderActions from "@/components/HeaderActions";
import Avatar from "@mui/material/Avatar";
import View from "@/components/View";
import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Person,
  Email,
  Check,
  ErrorOutline,
  Key,
  LockReset,
} from "@mui/icons-material";
import { PaperCard } from "@/components/PaperCard";
import { useUserStore } from "@/stores/useUserStore";
import { lightBlue } from "@mui/material/colors";
import { resetUserPassword, updateUserProfile } from "@/auth/authHelpers";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormProps = {
  displayName?: string;
  password?: string;
};

const Profile = () => {
  const { user } = useUserStore();

  const { displayName, emailVerified, email } = user || {};

  const [showDialog, setShowDialog] = useState(false);

  const handleOnProfileUpdate: SubmitHandler<FormProps> = async ({
    displayName,
    password,
  }) => {
    try {
      updateUserProfile({ displayName, password }).then((res) => {
        if (res.status === "ok") {
          toast.success("Successfully updated profile");
        } else {
          if (res.code === "auth/wrong-password") {
            toast.error("Wrong password!");
          } else {
            return toast.error(res.message);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) return;
    setShowDialog(false);
    const res = await resetUserPassword(email);
    console.log(res);
  };

  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      displayName: user?.displayName ?? "",
      password: "",
    },
  });

  return (
    <View
      fullWidth
      container
    >
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to reset your password?
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is irreversible and will result in the deactivation of
            your current password. You will receive an email where you will be
            able to set new password. You can lose your account if you don`t
            have access to your email!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowDialog(false)}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePasswordReset}
            autoFocus
            variant="contained"
          >
            Reset password
          </Button>
        </DialogActions>
      </Dialog>
      <HeaderActions>
        <Typography variant="h4">Profil</Typography>
        <Breadcrumbs
          depth={1}
          values={["Profil"]}
        />
      </HeaderActions>
      <Grid
        container
        spacing={2}
        marginTop={"2rem"}
      >
        <Grid
          item
          xs={12}
          md={4}
          display={"flex"}
          sx={{ flexGrow: 1 }}
        >
          <PaperCard centerContent>
            <Box>
              <Grid
                item
                marginBottom={3}
                justifyContent={"center"}
                display={"flex"}
              >
                <Avatar
                  sx={{ width: 200, height: 200, bgcolor: lightBlue["800"] }}
                >
                  <Typography variant="h4">
                    {displayName ? displayName.charAt(0) : <Avatar />}
                  </Typography>
                </Avatar>
              </Grid>
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ display: "flex", placeContent: "center" }}
                marginBottom={5}
              >
                {emailVerified ? (
                  <>
                    Email verified <Check color="success" />
                  </>
                ) : (
                  <>
                    Email not verified. <ErrorOutline color="error" />
                  </>
                )}
              </Typography>
              <Button
                fullWidth
                sx={{ alignSelf: "flex-end", marginBottom: 2 }}
                size="small"
                variant="contained"
                color="info"
                onClick={() => setShowDialog(true)}
              >
                Ponastavi geslo
              </Button>
              {/* <Button
                fullWidth
                sx={{ alignSelf: "flex-end" }}
                size="small"
                variant="contained"
                color="warning"
                onClick={() => setShowDialog(true)}
              >
                Pošlji potrditveni mail
              </Button> */}
            </Box>
          </PaperCard>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          display={"flex"}
          sx={{ flexGrow: 1 }}
        >
          <PaperCard>
            <form onSubmit={handleSubmit(handleOnProfileUpdate)}>
              <Grid
                container
                spacing={2}
                padding={2}
              >
                <Grid
                  item
                  xs={12}
                >
                  <Stack marginBottom={5}>
                    <Typography variant="h4">User profile</Typography>
                  </Stack>
                  <Controller
                    name="displayName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="text"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    type="text"
                    disabled
                    value={user?.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <Divider />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <Grid
                    item
                    xs={12}
                    marginBottom={2}
                  >
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Current password"
                          type="password"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Key />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    marginBottom={2}
                  >
                    <TextField
                      label="New password"
                      type="password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockReset />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      label="Verify password"
                      type="password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockReset />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </PaperCard>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit(handleOnProfileUpdate)}
          >
            Posodobi
          </Button>
        </Grid>
      </Grid>
    </View>
  );
};

export default Profile;
