import React, { Fragment, useState } from "react";

const AddSR = () => {
  const [sr_task, setTask] = useState("");
  const [sr_contractor, setContractor] = useState("");
  const [sr_name, setName] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { sr_task, sr_contractor, sr_name };
      const response = await fetch("http://localhost:3001/add_service_request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Service Request List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={sr_name}
          placeholder= "Enter Name"
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          value={sr_contractor}
          placeholder= "Enter Contractor"
          onChange={e => setContractor(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          value={sr_task}
          placeholder= "Enter Task"
          onChange={e => setTask(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default AddSR;