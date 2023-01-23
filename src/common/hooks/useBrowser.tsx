import React from "react";
import Mobile from "is-mobile";

export default function useBrowser() {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    function handleBrowser() {
      if (Mobile({ tablet: false })) {
        return setIsMobile(true);
      }

      return setIsMobile(false);
    }

    handleBrowser();
  }, [isMobile]);

  return { isMobile };
}
