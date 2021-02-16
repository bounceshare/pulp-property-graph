import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import TextInput from "./TextInput";
import Box from "@material-ui/core/Box";

function PaperComponent(props) {
  return (
      <Draggable
          handle="#draggable-dialog-title"
          cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
  );
}

export default function DraggableDialog(props) {
  const [value, setValue] = React.useState("");
  const [propertyName, setPropertyName] = React.useState(props?.property?.name);

  return (
      <div>
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            fullWidth={true}
        >
          <DialogTitle style={{cursor: "move"}} id="draggable-dialog-title">
            {propertyName ? "Update Config" : "Add New Config"}
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexWrap="wrap" justifyContent="flex-start">
              <TextInput
                  label={"Property Key"}
                  value={props.property?.name}
                  onChange={text => {
                    setPropertyName(text);
                  }}
              />
              <div style={{width: 24}}/>
              <TextInput
                  multiLine
                  label={"Property Value"}
                  value={JSON.parse(props?.property?.property_value)}
                  onChange={setValue}
              />
              {/*<TextArea*/}
              {/*  multiline*/}
              {/*  value={props?.property?.property_value}*/}
              {/*  onChange={setValue}*/}
              {/*/>*/}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button
                onClick={() => {
                  if ((propertyName || props?.property?.name) && value) {
                    props.onSave({
                      name: propertyName ?? props?.property?.name,
                      property_value: value
                    });
                    props.handleClose();
                  }
                }}
                color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
