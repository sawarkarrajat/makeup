import React from "react";
import "../sass/Dashboard.sass";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Checkbox from "./Checkbox";
import PropTypes from "prop-types";
/**
 * filter tree component to render filters
 *
 * @param {propType} props
 * @property {function}
 */
function FilterTree({ treeLabel, checkboxArray }) {
  return (
    <>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId={treeLabel} label={treeLabel}>
          {checkboxArray.map((filter) => (
            <Checkbox key={filter} filterLabel={treeLabel} label={filter} />
          ))}
        </TreeItem>
      </TreeView>
      <br />
    </>
  );
}
FilterTree.prototype = {
  treeLabel: PropTypes.string,
  checkboxArray: PropTypes.array,
};
export default FilterTree;
