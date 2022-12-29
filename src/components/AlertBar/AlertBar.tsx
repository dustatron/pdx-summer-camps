import React from "react";
import {
  Alert as ChaAlert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
  Stack,
} from "@chakra-ui/react";

import { Alert, useAlert } from "../../context/AlertContext";

type Props = { alert: Alert };

const Alert = ({ alert }: Props) => {
  const { closeAlert } = useAlert();
  return (
    <ChaAlert status={alert.status} padding={2} minH="3rem">
      <Flex justifyContent="space-between" w="full">
        <Stack direction="row">
          <AlertIcon />
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.body}</AlertDescription>
        </Stack>
        <Box>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={closeAlert}
          />
        </Box>
      </Flex>
    </ChaAlert>
  );
};

export default Alert;
