import React, { useState, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  InputBase,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Button
} 
from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  dashboardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: 200,
    paddingLeft: 16,
    borderRadius: 20,
    display: "flex",
    justifyContent: "space-between"

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
  const { handleAddZipcode, zipApiErr } = props;
  const { username } = useContext(UserContext);
  const history = useHistory();
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
      handleAddZipcode(zipcode);
      setInputErr("");
      setZipcode("");
    } else {
      setInputErr("Enter a valid zipcode");
    }
  };

  const handleLogout = () => {
    axiosWithAuth().get("/logout")
    .then(res => {
      console.log(res);
      localStorage.removeItem("token");
      history.push("/");
    })
    .catch(err => {
      console.log(err);
    })
  }

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
           {zipApiErr.length > 0 && (
            <Typography className={classes.error}>{zipApiErr}</Typography>
          )}
          <Paper className={classes.input} onSubmit={(e) => handleSubmit(e)} component="form">
            <InputBase
              label="Zipcode"
              name="zipcode"
              placeholder="Enter a US Zipcode"
              value={zipcode}
              onChange={handleChange}
              inputProps={{ "aria-label": "enter a US zipcode" }}
            />
            <IconButton style={{padding: "8px"}}type="submit" aria-label="add location">
              <AddPhotoAlternateIcon />
            </IconButton>
          </Paper>
        </div>
        <Button
        onClick={handleLogout}
        variant="contained"
        className={classes.button}
        startIcon={<ExitToAppIcon />}
      >
        Sign out
      </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
