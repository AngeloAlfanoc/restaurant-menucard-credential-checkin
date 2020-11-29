import React, { useState } from "react";
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
  Tooltip,
  Dialog,
  DialogActions,
  Button,
} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import QRCode from "qrcode.react";
import { saveSvgAsPng } from "save-svg-as-png";
import LanguageIcon from "@material-ui/icons/Language";
import { FileCopyOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import "./index.scss";
import { Alert } from "@material-ui/lab";
import { QRProps } from "../../types";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { toggleQrDialog } from "../../redux/actions";
export default function QrDialog() {
  const history = useHistory();
  const [alert, setAlert] = useState<string>();
  const dispatch = useDispatch();
  const toggleDialog = useSelector(
    (state: RootStateOrAny) => state.toggleQrDialog
  );
  const id = useSelector((state: RootStateOrAny) => state.QrDialogId);
  const handleDownload = () => {
    saveSvgAsPng(document.getElementById("qrcode"), `qrcode-${id}`, {
      scale: 25,
    });
  };

  const handlePush = () => {
    history.push(id);
  };

  const handleClickCopy = (e) => {
    if (id) {
      navigator.clipboard.writeText(id);
      setAlert("Link gekopieerd!");
    }
  };

  return (
    <>
      <Dialog
        open={toggleDialog}
        onClose={() => dispatch(toggleQrDialog(false))}
      >
        <DialogTitle id="form-dialog-title">Uw QR Code</DialogTitle>
        <DialogContent>
          {alert && (
            <Alert severity="info" className="mb-3">
              {alert}
            </Alert>
          )}

          <QRCode
            value={id}
            id="qrcode"
            renderAs="svg"
            fgColor="#000000"
            bgColor="#ffffff"
            size={350}
          />

          <Box>
            <DialogContentText className="my-2">
              Via deze QR code verwijs je je consument door naar uw checkin
              pagina.
            </DialogContentText>
            <Tooltip title="QR code downloaden">
              <IconButton color="primary" onClick={handleDownload}>
                <CloudDownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Naar webpagina surfen">
              <IconButton color="primary" onClick={handlePush}>
                <LanguageIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Tooltip title="Kopieer link naar clipboard" className="hover_curse">
            <Box
              onClick={handleClickCopy}
              className="d-flex align-items-center"
            >
              <DialogContentText className="my-2">
                <small>{id}</small>
              </DialogContentText>
              <IconButton className="ml-1">
                <FileCopyOutlined />
              </IconButton>
            </Box>
          </Tooltip>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => dispatch(toggleQrDialog(false))}
            color="primary"
          >
            Sluiten
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
