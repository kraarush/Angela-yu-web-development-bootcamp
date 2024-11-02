import React from "react";

function ListItem(props) {
  return (
    <li
      onClick={() => {
        props.onChecked(props.id);
      }}
    >
      {props.item}
    </li>
  );
}

export default ListItem;
