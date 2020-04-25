import React,{useEffect} from "react";
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

const OptionsSelect = React.forwardRef((props, ref) => {
	const classes = useStyles();
	const [variable, setVariable] = React.useState("");
	
	const handleChange = async (event) => {
		event.preventDefault();
		let someValue = event.target.value;
		await setVariable(someValue);
		props.setItem(someValue);
	};
	
	useEffect((props) => {
		setVariable("");
		if (typeof props != "undefined") {
			props.toggleReset();
	 }
		
	}, [props.reset])

	return (
		<FormControl ref={ref} variant="outlined" className={classes.formControl}>
			<InputLabel>{props.type}</InputLabel>
			<Select
				value={variable}
				onChange={(event) => handleChange(event)}
				label={props.type}
				autoWidth={true}
			>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				{props.arrayOfItems.map((item) => (
					<MenuItem key={uniqid()} value={item}>
						{item}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
});
export default OptionsSelect;