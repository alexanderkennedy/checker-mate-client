import axios from "axios";
import React, { Component } from "react";
import MainList from "../../components/MainList/MainList";
// import Tally from "../../components/Tally/Tally";
// import Nav from "../../components/Nav/Nav";
// import LoginFormList from "../../components/LoginFormList/LoginFormList";

class PlantersMainList extends Component {
  render() {
    return <div>
      {/* <LoginFormList></LoginFormList> */}
      <MainList></MainList>
      {/* <Tally></Tally> */}
    </div>;
  }
}

export default PlantersMainList;
