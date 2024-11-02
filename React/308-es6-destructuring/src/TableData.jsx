import React from "react";

function TableData(props) {
  const {
    model,
    coloursByPopularity: [mostPopularColor],
    speedStats: {topSpeed}
  } = props.car;

console.log(model);
console.log(topSpeed);
console.log(mostPopularColor);

  return (
    <tr>
      <td>{model}</td>
      <td>{mostPopularColor}</td>
      <td>{topSpeed}</td>
    </tr>
  );
}

export default TableData;
