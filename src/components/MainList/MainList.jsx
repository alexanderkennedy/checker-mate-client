import React, { Component } from "react";
import axios from "axios";
import Checkbox from "../Checkbox/Checkbox";
import "./MainList.scss";
import Tally from "../../components/Tally/Tally";
import { FaRegHandshake } from "react-icons/fa";

const playerHeight = "84.375";
const playerWidth = "150";

class MainList extends Component {
  state = {
    aBetterWorkplace: [],
    firstAid: [],
    fitness: [],
    loading: true,
  };

  componentDidMount() {
    console.log("mounted");
    this.getAllLists();
  }

  getAllLists() {
    axios
      .get("http://localhost:8080/lists/")
      .then((res) => {
        this.setState(
          {
            aBetterWorkplace: res.data.workPlaceData,
            firstAid: res.data.firstAidData,
            fitness: res.data.fitnessData,
            loading: false,
          },
          () => console.log(this.state)
        );
      })
      .catch((err) => console.log(err));
  }

  getABetterWorkplace() {
    axios
      .get("http://localhost:8080/lists/a-better-workplace")
      .then((res) => {
        console.log(res.data);
        this.setState({
          aBetterWorkplace: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  handleCheckboxChangeBetterWorkplace = (event) => {
    this.setState({ checked: event.target.checked });
    const aBetterWorkplace = this.setState({
      checked: aBetterWorkplace.lists.checked,
    });
  };

  getFirstAid() {
    axios
      .get("http://localhost:8080/lists/first-aid")
      .then((res) => {
        this.setState({
          firstAid: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  getFitness() {
    axios
      .get("http://localhost:8080/lists/fitness")
      .then((res) => {
        this.setState({
          fitness: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  handleCheckboxChange = (e, idToUpdate, listName) => {
    console.log("e.target", e.target);
    e.preventDefault();
    console.log(this.props);
    const updatedABetterWorkplace = {
      watched: e.target.checked,
      listName: listName,
    };
    console.log("updatedABetterWorkplace", updatedABetterWorkplace);
    console.log("idToUpdate", idToUpdate);
    console.log("listName", listName);
    console.log("this.state.firstAid", this.state.firstAid);
    axios
      .put(`http://localhost:8080/lists/${idToUpdate}`, updatedABetterWorkplace)
      .then((res) => {
        this.getAllLists();
      });
  };

  mandatoryTally = (list1) => {
    let mandatoryCounter = 0;
    list1.forEach((element) => {
      if (element.watched === true) {
        mandatoryCounter++;
      }
    });
    return mandatoryCounter;
  };

  render() {
    console.log(
      "this.mandatoryTally",
      this.mandatoryTally(this.state.aBetterWorkplace)
    );

    return (
      <div className="full-list">
        {this.state.loading ? null : (
          <Tally
            className="experiment"
            aBetterWorkplace={this.state.aBetterWorkplace}
            firstAid={this.state.firstAid}
            fitness={this.state.fitness}
            mandatoryTallyFunction={this.mandatoryTally}
            location="top"
          ></Tally>
        )}
        <table className="full-list__table">
          <thead className="full-list__header">
            <tr className="full-list__column-titles--workplace list__column-titles hidden">
              <th className="full-list__column--name">MEDIA TYPE</th>
              <th className="full-list__column--time">TIME IN MINUTES</th>
              <th className="full-list__column--title">
                <FaRegHandshake size="1.5em" color="red" /> A BETTER WORKPLACE
              </th>
              <th className="full-list__column--priority">PRIORITY</th>
              <th className="full-list__column--watched">WATCHED ?</th>
            </tr>
          </thead>
          <tbody
            className={
              this.mandatoryTally(this.state.aBetterWorkplace) >= 3
                ? "full-list__body-wrap--workplace"
                : "full-list__body-wrap--workplace full-list__body-wrap--workplace--hidden"
            }
          >
            {this.state.aBetterWorkplace.map((val) => (
              <tr className="full-list__row" key={val.id}>
                <td className="full-list__row--item--mediaType">
                  {val.mediaType}
                </td>
                <td className="full-list__row--item--time">{val.min}</td>
                <td className="full-list__row--item--title">
                  <a href={val.url} target="_blank">
                    {val.title}
                  </a>
                </td>
                <td className="full-list__row--item--priority">
                  {val.priority}
                </td>
                <td>
                  <Checkbox
                    checked={val.watched}
                    onChange={(e) =>
                      this.handleCheckboxChange(e, val.id, val.listName)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
          {/* BREAK */}
          <tbody
            className={
              this.mandatoryTally(this.state.aBetterWorkplace) >= 3
                ? "full-list__body-wrap--first-aid"
                : "full-list__body-wrap--first-aid full-list__body-wrap--first-aid--hidden"
            }
          >
            <tr className="full-list__column-titles--firstAid">
              <th className="full-list__column--name">MEDIA TYPE</th>
              <th className="full-list__column--time">TIME IN MINUTES</th>
              <th className="full-list__column--title">🚑 FIRST AID</th>
              <th className="full-list__column--priority">PRIORITY</th>
              <th className="full-list__column--watched">WATCHED ?</th>
            </tr>
            {this.state.firstAid.map((val, key) => (
              <tr key={key}>
                <td>{val.mediaType}</td>
                <td>{val.min}</td>
                <td>
                  <a href={val.url} target="_blank">
                    {val.title}
                  </a>
                </td>
                <td>{val.priority}</td>
                <td>
                  {" "}
                  <Checkbox
                    checked={val.watched}
                    onChange={(e) =>
                      this.handleCheckboxChange(e, val.id, val.listName)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
          {/*  */}
          <tbody
            className={
              this.mandatoryTally(this.state.aBetterWorkplace) >= 3
                ? "full-list__body-wrap--fitness"
                : "full-list__body-wrap--fitness full-list__body-wrap--fitness--hidden"
            }
          >
            <tr className="full-list__column-titles--fitness">
              <th className="full-list__column--name">MEDIA TYPE</th>
              <th className="full-list__column--time">TIME IN MINUTES</th>
              <th className="full-list__column--title">🏊 FITNESS</th>
              <th className="full-list__column--priority">PRIORITY</th>
              <th className="full-list__column--watched">WATCHED ?</th>
            </tr>
            {this.state.fitness.map((val, key) => (
              <tr key={key}>
                <td>{val.mediaType}</td>
                <td>{val.min}</td>
                <td>
                  <a href={val.url} target="_blank">
                    {val.title}
                  </a>
                </td>
                <td>{val.priority}</td>
                <td>
                  {" "}
                  <Checkbox
                    checked={val.watched}
                    onChange={(e) =>
                      this.handleCheckboxChange(e, val.id, val.listName)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* NOTE: I will leave this code here and come back to it to remind myself to put in videos in phase 2 */}
        {/* <div className="youtube">
            <iframe width={playerWidth} height={playerHeight} src="https://www.youtube.com/embed/497RHaz_ajg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div> */}
        {this.state.loading ? null : (
          <Tally
            className="experiment"
            aBetterWorkplace={this.state.aBetterWorkplace}
            firstAid={this.state.firstAid}
            fitness={this.state.fitness}
            mandatoryTallyFunction={this.mandatoryTally}
            location="bottom"
          ></Tally>
        )}
      </div>
    );
  }
}

export default MainList;
