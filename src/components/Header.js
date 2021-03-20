import React, { useState, useContext, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  InputBase,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Button,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
  logo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Noto sans",
    fontWeight: "400",
  },
  zipcodeInput: {
    display: "flex",
    justifyContent: "center",
  },
  input: {
    paddingLeft: 16,
    borderRadius: 20,
  },
  button: {
    color: "#3f51b5",
    backgroundColor: "#fff"
  },
  mobile: {
    top: "auto",
    bottom: 0,
    minHeight: 75,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  mobileTop: {
    minHeight: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  topToolbar: {
    display: "flex",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
}));

function Header(props) {
  const [zipcode, setZipcode] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const { handleAddZipcode } = props;
  const { username } = useContext(UserContext);
  const history = useHistory();

  const classes = useStyles();

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

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
      setZipcode("");
    } else {
      setZipcode("enter a valid zipcode");
    }
  };

  const handleLogout = () => {
    axiosWithAuth()
      .get("/logout")
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!isMobile ? (
        <AppBar position="static">
          <Toolbar className={classes.root}>
            <Button
              onClick={handleLogout}
              variant="contained"
              className={classes.button}
              startIcon={<ExitToAppIcon />}
              size="large"
            >
              Sign out
            </Button>
            <div className={classes.logo}>
              <AccountCircleIcon
                style={{ padding: "8px" }}
                className={classes.iconStyle}
              />
              <Typography className={classes.title} variant="h6" noWrap>
                {username}'s Weather App
              </Typography>
            </div>
            <div className={classes.zipcodeInput}>
              <Paper
                className={classes.input}
                onSubmit={(e) => handleSubmit(e)}
                component="form"
              >
                <InputBase
                  label="Zipcode"
                  name="zipcode"
                  placeholder="Enter a US Zipcode"
                  value={zipcode}
                  onChange={handleChange}
                  onFocus={() => setZipcode("")}
                  inputProps={{ "aria-label": "enter a US zipcode" }}
                />
                <IconButton
                  style={{ padding: "8px" }}
                  type="submit"
                  aria-label="add location"
                >
                  <AddPhotoAlternateIcon fontSize="large" color="primary" />
                </IconButton>
              </Paper>
            </div>
          </Toolbar>
        </AppBar>
      ) : (
        <>
          <AppBar position="static" color="primary" className={classes.mobileTop}>
            <Toolbar className={classes.topToolbar}>
              <div className={classes.logo}>
                <AccountCircleIcon
                  style={{ padding: "8px" }}
                  className={classes.iconStyle}
                />
                <Typography className={classes.title} variant="h6" noWrap>
                  My Weather App
                </Typography>
              </div>
              <Button
                className={classes.button}
                onClick={handleLogout}
                aria-label="log out"
                color="default"
                variant="contained"
                size="small"
                >
                  Sign out
              </Button>
            </Toolbar>
          </AppBar>
          <AppBar position="fixed" color="primary" className={classes.mobile} fullWidth>
            <Toolbar className={classes.toolbar}>
              <div className={classes.zipcodeInput}>
                <Paper
                  className={classes.input}
                  onSubmit={(e) => handleSubmit(e)}
                  component="form"
                >
                  <InputBase
                    label="Zipcode"
                    name="zipcode"
                    placeholder="Enter a US Zipcode"
                    value={zipcode}
                    onChange={handleChange}
                    onFocus={() => setZipcode("")}
                    inputProps={{ "aria-label": "enter a US zipcode" }}
                  />
                  <IconButton
                    style={{ padding: "8px" }}
                    type="submit"
                    aria-label="add location"
                  >
                    <AddPhotoAlternateIcon fontSize="large" color="primary" />
                  </IconButton>
                </Paper>
              </div>
            </Toolbar>
          </AppBar>
        </>
      )}
    </>
  );
}

export default Header;
