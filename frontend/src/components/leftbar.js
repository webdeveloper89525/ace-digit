import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@material-ui/core";
import Api from "api";
import { useDispatch } from "react-redux";
import { updateChartList } from "store/app-reducer";
import { useEffect } from "react";

const FILTERS = ["January", "February", "March", "April", "May", "June", "July"];

const Leftbar = () => {
  const dispatch = useDispatch();

  const [getList] = Api.useGetListMutation();

  const formik = useFormik({
    initialValues: {
      start: 1,
      end: 7,
    },
    validationSchema: Yup.object().shape({
      start: Yup.number().required("Filter is required"),
      end: Yup.number()
        .required("Filter is required")
        .test("validate-filter", "End is bigger than Start ", (value, params) => {
          const { start } = params.parent;
          return start <= value;
        }),
    }),
    onSubmit: async (values, helpers) => {
      const params = {
        start: values.start,
        end: values.end,
      };

      getList({ params })
        .then((res) => {
          if (res.data.hasError) {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: res.data.message });
            helpers.setSubmitting(false);
          } else {
            dispatch(updateChartList(res.data.data));
            helpers.setStatus({ success: true });
            helpers.setSubmitting(false);
          }
        })
        .catch((err) => {
          dispatch(updateChartList([]));
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        });
    },
  });
  const handleChangeStart = (e) => {
    formik.setFieldValue("start", e.target.value);
  };

  const handleChangeEnd = (e) => {
    formik.setFieldValue("end", e.target.value);
  };

  useEffect(() => {
    const params = {
      start: 1,
      end: 7,
    };
    getList({ params })
      .then((res) => {
        if (!res.data.hasError) {
          dispatch(updateChartList(res.data.data));
        }
      })
      .catch((err) => {
        dispatch(updateChartList([]));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ px: 2, mt: 3 }}>
      <FormControl
        sx={{ mb: 2 }}
        fullWidth
      >
        <InputLabel id="filter-start-label-label">Start</InputLabel>
        <Select
          labelId="filter-start-label"
          id="filter-start"
          value={formik.values.start}
          onChange={handleChangeStart}
          size="small"
          fullWidth
          label="Start"
        >
          {FILTERS.map((ele, idx) => {
            return (
              <MenuItem
                value={idx + 1}
                key={idx}
              >
                {ele}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl
        sx={{ mb: 2 }}
        fullWidth
      >
        <InputLabel id="filter-end-label-label">End</InputLabel>
        <Select
          labelId="filter-end-label"
          id="filter-end"
          value={formik.values.end}
          onChange={handleChangeEnd}
          size="small"
          fullWidth
          label="End"
        >
          {FILTERS.map((ele, idx) => {
            return (
              <MenuItem
                value={idx + 1}
                key={idx}
              >
                {ele}
              </MenuItem>
            );
          })}
        </Select>
        {formik.touched.end && formik.errors.end && (
          <Typography
            color="error"
            variant="caption"
          >
            {formik.errors.end}
          </Typography>
        )}
      </FormControl>
      <Box sx={{ textAlign: "right" }}>
        <LoadingButton
          variant="contained"
          color="primary"
          size="large"
          onClick={formik.handleSubmit}
          sx={{ width: "fit-content", textTransform: "capitalize" }}
        >
          Apply
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Leftbar;
