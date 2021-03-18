import React, { useState, useContext } from "react";
import {
  AppBar,
  InputBase,
  Toolbar,
  Typography,
  Paper,
  IconButton
} 
from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  dashboardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: 225,
    paddingLeft: 16,
  },
  error: {
    marginRight: 15,
  },
  inputStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconStyle: {
    marginRight: 8,
  },
}));

function Header(props) {
  const [zipcode, setZipcode] = useState("");
  const [inputErr, setInputErr] = useState("");
  const { addZipcode } = props;
  const { username } = useContext(UserContext);
  const classes = useStyles();

  const handleChange = (e) => {
    setZipcode(e.target.value);
  };

  const checkValidZip = (zipcode) => {
    const numbers = /^[0-9]+$/;
    return zipcode.match(numbers) && zipcode.length === 5;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidZip = checkValidZip(zipcode);
    if (isValidZip) {
      addZipcode(zipcode);
      setInputErr("");
      setZipcode("");
    } else {
      setInputErr("Enter a valid zipcode");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <div className={classes.dashboardHeader}>
          <AccountCircleIcon className={classes.iconStyle} />
          <Typography className={classes.title} variant="h6" noWrap>
            {username}'s Weather App
          </Typography>
        </div>
        <div className={classes.inputStyle}>
          {inputErr.length > 0 && (
            <Typography className={classes.error}>{inputErr}</Typography>
          )}
          <Paper onSubmit={(e) => handleSubmit(e)} component="form">
            <InputBase
              className={classes.input}
              label="Zipcode"
              name="zipcode"
              placeholder="Enter a 5-digit US Zipcode"
              value={zipcode}
              onChange={handleChange}
              inputProps={{ "aria-label": "enter a US zipcode" }}
            />
            <IconButton type="submit" aria-label="add location">
              <AddPhotoAlternateIcon />
            </IconButton>
          </Paper>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
