import React from "react";
import {
  ActivateAlertPopupProps,
  ActivateConfirmPopupProps,
  UsePopupState,
} from "@/common/types/types";

const PopupContext = React.createContext({});

export default function PopupWrapper({ children }: any) {
  const [alertPopup, setAlertPopup] = React.useState({
    inHTML: false,
    isActive: true,
    content: "",
    isLoading: false,
    onClick: () => {},
  });

  const [confirmPopup, setConfirmPopup] = React.useState({
    inHTML: false,
    isActive: false,
    content: "",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const DeactivateAlertPopup = async () => {
    setAlertPopup((prev) => ({
      ...prev,
      inHTML: true,
      isActive: false,
    }));

    setTimeout(() => {
      setAlertPopup({
        inHTML: false,
        isActive: false,
        content: "",
        isLoading: false,
        onClick: () => {},
      });
    }, 250);
  };

  const DeactivateConfirmPopup = () => {
    setConfirmPopup((prev) => ({
      ...prev,
      inHTML: true,
      isActive: false,
    }));

    setTimeout(() => {
      setConfirmPopup({
        inHTML: false,
        isActive: false,
        content: "",
        onConfirm: () => {},
        onCancel: () => {},
      });
    }, 300);
  };

  const ActivateAlertPopup = ({
    content,
    onClick = DeactivateAlertPopup,
    isLoading = false,
  }: ActivateAlertPopupProps) => {
    setAlertPopup({
      inHTML: true,
      isActive: false,
      isLoading,
      content,
      onClick,
    });

    setTimeout(() => {
      setAlertPopup({
        inHTML: true,
        isActive: true,
        isLoading,
        content,
        onClick,
      });
    }, 100);
  };

  const ActivateConfirmPopup = ({
    content,
    onConfirm = DeactivateConfirmPopup,
    onCancel = DeactivateConfirmPopup,
  }: ActivateConfirmPopupProps) => {
    setConfirmPopup({
      inHTML: true,
      isActive: false,
      content,
      onConfirm,
      onCancel,
    });

    setTimeout(() => {
      setConfirmPopup({
        inHTML: true,
        isActive: true,
        content,
        onConfirm,
        onCancel,
      });
    }, 100);
  };

  const Values = React.useMemo(
    () => ({
      alertPopup,
      confirmPopup,
      ActivateAlertPopup,
      ActivateConfirmPopup,
      DeactivateAlertPopup,
      DeactivateConfirmPopup,
    }),
    [alertPopup, confirmPopup]
  );

  return (
    <PopupContext.Provider value={Values}>{children}</PopupContext.Provider>
  );
}

function usePopup() {
  const context = React.useContext(PopupContext) as UsePopupState;

  if (!context) {
    throw new Error("usePopup must be used within a PopupWrapper");
  }

  return context;
}

export { usePopup };
