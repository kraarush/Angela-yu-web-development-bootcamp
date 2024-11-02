import React from "react";
import cars from "./practice";
import TableData from "./TableData";

function App() {

    const [honda, tesla] = cars;

  return (
    <div>
     <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Top Color</th>
            <th>Top Speed</th>
          </tr>
        </thead>
        <tbody>
          {/* {cars.map((car, index) => {
            return <TableData key={index} car={car} />;
          })} */}
          <TableData key={0} car={honda} />
          <TableData key={1} car={tesla} />
        </tbody>
      </table>
    </div>
  );
}

export default App;
