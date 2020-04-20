import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import uniqid from "uniqid";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(1),
	},
}));

export default function OptionsSelect(props) {
	const classes = useStyles();
	const [variable, setVariable] = React.useState("");

	const handleChange = (event) => {
		setVariable(event.target.value);
	};

	return (
		<>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel>{props.type}</InputLabel>
				<Select value={variable} onChange={handleChange} label={props.type} autoWidth={true}>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{props.arrayOfItems.map((item) => (
						<MenuItem key={uniqid()} value={item}>{item}</MenuItem>
					))}
				</Select>
			</FormControl>
		</>
	);
}
