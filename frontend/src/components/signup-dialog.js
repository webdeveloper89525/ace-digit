import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import Api from "api";
import { useFormik } from "formik";
import * as Yup from "yup";

export const SignupDialog = (props) => {
  const { onClose, open, ...other } = props;

  const [signup] = Api.useSignupMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      submit: null,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      name: Yup.string().max(255).required("Name is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const payload = {
          email: values.email,
          password: values.password,
          name: values.name,
        };
        signup({ payload })
          .then((res) => {
            if (res.data.hasError) {
              helpers.setStatus({ success: false });
              helpers.setErrors({ submit: res.data.message });
              helpers.setSubmitting(false);
            } else {
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
        <DialogTitle>Sign Up</DialogTitle>

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
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="name"
                value={formik.values.name}
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
            Sign Up
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
