webpackHotUpdate("main",{

/***/ "./src/components/Weather.js":
/*!***********************************!*\
  !*** ./src/components/Weather.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_axiosWithAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/axiosWithAuth */ "./src/utils/axiosWithAuth.js");
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Header */ "./src/components/Header.js");
/* harmony import */ var _WeatherCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WeatherCard */ "./src/components/WeatherCard.js");
/* harmony import */ var _contexts_UserContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../contexts/UserContext */ "./src/contexts/UserContext.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_lab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/lab */ "./node_modules/@material-ui/lab/esm/index.js");
/* harmony import */ var _rainy_6_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../rainy-6.svg */ "./src/rainy-6.svg");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/ginabethrussell/Desktop/apax-weather-frontend/apax-weather-frontend/src/components/Weather.js",
    _s = __webpack_require__.$Refresh$.signature();












const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_9__["makeStyles"])(() => ({
  welcome: {
    padding: 20,
    height: "30vh",
    width: "50%",
    minWidth: 280,
    maxWidth: 500,
    margin: "100px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    fontFamily: "Noto sans",
    color: "#2e3451",
    textAlign: "center"
  }
}));

function Weather() {
  _s();

  const {
    zipcodes,
    setZipcodes,
    weatherData,
    setWeatherData
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_contexts_UserContext__WEBPACK_IMPORTED_MODULE_5__["UserContext"]);
  const [userid, setUserid] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("");
  const [zipApiErr, setZipApiErr] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])("");
  const [pageLoaded, setPageLoaded] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);
  const classes = useStyles();

  const handleRemoveError = () => {
    setZipApiErr("");
  };

  const handleAddZipcode = zipcode => {
    console.log("current zipcodes", zipcodes);
    console.log("adding ", zipcode);
    setZipApiErr("");
    const isNewZip = zipcodes.filter(zip => zip.zipcode === zipcode);
    console.log("Checking isNewZip", isNewZip);

    if (isNewZip.length < 1) {
      Object(_utils_axiosWithAuth__WEBPACK_IMPORTED_MODULE_2__["axiosWithAuth"])().post(`/locations/location/${userid}/zipcode/${zipcode}`).then(res => {
        console.log(res);
        Object(_utils_axiosWithAuth__WEBPACK_IMPORTED_MODULE_2__["axiosWithAuth"])().get("/locations/getuserlocations").then(res => {
          console.log(res.data);
          setZipcodes(res.data.map(item => {
            const newLocationObj = {
              locationid: item.locationid,
              zipcode: item.zipcode
            };
            return newLocationObj;
          }));
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }
  };

  const handleDelete = locationid => {
    console.log(locationid);
    Object(_utils_axiosWithAuth__WEBPACK_IMPORTED_MODULE_2__["axiosWithAuth"])().delete(`locations/location/${locationid}`).then(res => {
      console.log(res);
    }).catch(err => console.log(err));
    setZipcodes(zipcodes.filter(zipObj => zipObj.locationid !== locationid));
    setWeatherData(weatherData.filter(weatherDataObj => weatherDataObj.locationid !== locationid));
  };

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    Object(_utils_axiosWithAuth__WEBPACK_IMPORTED_MODULE_2__["axiosWithAuth"])().get("/users/getuserinfo").then(res => {
      console.log(res.data);
      setUserid(res.data.userid);
      setZipcodes(res.data.locations.map(item => {
        const newLocationObj = {
          locationid: item.locationid,
          zipcode: item.zipcode
        };
        return newLocationObj;
      }));
    }).catch(err => console.log(err));
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    if (zipcodes.length > 0) {
      console.log(zipcodes);
      const locations = [];
      zipcodes.forEach(zip => {
        console.log("calling API for", zip.zipcode); // make sure new zipcode not already in weatherData

        if (!weatherData.find(location => location.zipcode === zip.zipcode)) {
          axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip.zipcode}&units=imperial&appid=11d7ddf7e962666cde4937e2b28eca42`).then(res => {
            const locationData = {
              locationid: zip.locationid,
              zipcode: zip.zipcode,
              name: res.data.name,
              feelsLike: res.data.main.feels_like,
              temp: res.data.main.temp,
              tempMax: res.data.main.temp_max,
              tempMin: res.data.main.temp_min,
              weatherIcon: res.data.weather[0].icon,
              weatherMain: res.data.weather[0].main,
              weatherDescription: res.data.weather[0].description,
              windSpeed: res.data.wind.speed
            };
            locations.push(locationData);
            setZipApiErr("");
          }).then(() => {
            setWeatherData([...weatherData, ...locations]);
          }).catch(err => {
            console.log(err); // open weather api doesn't find zipcode

            setZipApiErr(`No weather data found for Zipcode ${zip.zipcode}`); // delete invalid zip from db

            handleDelete(zip.locationid);
          });
        }
      });
    }
  }, [zipcodes]);
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
    container: true,
    direction: "column",
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
      item: true,
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_Header__WEBPACK_IMPORTED_MODULE_3__["default"], {
        handleAddZipcode: handleAddZipcode
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 142,
        columnNumber: 24
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 13
    }, this), zipApiErr.length > 0 && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
      item: true,
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_lab__WEBPACK_IMPORTED_MODULE_7__["Alert"], {
        style: {
          fontSize: "16px"
        },
        severity: "error",
        onClose: () => handleRemoveError(),
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_lab__WEBPACK_IMPORTED_MODULE_7__["AlertTitle"], {
          children: "Error"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 147,
          columnNumber: 21
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("strong", {
          children: zipApiErr
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 148,
          columnNumber: 25
        }, this), " - please enter a new zipcode."]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 146,
        columnNumber: 17
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 145,
      columnNumber: 17
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
      item: true,
      container: true,
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
        item: true,
        xs: 2,
        sm: 2
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 153,
        columnNumber: 17
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
        item: true,
        xs: 8,
        sm: 8,
        children: // Display image and prompt if no locations found
        weatherData.length < 1 && pageLoaded ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Paper"], {
          className: classes.welcome,
          elevation: 10,
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])("img", {
            width: "40%",
            src: _rainy_6_svg__WEBPACK_IMPORTED_MODULE_8__["default"],
            alt: "weather icon animation"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 159,
            columnNumber: 25
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
            className: classes.textStyle,
            variant: "h5",
            children: "Add a 5-Digit Zipcode in the Toolbar"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 160,
            columnNumber: 24
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Typography"], {
            className: classes.textStyle,
            variant: "h5",
            children: " Get Current Weather for any US Location"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 161,
            columnNumber: 24
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 158,
          columnNumber: 21
        }, this) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
          style: {
            marginTop: '25px'
          },
          container: true,
          spacing: 4,
          children: [console.log(weatherData), weatherData.map(location => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
            item: true,
            xs: 12,
            sm: 6,
            md: 4,
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_WeatherCard__WEBPACK_IMPORTED_MODULE_4__["default"], {
              location: location,
              handleDelete: handleDelete
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 168,
              columnNumber: 33
            }, this)
          }, location.locationid, false, {
            fileName: _jsxFileName,
            lineNumber: 167,
            columnNumber: 29
          }, this))]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 163,
          columnNumber: 21
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 154,
        columnNumber: 17
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Grid"], {
        item: true,
        xs: 2,
        sm: 2
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 175,
        columnNumber: 17
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 13
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 141,
    columnNumber: 9
  }, this);
}

_s(Weather, "Hgya5S6AFoZhoEmn2e88fwrmHFw=", false, function () {
  return [useStyles];
});

_c = Weather;
/* harmony default export */ __webpack_exports__["default"] = (Weather);

var _c;

__webpack_require__.$Refresh$.register(_c, "Weather");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ })

})
//# sourceMappingURL=main.42ee052b4c649fb57513.hot-update.js.map