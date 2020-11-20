import React from 'react'
import AddSR from './AddSR'
import ListSR from './ListSR'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentSR_name: '',
      currentSR_task: '',
      currentSR_contractor: '',
      listSR: [],
      urlAPI: 'http://localhost:3001'
    }
  }
  

  async componentDidMount() {
    const originalSRList = await this.getSRList();
    this.setState({ listSR: this.state.listSR.concat(originalSRList) });
}
  async getSRList() {
    const response = await fetch(`${this.state.urlAPI}/service_requests`);
    const json = await response.json();
    return json;
  }
  
  handleCurrentSRName = (e) => {
    this.setState({currentSR_name: e.target.value})
  }
  handleCurrentTaskID = (e) => {
    this.setState({currentSR_task: e.target.value})
  }
  handleCurrentCtr = (e) => {
    this.setState({currentSR_contractor: e.target.value})
  }
  handleAddSR = async (e) => {
    let addSR = {sr_name: this.state.currentSR_name,
     sr_task: this.state.currentSR_task,
     sr_contractor: this.state.currentSR_contractor
    }
    this.addSR(addSR)
    const newList = await this.getSRList();
    this.setState({listSR: newList})
  }
  addSR = async (body) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    await fetch(`${this.state.urlAPI}/add_service_request`, requestOptions)
        .then(response => response.json())
        .then(response => alert(response.message))

  }
  handleDeleteSR = async (e) => {
    let deleteSR = {
      id: e.target.value
    }
    this.deleteSR(deleteSR);
    const newList = await this.getSRList();
    this.setState({listSR: newList})
  }
  deleteSR = async (body) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  };
    await fetch(`${this.state.urlAPI}/delete_service_request`, requestOptions)
      .then(response => response.json())
      .then(response => alert(response.message))
  }
  render(){
    return (
      <div>
        <h1>Service Requests Service </h1>
        <AddSR handleCurrentSRName = {this.handleCurrentSRName} handleCurrentTaskID = {this.handleCurrentTaskID} handleCurrentCtr = {this.handleCurrentCtr} handleAddSR = {this.handleAddSR.bind(this)}/>
        <ListSR listSR = {this.state.listSR} handleDeleteSR={this.handleDeleteSR.bind(this)}/>
      </div>
    );
  }
}

export default App;
