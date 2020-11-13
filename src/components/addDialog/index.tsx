import React, { useState, useRef, useLayoutEffect, useContext } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";

import {
  useDialogState,
  useDialogDispatch,
} from "../../contexts/addDialogcontext";
import { Alert } from "@material-ui/lab";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import QRCode from "qrcode.react";
import { uid } from "uid";
import PrintIcon from "@material-ui/icons/Print";
import { addDataStore } from "../../services/crud";
import { UserContext } from "../../contexts/usercontext";
import { CARDS } from "../../constants/routes/index";
import { useHistory } from "react-router-dom";
import QrDialog from "../qrDialog/index";
export default function AddDialog() {
  const { user } = useContext(UserContext);
  const dialog = useDialogState();
  const dispatch = useDialogDispatch();
  const [formName, setFormName] = useState<string>();
  const [createUid, setCreateUid] = useState<any>();
  const [stepOne, setStepOne] = useState<boolean>(false);
  const [stepTwo, setStepTwo] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const handleFormName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateUid(uid());
    setFormName(e.target.value);
  };

  useLayoutEffect(() => {
    dialog && setStepOne(true);
    console.log("Currently Tracking step :" + counter);
  }, [dialog, counter]);

  const formHandler = () => {
    setError("");
    if (formName) {
      setCounter((prevCount) => prevCount + 1);
    } else {
      setError("Gelieve een naam in te vullen.");
    }
  };

  const handleBack = () => {
    setCounter((prevCounter) => prevCounter - 1);
    setError("");
  };

  const handleCancel = () => {
    dispatch({ type: "add" });
    setCounter(0);
    setError("");
  };

  async function formHandleSave() {
    try {
      setError("");
      setLoading(true);
      await addDataStore(createUid, formName, user.uid);
    } catch (e) {
      setError(e.message);
    } finally {
      dispatch({ type: "add" });
      setLoading(false);
      setCounter(0);
    }
  }

  return (
    <>
      <Dialog
        open={dialog.add}
        onClose={() => dispatch({ type: "add" })}
        aria-labelledby="form-dialog-title"
      >
        {error && (
          <Alert severity="info" variant="filled">
            {error}
          </Alert>
        )}
        {counter === 0 && (
          <>
            <DialogTitle id="form-dialog-title">Van start gaan.. </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Gelieve een naam te kiezen voor je menu kaart.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Naam van menu kaart"
                type="name"
                fullWidth
                onChange={handleFormName}
              />
            </DialogContent>
          </>
        )}

        {counter === 1 && <QrDialog uid={createUid} />}

        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Afbreken
          </Button>

          {counter > 0 && (
            <Button onClick={handleBack} color="primary">
              Vorige
            </Button>
          )}
          {counter === 0 && (
            <Button onClick={formHandler} color="primary">
              Volgende
            </Button>
          )}
          {counter === 1 && (
            <Button onClick={formHandleSave} color="primary">
              Opslaan
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
