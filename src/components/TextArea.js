import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export default function Textarea(props) {
    return (
        <TextareaAutosize
            rowsMin={4}
            aria-label="maximum height"
            placeholder="Add new Value"
            defaultValue={props?.value}
            onChange={event => props?.onChange(event.target.value)}
        />
    );
}
