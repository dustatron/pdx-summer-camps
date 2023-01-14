import { extendTheme } from "@chakra-ui/react";
import { inputTheme } from "./input";

const theme = extendTheme({
  components: {
    Input: {
      inputTheme,
    },
  },
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
      },
    },
  },
});

export default theme