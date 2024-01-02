import React, { useEffect, useState } from "react";

const BreakpointIndicator = () => {
  const [breakpoint, setBreakpoint] = useState("");

  const mqBreakpoints = {
    mobile: "(max-width: 320px)",
    midMobile: "(min-width: 321px) and (max-width: 390px)",
    smallTablet: "(min-width: 391px) and (max-width: 739px)",
    tablet: "(min-width: 740px) and (max-width: 979px)",
    desktop: "(min-width: 980px) and (max-width: 1134px)",
    desktopMid: "(min-width: 1135px) and (max-width: 1399px)",
    desktopWide: "(min-width: 1400px) and (max-width: 1799px)",
    desktopXL: "(min-width: 1800px)",
  };

  const checkBreakpoint = () => {
    ////console.log(window.innerWidth);
    for (const [key, value] of Object.entries(mqBreakpoints)) {
      if (window.matchMedia(value).matches) {
        setBreakpoint(key);
        break; // Exit the loop when the first matching breakpoint is found
      }
    }
  };

  useEffect(() => {
    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
    return () => {
      window.removeEventListener("resize", checkBreakpoint);
    };
  }, []);

  return (
    <div className={`breakpoint-indicator ${breakpoint}`}>
      {breakpoint}
    </div>
  );
};

export default BreakpointIndicator;
