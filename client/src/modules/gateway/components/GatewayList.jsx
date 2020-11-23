import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Fab,
  Drawer,
  Grid,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import Title from "commons/Title/Title";
import Progress from "commons/Progress/Progress";

import { getGateways, deleteGateway } from "services/gateway";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  drawer: {
    width: 280,
    padding: 10,
  },
}));

export default function GatewayList() {
  const classes = useStyles();

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

  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 10,
  });
  const [loading, setLoading] = useState(false);
  const [gatewaysData, setGatewaysData] = useState({});

  const onGetGateways = useCallback(() => {
    setLoading(true);
    getGateways(params)
      .then((resp) => {
        console.log(resp.data);
        setLoading(false);
        setGatewaysData(resp.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [params]);

  useEffect(() => {
    onGetGateways();
  }, [onGetGateways]);

  return (
    <>
      <Progress loading={loading} />
      <Title>Gateway List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Serial Number</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gatewaysData?.results?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.serial}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
            <Title>Create Gateway</Title>
            <IconButton aria-label="close" onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </div>
      </Drawer>
    </>
  );
}
