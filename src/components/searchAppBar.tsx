import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import LoginIcon from "@mui/icons-material/Login";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import FormControl from "@mui/material/FormControl";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useRef } from "react";

// import { getCurrentLocation, reverseGeocode } from "../location/utils";
import { Collapse, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addSearchFilter, updateSearchGeo } from "../slices/search-slice";
import { updateUser } from "../slices/user-slice";

// import { getAuth, signOut } from "firebase/auth";
import { useStore } from "react-redux";
import { RootState } from "../app/store";
// import { PlaceResult } from "@react-google-maps/api";

const PrimarySearchAppBar: React.FC<{
  handleSetScreen: (screenName: string) => void;
}> = ({ handleSetScreen }) => {
  const store = useStore<RootState>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSignedIn = useAppSelector((state) => state.user.signedIn);
  const userDisplayName = useAppSelector((state) => state.user.displayName);
  const userFirstName = useAppSelector((state) => state.user.firstName);
  const isAdmin = useAppSelector((state) => state.user.admin);
  const displayAppBar = useAppSelector(
    (state) => state.toggle.displaySearchBar
  );

  console.log("inside primarysearchappbar ");
  console.log("userDisplayName: ", userDisplayName);
  console.log("userFirstName: ", userFirstName);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const [stateSearchWithIn, setSearchWithIn] =
  //   useState<number>(propSearchWithIn);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const searchDistance: string = useAppSelector((state) => {
    for (let i = 0; i < state.search.filters.length; i++) {
      if (state.search.filters[i].name == "distance") {
        return state.search.filters[i].value;
      }
    }
    return "5";
  });
  // const [searchDistance, setSearchDistance] = useState<string>("5");
  const [searchText, setSearchText] = useState("");
  const [searchLat, setSearchLat] = useState<number>(0);
  const [searchLong, setSearchLong] = useState<number>(0);

  // const [statePredictions, setPredictions] = useState<
  //   google.maps.places.AutocompletePrediction[]
  // >([]);
  const [displayOptions, setDisplayOptions] = useState<string[]>([]);
  const [selectedPlaceDescr, setSelectedPlaceDescr] = useState<string>("");
  // const service = new google.maps.places.AutocompleteService();
  // function updateSearchWithIn(pSearchWithIn: number) {
  //   setSearchWithIn(pSearchWithIn);
  //   // updateGlobalData({ searchWithIn: pSearchWithIn });
  // }

  function updateSearchLatLong(pSearchLat: number, pSearchLong: number) {
    setSearchLat(pSearchLat);
    setSearchLong(pSearchLong);
    // updateGlobalData({ searchWithIn: pSearchWithIn });
  }

  const inputRef = useRef<HTMLInputElement>(null);
  // export default function PrimarySearchAppBar() {

  const handleSearchTextChange = async (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    // need minimum of 4 characters to perform predictions -- this is application pg hunts restriction to reduce number of google api calls
    if (value.length < 4) {
      return;
    }

    // if (!service) return;

    // await service.getPlacePredictions(
    //   {
    // input: value,
    // region: "IN",
    // types: ["premise", "subpremise", "street_address"],
    // componentRestrictions: { country: "IN" },
    // },
    //   (predictions) => {
    //     const tDisplayOptions: string[] = [];
    //     console.log("inside google autocomplete");
    //     console.dir(predictions);
    //     if (predictions !== null && predictions !== undefined) {
    //       setPredictions(predictions || []);
    //       for (let i = 0; i < predictions.length; i++) {
    //         tDisplayOptions.push(predictions[i].description);
    //         setDisplayOptions(tDisplayOptions);
    //       }
    //     } else {
    //       setPredictions([]);
    //       setDisplayOptions([]);
    //     }
    //   }
    // );

    setSearchText(value);
  };

  // const getPlaceDetails = async (address: string) => {
  //   const geocoder = new google.maps.Geocoder();

  //   geocoder.geocode({ address }, (results, status) => {
  //     if (
  //       status === "OK" &&
  //       results !== null &&
  //       results.length > 0 &&
  //       results[0]
  //     ) {
  //       const { lat, lng } = results[0].geometry.location;

  //       dispatch(
  //         updateSearchGeo({
  //           lat: lat() ?? 0,
  //           long: lng() ?? 0,
  //           withIn: parseInt(searchDistance),
  //         })
  //       );

  //       setSearchLat(lat() ?? 0);
  //       setSearchLong(lng() ?? 0);
  //       setSelectedPlaceDescr(address);
  //       setSearchText(address);

  //       // setLocation({ lat: lat(), lng: lng() });
  //       console.log("Place Details:", results[0]);
  //       console.log("Latitude:", lat(), "Longitude:", lng());
  //     } else {
  //       console.error("Geocode failed:", status);
  //     }
  //   });
  // };
  const handleSearchTextSelect = async (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {};

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSignout = async () => {
    setAnchorEl(null);
    handleMobileMenuClose();

    dispatch(
      updateUser({
        ...store.getState().user,
        signedIn: false,
      })
    );
  };

  const handleUserDashboard = async () => {
    setAnchorEl(null);
    handleMobileMenuClose();

    navigate("/userDashboard");
  };

  const handleAdminDashboard = async () => {
    setAnchorEl(null);
    handleMobileMenuClose();

    navigate("/adminDashboard");
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleAddPropertyClick = () => {
    console.log("inside handleAddPropertyClick ");
    // updateGlobalData({ compName: "addProperty" });

    navigate("/addProperty");
  };

  const handleLoginClick = () => {
    console.log("inside handleLoginClick ");
    // navigate("/login");
    handleSetScreen("login");
  };
  // const { authStatus, user, signOut } = useAuthenticator();

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!isSignedIn && <MenuItem onClick={handleLoginClick}>Login</MenuItem>}

      {isSignedIn && !isAdmin && (
        <MenuItem onClick={handleUserDashboard}>My Dashboard</MenuItem>
      )}

      {isSignedIn && isAdmin && (
        <MenuItem onClick={handleAdminDashboard}>Admin Dashboard</MenuItem>
      )}
      {isSignedIn && <MenuItem onClick={handleSignout}>Sign out</MenuItem>}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}

      <MenuItem onClick={handleAddPropertyClick}>Add Property</MenuItem>
      {!isSignedIn && <MenuItem onClick={handleLoginClick}>Login</MenuItem>}
      {isSignedIn && !isAdmin && (
        <MenuItem onClick={handleUserDashboard}>My Dashboard</MenuItem>
      )}

      {isSignedIn && isAdmin && (
        <MenuItem onClick={handleAdminDashboard}>Admin Dashboard</MenuItem>
      )}
      {isSignedIn && <MenuItem onClick={handleSignout}>Sign out</MenuItem>}
    </Menu>
  );
  // const [suggestions, setSuggestions] = useState<ComboBoxOption[]>([]);
  const handleSearch = async () => {
    // if (text !== "" && text.length > 2) {
    //   const tcomboOPtions: ComboBoxOption[] = [];

    //   try {
    //     const result: Place[] = await Geo.searchByText(text, {
    //       countries: ["IND"],
    //     });
    //     for (let i = 0; i < result.length; i++) {
    //       let tCombo: ComboBoxOption = { id: "", label: "" };
    //       tCombo.id = result[i].label!;
    //       tCombo.label = result[i].label!;
    //       tcomboOPtions.push(tCombo);
    //     }

    //     setSuggestions(tcomboOPtions);
    //   } catch (error) {
    //     console.error("Error searching for places:", error);
    //   }
    // }

    dispatch(
      updateSearchGeo({
        lat: searchLat,
        long: searchLong,
        withIn: searchDistance ? parseInt(searchDistance) : 0,
      })
    );

    console.log(
      "search filters are displatched in search app bar - search button click"
    );

    // updateGlobalData({
    //   searchWithIn: searchDistance ? parseInt(searchDistance) : 0,
    //   searchLat: searchLat,
    //   searchLong: searchLong,
    //   searchText: searchText,
    //   performSearch: !propPerformSearch,
    // });
  };

  const handleDistanceChange = (event: SelectChangeEvent) => {
    // setSearchDistance(event.target.value as string);
    dispatch(
      addSearchFilter({
        name: "distance",
        value: event.target.value as string,
        mutualExcl: true,
      })
    );
    // const tWithIn: number = event.target.value
    //   ? parseInt(event.target.value)
    //   : 0;-

    // propUpdateSearchWithIn(tWithIn);
  };

  const handleCurrentLocationClick = async () => {};

  const theme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          paper: {
            // maxHeight: "200px",
            overflowY: "auto",
          },
        },
      },
    },
  });

  const LocationIcon = styled(LocationOnIcon)({
    color: "#000000",
    marginRight: "8px",
  });

  // const handlePlaceSelect = (place: PlaceResult | undefined) => {
  //   if (place && place.geometry && place.geometry.location) {
  //     const latitude = place.geometry.location.lat();
  //     const longitude = place.geometry.location.lng();
  //     console.log("Latitude:", latitude, "Longitude:", longitude);
  //   }
  // };

  // Main Component

  return (
    <Collapse in={displayAppBar}>
      <Box>
        <AppBar position="static">
          <Toolbar>
            {/* <Tooltip title="Room Hunt">
            <IconButton
              size="small"
              aria-label="Room Hunt"
              sx={{ color: "white" }}
            >
              <HomeWorkOutlinedIcon />

              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block", color: "white" } }}
              >
                Room Hunt
              </Typography>
            </IconButton>
          </Tooltip> */}

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block", color: "white" } }}
            >
              Room Hunt
            </Typography>
            {/* <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          /> */}
            <Typography
              // variant="h6"
              noWrap
              component="div"
              sx={{
                color: "#F0F0F0",
                textTransform: "none",
                display: { xs: "none", sm: "block" },
                paddingLeft: 5,
              }}
            >
              with in
            </Typography>

            <FormControl
              sx={{
                m: 1,
                // minWidth: 100,
                color: "#F0F0F0",
                display: { xs: "none", sm: "block" },
              }}
              size="small"
            >
              {/* <InputLabel id="demo-simple-select-label">Select an option</InputLabel> */}
              <Select
                sx={{ color: "#F0F0F0" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchDistance}
                // label="Select an option"
                onChange={handleDistanceChange}
                renderValue={(value) => `${value} km`}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography
              // variant="h6"
              noWrap
              component="div"
              sx={{
                color: "#FFFFFF",
                textTransform: "none",
                display: { xs: "none", sm: "block" },
              }}
            >
              of
            </Typography>
            <Box
              sx={{
                // flexGrow: 1,
                color: "text.primary",
                fontSize: 25,
                fontWeight: "medium",
                width: { xs: "400px", sm: "400px" },
                paddingLeft: 1,
              }}
            >
              {/* <AutocompleteInput /> */}

              <ThemeProvider theme={theme}>
                <Autocomplete
                  freeSolo
                  ref={inputRef}
                  key="auto-complete-google-search-bar"
                  id="google-places-autocomplete"
                  // size="small"
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option
                  }
                  filterOptions={(x) => x}
                  options={displayOptions}
                  autoComplete
                  includeInputInList
                  filterSelectedOptions
                  value={searchText}
                  onInputChange={handleSearchTextChange}
                  onChange={handleSearchTextSelect}
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        // borderColor: "#F0F0F0", // Default border color
                        borderWidth: 1,
                      },
                      "&:hover fieldset": {
                        // borderColor: "#F0F0F0", // Border color on hover
                        borderWidth: 1,
                      },
                      "&.Mui-focused fieldset": {
                        // borderColor: "#F0F0F0", // Border color on focus
                        borderWidth: 1,
                      },
                    },
                  }}
                  // popupIcon=<LocationIcon />
                  // hiddenLabel="true"
                  renderInput={(params) => (
                    <TextField
                      key="auto-complete-google-search-bar-textfield"
                      {...params}
                      variant="outlined"
                      fullWidth
                      placeholder="Search point of interest"
                      // helperText="type minimum of 3 character to see suggestions"
                      sx={{
                        color: "white",
                        input: { color: "white" },
                      }}
                    />
                  )}
                  renderOption={(props, option) => {
                    return (
                      <li {...props}>
                        <LocationIcon />
                        <span>{option}</span>
                      </li>
                    );
                  }}
                />
                {/* <Box display="flex" justifyContent="flex-end" alignItems="right">
                  <Typography variant="body2">Current location</Typography>
                  <IconButton aria-label="add" onClick={handleCurrentLocationClick}>
                    <LocationOnIcon sx={{ mr: 1 }} />{" "}
                    </IconButton>
                  </Box> */}
              </ThemeProvider>
              {/* 
                    <SearchAutoComplete
                    propSearchLat={searchLat}
                    propSearchLong={searchLong}
                    // propFirstSearch={propFirstSearch}
                    propCurLat={propCurLat}
                    propCurLong={propCurLong}
                    propCurAddress={propCurAddress}
                    propUpdateSearchLatLong={updateSearchLatLong}
                    /> */}
            </Box>
            <Tooltip title="Use current location">
              <IconButton
                aria-label="add"
                size="small"
                onClick={handleCurrentLocationClick}
              >
                <LocationOnIcon />
              </IconButton>
            </Tooltip>
            {/* <Box
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
            }}
          ></Box> */}
            {/* <Button size="small" variant="contained" onClick={handleSearch}>
            <Typography
              variant="button"
              sx={{ color: "#FFFFFF", textTransform: "none" }}
            >
              Search
            </Typography>
          </Button> */}
            {/* </Box> */}
            <Box
              sx={{
                flexGrow: { xs: 0, md: 1 },
                display: { xs: "flex", md: "flex" },
              }}
            />

            {/* <Box sx={{ display: { xs: "flex" } }}> */}
            <div>
              {/* <Button startIcon={<AddHomeIcon />} aria-label="add property">
              Add Property
            </Button> */}
              <Tooltip title="Add Property">
                <IconButton
                  size="small"
                  aria-label="Add Property"
                  onClick={handleAddPropertyClick}
                  color="inherit"
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  <AddHomeOutlinedIcon />
                  <Typography
                    variant="button"
                    sx={{
                      color: "#FFFFFF",
                      textTransform: "none",
                      display: { xs: "none", md: "block" },
                      fontSize: { md: "5" },
                    }}
                  >
                    Add Property
                  </Typography>
                </IconButton>
              </Tooltip>
              {/* <Button onClick={handleAddPropertyClick}>
              <Typography
                variant="button"
                sx={{
                  color: "#FFFFFF",
                  textTransform: "none",
                  display: { xs: "none", md: "block" },
                }}
              >
                Add Property
              </Typography>
            </Button> */}
            </div>
            {/* </Box> */}

            {isSignedIn && (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {/* <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton> */}
                {/* <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {/* hello */}
                  {/* {userFirstName}
                  {userDisplayName} */}
                  {userFirstName !== "" ? (
                    <Typography
                      variant="button"
                      sx={{
                        color: "#FFFFFF",
                        textTransform: "none",
                        display: { xs: "none", md: "flex" },
                      }}
                    >
                      {userFirstName}
                    </Typography>
                  ) : (
                    <Typography
                      variant="button"
                      sx={{ color: "#FFFFFF", textTransform: "none" }}
                    >
                      {userDisplayName}
                    </Typography>
                  )}
                  <AccountCircle />
                </IconButton>
              </Box>
            )}

            {!isSignedIn && (
              <div>
                <Tooltip title="Login">
                  <IconButton
                    size="small"
                    aria-label="login"
                    onClick={handleLoginClick}
                    color="inherit"
                    sx={{ display: { xs: "none", md: "block" } }}
                  >
                    <LoginIcon />
                    <Typography
                      variant="button"
                      sx={{
                        color: "#FFFFFF",
                        textTransform: "none",
                        display: { xs: "none", md: "block" },
                        fontSize: { md: "5" },
                      }}
                    >
                      Login
                    </Typography>
                  </IconButton>
                </Tooltip>
              </div>
            )}

            {/* {authStatus === "authenticated" ? ( */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
            {/* ) : (
            <div></div>
          )} */}
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </Collapse>
  );
};

interface Option {
  value: string;
  label: string;
}

type SearchWithInProps = {
  propSearchWithIn: number;
  propUpdateSearchWithIn: (searchWithIn: number) => void;
};

const options: Option[] = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

export default PrimarySearchAppBar;
