import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({

  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  },
  styles: {
    global: {
      body: {
        bg: "#F7FAFC",
        paddingBottom: "env(safe-area-inset-bottom)"
      },
    },
  },
});

export default theme