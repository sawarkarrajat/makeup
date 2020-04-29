import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import uniqid from "uniqid";
/**
 * @type {Object} - contains theme elements like margin and width
 */
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(1),
	},
}));
/**
 * a dropdown component element 
 *
 * @param {*} props
 * @param {*} ref - forwareded reference of selected component
 * @returns - returns a html element
 */
const OptionsSelect = React.forwardRef((props, ref) => {
	/**
	 * @type {Object} - reference of usestyles method
	 */
	const classes = useStyles();
	/**
	 * @type {hook} - a react hook to manage state
	 */
	const [variable, setVariable] = React.useState("");
	/**
	 * 
	 * @param {Event} event 
	 */
	const handleChange = async (event) => {
		event.preventDefault();
		/**
		 * @type {variable} - stores the value in target
		 */	
		let someValue = event.target.value;
		await setVariable(someValue);
		props.setItem(someValue);
	};
	/**
	 * @type {hook} - use to load sideeffects like refresh or component reload
	 */
	useEffect(
		(props) => {
			setVariable("");
			if (typeof props != "undefined") {
				props.toggleReset();
			}
		},
		[props.reset]
	);

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
