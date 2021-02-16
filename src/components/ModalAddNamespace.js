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
import {handleJSON} from "../utils/json_util";

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
                    {props?.title}
                </DialogTitle>
                <DialogContent>
                    <Box display="flex" flexWrap="wrap" justifyContent="flex-start">
                        <TextInput label={props?.hint} onChange={setValue}/>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            if (value) {
                                props.onSave(handleJSON(value));
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
