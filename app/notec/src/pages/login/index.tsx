import { signInUserWithEmail } from "@/auth/authHelpers";
import View from "@/components/View";
import { useUserStore } from "@/stores/useUserStore";
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Grid,
  Link,
} from "@mui/material";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
    const user = await signInUserWithEmail(email, password);
    toast.loading("Logging in...", { id: "loading" });
    if (user.error) {
      toast.error(`Error signing in. Error: ${user.error}`);
    }
    if (user) {
      toast.dismiss("loading");
      toast.success("Successfully logged in.");
      actions.setUser(user);
      router.push("/");
    } else {
      actions.setUser(null);
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
                render={({ field }) => <TextField {...field} />}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                  />
                )}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid
                  item
                  xs
                >
                  <Link
                    href="#"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Button onClick={() => router.push("/register")}>
                    {"Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </View>
  );
};

export default Login;
