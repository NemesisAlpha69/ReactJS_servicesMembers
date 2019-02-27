import React, { Component } from "react";
import MembersTable from "./membersTable";
import SearchBox from "./searchBox";
import Pagination from "./pagination";
import ListGroup from "./common/listGroup";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import { getChamber, getGender } from "../services/getMembers";

// you should feel free to reorganize the code however you see fit
// including creating additional folders/files and organizing your
// components however you would like.

class App extends Component {
  state = {
    members: [],
    gender: [],
    currentPage: 1,
    pageSize: 20,
    searchQuery: "",
    selectedGender: null,
    sortColumn: { path: "first_name", order: "asc" },
    chamberSelected: "senate",
    chamber: []
  };

  componentWillMount = chamberSelected => {
    const session = 115; // 115th congressional session
    const chamber = "senate"; // senate or 'house'
    // sample API call
    fetch(
      `https://api.propublica.org/congress/v1/${session}/${chamber}/members.json`,
      {
        headers: new Headers({
          "X-API-Key": "d0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr"
        })
      }
    )
      .then(res => res.json())
      .then(json => json.results[0].members)
      .then(members => {
        // array of congressperson JSON objects
        //this.setState({ members: members });
        this.setState({ members: members });
      });
  };

  componentDidMount() {
    //this.setState({ members: getMembers() });
    const gender = [{ _id: "", name: "All" }, ...getGender()];
    this.setState({ gender });
    this.setState({ chamber: getChamber() });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenderSelect = gender => {
    this.setState({ selectedGender: gender, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGender: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleChamberSelect = chamber => {
    this.setState({ chamberSelected: chamber });

    console.log(chamber);
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGender,
      searchQuery,
      members: allMembers
    } = this.state;

    let filtered = allMembers;
    if (searchQuery) {
      filtered = allMembers.filter(m =>
        m.first_name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGender && selectedGender._id) {
      filtered = allMembers.filter(m => m.gender === selectedGender._id);
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const members = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: members };
  };

  render() {
    const { length: count } = this.state.members;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no members in the database.</p>;

    const { totalCount, data: members } = this.getPagedData();
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.gender}
              selectedItem={this.state.selectedGender}
              onItemSelect={this.handleGenderSelect}
            />
          </div>
          <div className="col">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />

            <MembersTable
              members={members}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
