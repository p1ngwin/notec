import { signInUserWithEmail } from "@/auth/authHelpers";
import View from "@/components/View";
import { useUserStore } from "@/stores/useUserStore";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LockOutlined } from "@mui/icons-material";

type FormProps = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const actions = useUserStore();

  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormProps> = async ({ email, password }) => {
    const result = await signInUserWithEmail(email, password);

    const { error, user } = result;

    if (error) {
      toast.error(`Error signing in. Error: ${error.message}`);
      return actions.setUser(null);
    }
    if (user) {
      toast.success(`Successfully logged in as ${user.email}.`);
      actions.setUser(user);
      return router.push("/");
    }
  };

  return (
    <View fullScreen>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ display: "flex", placeItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <>
            <Typography
              component="h1"
              variant="h5"
            >
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      label="Email Address"
                      autoComplete="email"
                      autoFocus
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      label="Password"
                      autoComplete="password"
                      type="password"
                    />
                  )}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid
                  item
                  alignContent={"center"}
                  alignItems={"center"}
                >
                  <Button
                    sx={{ alignItems: "center", alignContent: "center" }}
                    onClick={() => router.push("/register")}
                  >
                    {"Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </form>
            </Box>
          </>
        </Box>
      </Container>
    </View>
  );
};

export default Login;
