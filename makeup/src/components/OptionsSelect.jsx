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
		let selectedChoice = {}
		// eslint-disable-next-line
		switch (props.type) {
			case "Brands":
				selectedChoice={
					type: "brand"
				}
				break;
			case "Product type":
					selectedChoice={
					type: "productType"
				}
				break;
			case "category":
					selectedChoice={
					type: "category"
				}
				break;
			case "tags":
					selectedChoice={
					type: "tag"
				}
				break;
		}
		selectedChoice.choice = someValue;
		props.optionsHistory(selectedChoice);
		await setVariable(someValue);
		props.setItem(someValue);
	};
	/**
	 * @type {hook} - use to load sideeffects like refresh or component reload
	 */
	useEffect(
		(props) => {
			if (typeof props != "undefined") {
				props.toggleReset();
				if (props.optionSelected !== "") {
					setVariable(props.optionSelected);
				}
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
