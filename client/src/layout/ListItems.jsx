import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import DevicesIcon from "@material-ui/icons/Devices";
import SettingsRemoteIcon from "@material-ui/icons/SettingsRemote";

const menu = [
  {
    name: "Gateways",
    id: "gateways",
    icon: <SettingsRemoteIcon />,
    path: "/gateways",
  },
  {
    name: "Devices",
    id: "devices",
    icon: <DevicesIcon />,
    path: "/devices",
  },
];

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: "rgba(255, 255, 255, 0.16)",
  },
}));

export default function ListItems() {
  const classes = useStyles();

  return (
    <>
      {menu.map((item, index) => (
        <ListItem
          button
          key={index}
          component={NavLink}
          to={item.path}
          activeClassName={classes.selected}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </>
  );
}
