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
                    required
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
                    type="password"
                    required
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
              <Grid container>
                <Grid item>
                  <Button
                    sx={{ alignItems: "center" }}
                    onClick={() => router.push("/register")}
                  >
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
