import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  Grid,
  Typography,
} from "@material-ui/core";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

export const LoginDialog = (props) => {
  const { onClose, open, newPlan, returnTo, ...other } = props;

  const formik = useFormik({
    initialValues: {
      email: email || "",
      submit: null,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      if (!stripe || !elements) {
        return;
      }

      try {
        let updatedAccount = null;
        if (billingSummary.planSubscriptionId) {
          updatedAccount = await updateSubscription();
          toast.success("Subscription updated");
        } else {
          updatedAccount = await createSubscription(values.email);
          toast.success("Susbcribed to plan");
        }
        await new Promise((r) => setTimeout(r, 4000));
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
      onComplete();
    },
  });

  const confirmationText = `Your new plan will cost $${newPlan.amountBase} per month.`;

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
        <DialogTitle>Confirm your subscription</DialogTitle>

        <DialogContent sx={{ mb: 2 }}>
          <DialogContentText>{confirmationText}</DialogContentText>
        </DialogContent>

        {!billingSummary.paymentMethod && (
          <DialogContent>
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
              >
                <InputField
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
                <Typography
                  fontSize={14}
                  fontWeight={500}
                  mb={1}
                >
                  Card details
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "background.paper",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "neutral.300",
                    borderRadius: 1,
                    boxShadow: "0px 1px 2px 0px rgba(9, 30, 66, 0.08)",
                    overflow: "hidden",
                    p: 1.5,
                    transition: (theme) => theme.transitions.create(["border-color", "box-shadow"]),
                    "&:before": {
                      borderBottom: 0,
                    },
                    "&:hover": {
                      backgroundColor: "background.paper",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "background.paper",
                      boxShadow: (theme) => `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "action.disabledBackground",
                      boxShadow: "none",
                      borderColor: alpha("#D6DBE1", 0.5),
                    },
                    ".MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-root:not(.MuiInputAdornment-hiddenLabel)":
                      {
                        mt: 0,
                        ml: 1.5,
                      },
                  }}
                >
                  <CardElement />
                </Box>
              </Grid>
              {formik.errors.submit && (
                <Grid
                  item
                  xs={12}
                >
                  <FormHelperText error>{formik.errors.submit}</FormHelperText>
                </Grid>
              )}
            </Grid>
          </DialogContent>
        )}

        <DialogActions>
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
            Confirm
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
