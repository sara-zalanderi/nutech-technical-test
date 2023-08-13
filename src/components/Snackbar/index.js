import React, { useState, useEffect } from "react";
import { Icon, Header, TransitionablePortal } from "semantic-ui-react";
import Style from "./index.style";

const Snackbar = (props) => {
  const { alert, animation, duration, onCloseAlert } = props;
  const [alertData, setAlertData] = useState({
    message: "",
    status: "",
    isOpen: false,
  });

  useEffect(() => {
    if (alert.isOpen) {
      setAlertData(alert);

      onCloseAlert({
        message: "",
        status: "",
        isOpen: false,
      });
    }
    return () => {
      setAlertData({
        message: "",
        status: "",
        isOpen: false,
      });
    };
  }, [alert, onCloseAlert]);
  if (!alertData.isOpen) {
    return false;
  }
  const getType = {
    success: {
      icon: "check circle",
      color: "teal",
    },
    info: {
      icon: "info circle",
      color: "blue",
    },
    warning: {
      icon: "warning sign",
      color: "red",
    },
  };

  return (
    <TransitionablePortal
      open={alertData.isOpen}
      transition={{ animation, duration }}
    >
      <Style className={`${getType[alertData.status].color}-border`}>
        <Header as="h5">
          <Icon
            name={getType[alertData.status].icon}
            color={getType[alertData.status].color}
            size="large"
          />
          <p>{alertData.message}</p>
        </Header>
      </Style>
    </TransitionablePortal>
  );
};

export default Snackbar;
