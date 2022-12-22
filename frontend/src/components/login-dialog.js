import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import Api from "api";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "store/auth-reducer";
import * as Yup from "yup";

export const LoginDialog = (props) => {
  const { onClose, open, ...other } = props;

  const dispatch = useDispatch();

  const [updateLogin] = Api.useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const payload = {
          email: values.email,
          password: values.password,
        };
        updateLogin({ payload })
          .then((res) => {
            if (res.data.hasError) {
              helpers.setStatus({ success: false });
              helpers.setErrors({ submit: res.data.message });
              helpers.setSubmitting(false);
            } else {
              dispatch(login({ ...res.data.data, token: res.data.token }));
              helpers.setStatus({ success: true });
              helpers.setSubmitting(false);
              onClose();
            }
          })
          .catch((err) => {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
          });
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={open}
      TransitionProps={{
        onExited: () => formik.resetForm(),
      }}
      {...other}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Login</DialogTitle>

        <DialogContent>
          <Grid
            container
            spacing={2}
            sx={{ pt: 2 }}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3 }}>
          <Button
            color="primary"
            onClick={onClose}
            type="button"
            variant="text"
          >
            Cancel
          </Button>
          <LoadingButton
            color="primary"
            loading={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Login
          </LoadingButton>
        </DialogActions>

        {formik.errors.submit && (
          <Typography
            color="error"
            variant="body2"
            sx={{ textAlign: "right", pr: 3, pb: 3 }}
          >
            {formik.errors.submit}
          </Typography>
        )}
      </form>
    </Dialog>
  );
};
