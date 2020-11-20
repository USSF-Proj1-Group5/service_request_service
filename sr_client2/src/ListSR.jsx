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