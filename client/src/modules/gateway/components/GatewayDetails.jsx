import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Divider,
  Fab,
  Drawer,
  IconButton,
  TextField,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import Title from "commons/Title/Title";
import Progress from "commons/Progress/Progress";
import CustomButton from "commons/CustomButton/CustomButton";
import { getGatewayById } from "services/gateway";
import { addDevice, getDevice } from "services/device";
import { useFormik } from "formik";
import { createDeviceSchema } from "modules/gateway/validations/ValidateDevice";
import { create_UUID } from "utils/utils";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  drawer: {
    width: 290,
    padding: 10,
  },
  formStyles: {
    "& > *": {
      marginBottom: theme.spacing(1.2),
    },
  },
}));

export default function GatewayDetails() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const [loadingGateway, setLoadingGateway] = useState(false);
  const [gateway, setGateway] = useState({});
  useEffect(() => {
    setLoadingGateway(true);
    getGatewayById(params.id)
      .then((resp) => {
        setLoadingGateway(false);
        setGateway(resp.data);
      })
      .catch((error) => {
        setLoadingGateway(false);
        enqueueSnackbar("Some thing went wrong", {
          variant: "error",
        });
      });
  }, [enqueueSnackbar, params]);

  const [loadingAdd, setLoadingAdd] = useState(false);
  const formik = useFormik({
    initialValues: {
      idGateway: params.id,
      uid: "",
      vendor: "",
      status: "",
    },
    onSubmit: (values, { resetForm, setErrors }) => {
      setLoadingAdd(true);
      addDevice(values)
        .then(() => {
          enqueueSnackbar("Device was created successfully", {
            variant: "success",
          });
          setLoadingAdd(false);
          resetForm();
          setOpen(false);
          // firstRender.current = true;
          // onGetGateways();
        })
        .catch((error) => {
          // if (+error?.response?.status === 400) {
          //   setErrors({ serial: error?.response?.data?.error });
          // }
          enqueueSnackbar("Some thing went wrong", {
            variant: "error",
          });
          setLoadingAdd(false);
        });
    },
    validationSchema: createDeviceSchema,
  });

  const generateUID = () => {
    formik.setFieldValue("uid", create_UUID(), true);
  };

  return (
    <>
      <Progress loading={loadingGateway} />
      <Title>Gateway Details</Title>
      <Grid container direction="column">
        <Grid container item>
          <Typography component="p">
            <b>Serial:</b> {gateway?.serial}
          </Typography>
        </Grid>
        <Grid container item>
          <Typography component="p">
            <b>Name:</b> {gateway?.name}
          </Typography>
        </Grid>
        <Grid container item>
          <Typography component="p">
            <b>Address:</b> {gateway?.address}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Title>Devices List</Title>
      <Fab
        aria-label="add gateway"
        className={classes.fab}
        color="primary"
        onClick={toggleDrawer(true)}
      >
        <AddIcon />
      </Fab>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div className={classes.drawer}>
          <Grid container justify="space-between" alignItems="center">
            <Title>Create Device</Title>
            <IconButton aria-label="close" onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <form
            onSubmit={formik.handleSubmit}
            noValidate
            className={classes.formStyles}
          >
            <TextField
              label="Uid*"
              name="uid"
              variant="filled"
              fullWidth
              value={formik.values.uid || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.uid && formik.errors.uid)}
              helperText={
                formik.touched.uid && formik.errors.uid
                  ? formik.errors.uid
                  : "Enter uid number"
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position={"end"}>
                    <IconButton
                      aria-label="toggle uid generate"
                      onClick={generateUID}
                    >
                      <KeyboardIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Vendor*"
              name="vendor"
              variant="filled"
              fullWidth
              value={formik.values.vendor || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.vendor && formik.errors.vendor)}
              helperText={
                formik.touched.vendor && formik.errors.vendor
                  ? formik.errors.vendor
                  : "Enter vendor"
              }
            />
            <TextField
              select
              name="status"
              label="Select status*"
              variant="filled"
              fullWidth
              value={formik.values.status || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.status && formik.errors.status)}
              helperText={
                formik.touched.status && formik.errors.status
                  ? formik.errors.status
                  : "Enter status"
              }
            >
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Offline">Offline</MenuItem>
            </TextField>
            <Grid container justify="flex-end">
              <CustomButton color="primary" loading={loadingAdd} type="submit">
                Create
              </CustomButton>
            </Grid>
          </form>
        </div>
      </Drawer>
    </>
  );
}
