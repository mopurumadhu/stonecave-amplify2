import * as React from "react";
import PrimarySearchAppBar from "../../components/searchAppBar";
import { addScreenSize } from "../../slices/master-slice";
import { useAppDispatch } from "../../app/hooks";
import { useEffect, useState } from "react";
import Login from "../../components/auth";

const HomePage: React.FC = () => {
  const [screen, setScreen] = useState<string>("home");

  function handleAfterLogin(isSignedIn: boolean, userId: string) {
    console.log("logged in user: " + userId);
    if (isSignedIn) {
      setScreen("home");
    }
  }

  function handleSetScreen(screenName: string) {
    if (screenName !== "") {
      setScreen(screenName);
    }
  }

  if (screen == "home") {
    return (
      <div>
        <PrimarySearchAppBar handleSetScreen={handleSetScreen} />
      </div>
    );
  } else if (screen == "login") {
    return (
      <Login
        loginReason=""
        initiatedFrom="/"
        handleAfterLogin={handleAfterLogin}
      />
    );
  }
};

export const UseScreenSize = () => {
  const [screenSize, setScreenSize] = useState<
    "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | ""
  >("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      // let tScreenSize: string = "xs";
      // if (window.innerWidth < 640) {
      //   setScreenSize("xs");
      // } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
      //   setScreenSize("sm");
      //   tScreenSize = "sm";
      // } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      //   setScreenSize("md");
      //   tScreenSize = "md";
      // } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
      //   setScreenSize("lg");
      //   tScreenSize = "lg";
      // } else if (window.innerWidth >= 1280 && window.innerWidth < 1536) {
      //   setScreenSize("xl");
      //   tScreenSize = "xl";
      // } else if (window.innerWidth >= 1536) {
      //   setScreenSize("2xl");
      //   tScreenSize = "2xl";
      // }
      dispatch(addScreenSize({ width: window.innerWidth }));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {/* <h1>Current screen size: {screenSize}</h1>
      {screenSize === "xs" && <p>This is a mobile-sized screen!</p>}
      {screenSize === "lg" && <p>You are viewing this on a large screen.</p>} */}
    </div>
  );
};

export default HomePage;
