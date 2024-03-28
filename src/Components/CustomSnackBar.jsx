import React, { useEffect, useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";

const CustomSnackBar = ({ isOpen, message, onClose, customKey }) => {
  const [open, setOpen] = useState(() => (isOpen ? isOpen : false));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    onClose();
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          handleClose();
        }}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={action}
        key={customKey}
      />
    </>
  );
};

export default CustomSnackBar;
