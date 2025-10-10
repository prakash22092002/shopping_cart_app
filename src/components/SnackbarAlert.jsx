import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({ open, message, onClose }) => (
    <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
        <Alert onClose={onClose} severity="success" variant="filled" sx={{ width: "100%" }}>
            {message}
        </Alert>
    </Snackbar>
);

export default SnackbarAlert;
