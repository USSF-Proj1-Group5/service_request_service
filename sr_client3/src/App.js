import React, { Fragment } from "react";
import "./App.css";

//components

import AddSR from "./AddSR";
import ListSR from "./ListSR";

function App() {
  return (
    <Fragment>
      <div className="container">
        <AddSR/>
        <ListSR />
      </div>
    </Fragment>
  );
}

export default App;