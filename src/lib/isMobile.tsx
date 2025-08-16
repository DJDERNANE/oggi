import { useState, useEffect } from "react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false); // default safe value

  useEffect(() => {
    // Only run in the browser
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);

    handleResize(); // set initial value on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;
