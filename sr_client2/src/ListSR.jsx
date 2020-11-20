function ListSR(props){
    var displaySR = props.listSR.map(each => <li>name - {each.sr_name}, task - {each.sr_task}, ctr - {each.sr_contractor}</li>)
    return(
        <div>
            {displaySR}
        </div>
        
    )
}
export default ListSR;