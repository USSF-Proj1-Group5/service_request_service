function AddSR(props){
    return(
       <div>
           <input type="text" onChange = {props.handleCurrentSRName} placeholder="service request name"/>
           <input type="text" onChange = {props.handleCurrentTaskID} placeholder="task id"/>
           <input type="text" onChange = {props.handleCurrentCtr}placeholder="contractor"/>
           <button onClick={props.handleAddSR}>Add Service Request</button>
       </div>
    )
}

export default AddSR;