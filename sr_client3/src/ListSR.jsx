import React, { Fragment, useEffect, useState } from "react";

//import EditTodo from "./EditTodo";

const ListSR = () => {
  const [serviceRequests, setServiceRequests] = useState([]);

 

  const getSR = async () => {
    try {
      const response = await fetch("http://localhost:3001/service_requests");
      const jsonData = await response.json();

      setServiceRequests(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getSR();
  }, []);

   //delete todo function
   const deleteSR = async id => {
    try {
        let body = {id
          }
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        await fetch(`http://localhost:3001/delete_service_request`, requestOptions)
          .then(response => response.json())
          .then(response => {
          if(response.status === "failed")
          alert(response.message)})


        setServiceRequests(serviceRequests.filter(each => each.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log(serviceRequests);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contractor</th>
            <th>Task</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {serviceRequests.map(each => (
            <tr key={each.id}>
              <td>{each.sr_name}</td>
              <td>{each.sr_contractor}</td>
              <td>{each.sr_task}</td>
              <td>
                {/* <EditSR each={each} /> */}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteSR(each.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListSR;





/*
function ListSR(props){
    
    var displaySR = props.listSR.map(each => {
    return (<tr key= {each.id}>
             <td>{each.id}</td>
             <td>{each.sr_name}</td> 
             <td>{each.sr_task}</td>
             <td>{each.sr_contractor}</td>
             <td><button onClick={props.handleDeleteSR} value={each.id}>Delete</button></td> 
          </tr>
    )})
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>task</th>
                        <th>ctr</th>
                        <th>Delete</th>
                    </tr>

                </thead>
                <tbody>
                    {displaySR}
                </tbody>
            </table>
            
        </div>
        
    )
}
export default ListSR;
*/