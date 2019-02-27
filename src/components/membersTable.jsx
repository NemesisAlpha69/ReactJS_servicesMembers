import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class MembersTable extends Component {
  columns = [
    {
      path: "first_name",
      label: "First Name",
      content: members => (
        <Link to={`/members/${members.id}`}>{members.first_name}</Link>
      )
    },
    { path: "last_name", label: "Last Name" },
    { path: "party", label: "Party" },
    { path: "state", label: "State" },
    { path: "next_election", label: "Next Year" },
    { path: "twitter_account", label: "Twitter" },
    { path: "facebook_account", label: "Facebook" },
    { path: "youtube_account", label: "Youtube" }
  ];

  render() {
    const { members, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={members}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MembersTable;
