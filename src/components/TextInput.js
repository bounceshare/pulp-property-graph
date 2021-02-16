import React from "react";
import TextField from "@material-ui/core/TextField";

export default function TextInput(props) {
    const handleChange = event => {
        props.onChange(event.target.value);
    };
    return (
        <div>
            <TextField
                variant={"outlined"}
                label={props.label}
                defaultValue={props.value}
                helperText={props.value}
                onChange={handleChange}
                style={props?.style}
                fullWidth={true}
            />
        </div>
    );
}
