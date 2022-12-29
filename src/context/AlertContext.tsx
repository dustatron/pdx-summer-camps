import React, { useState, useContext, createContext } from "react";

const AlertContext = createContext<IAlertContext>({
  alert: null,
  closeAlert: () => {
    return "";
  },
  addAlert: (alert: Alert) => {
    return alert;
  },
});

export const useAlert = () => {
  return useContext(AlertContext);
};

type Props = {
  children: React.ReactNode;
};

export type Alert = {
  status: "success" | "error";
  title: string;
  body: string;
};

type IAlertContext = {
  alert: Alert | null;
  closeAlert: () => void;
  addAlert: (alert: Alert) => void;
};

const AlertContextProvider = ({ children }: Props) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const addAlert = (alert: Alert) => {
    setAlert(alert);
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ alert, closeAlert, addAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
