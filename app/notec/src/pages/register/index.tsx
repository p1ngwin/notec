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
import { registerUser } from "@/auth/authHelpers";
import View from "@/components/View";
import { LockOutlined } from "@mui/icons-material";

type FormProps = {
  email: string;
  password: string;
};

const Register = () => {
  const router = useRouter();

  const actions = useUserStore();

  const { control, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormProps> = async ({ email, password }) => {
    const result = await registerUser(email, password);
    if (result.error) {
      toast.error(`Error registrating user. Error: ${result.error.message}`);
      return actions.setUser(null);
    }
    if (result.user) {
      toast.success(`Verification email sent to ${result.user.email}.`);
      router.push("/");
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
          <Typography
            component="h1"
            variant="h5"
          >
            Register new user
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
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Button onClick={() => router.push("/login")}>
                    Already registered?
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

export default Register;
