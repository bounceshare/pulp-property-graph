import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

export default function CheckboxesTags(props: any) {
    const classes = useStyles();
    const handleChange = (event: object, newValue: any) => {
        props.setValue(newValue);
    };
    return (
        <Autocomplete
            multiple={!!props.multiple}
            id="country-select-demo"
            style={{width: "30%"}}
            classes={{
                option: classes.option
            }}
            autoHighlight
            onChange={handleChange}
            options={props?.data}
            getOptionLabel={(option: any) => option}
            disableCloseOnSelect={!!props?.disableCloseOnSelect}
            renderOption={(option, {selected}) => (
                <React.Fragment>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{marginRight: 8}}
                        checked={selected}
                    />
                    {option}
                </React.Fragment>
            )}
            renderInput={params => (
                <TextField
                    {...params}
                    variant="outlined"
                    label={props?.title}
                    placeholder={props?.title}
                    inputProps={{
                        ...params.inputProps
                    }}
                />
            )}
        />
    );
}

const useStyles = makeStyles({
    option: {
        color: "black",
        fontSize: 15,
        "& > span": {
            marginRight: 10,
            fontSize: 18
        }
    }
});
