import React from "react";
import TextField from "@material-ui/core/TextField";

export default function TextInput(props) {
    const handleChange = event => {
        props.onChange(event.target.value);
    };
    return (
        <div>
            <TextField
                // error={!!!props.value}
                multiLine={!!props?.multiLine}
                id="standard-error-helper-text"
                variant={"outlined"}
                label={props.label}
                defaultValue={props.value}
                helperText={
                    props.value
                        ? "Default: " + props.value
                        : "Example: notification_enabled"
                }
                onChange={handleChange}
                style={props?.style}
                fullWidth={true}
            />
        </div>
    );
}
