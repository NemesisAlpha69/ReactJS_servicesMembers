import React from "react";
import {} from "../services/getMembers";

const MemberForm = ({ match, history }) => {
  const uid = match.params.id;
  console.log(uid);
  return (
    <div>
      <h1>Member Form {match.params.id} </h1>
      <label>Name</label>
      <input className="form-control" type="text" placeholder="" />
      <br />
      <button
        className="btn btn-primary"
        onClick={() => history.push("/members")}
      >
        Back
      </button>
    </div>
  );
};

export default MemberForm;
