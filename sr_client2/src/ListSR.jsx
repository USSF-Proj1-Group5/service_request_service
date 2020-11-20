function ListSR(props){
    var displaySR = props.listSR.map(each => <li>id - {each.id}, name - {each.sr_name}, task - {each.sr_task}, ctr - {each.sr_contractor} <button onClick={props.handleDeleteSR} value={each.id}>Delete</button></li>)
    return(
        <div>
            <ul>
                {displaySR}
            </ul>
            
        </div>
        
    )
}
export default ListSR;