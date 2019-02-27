import _ from "lodash";

export function getMembers() {
  const session = 115; // 115th congressional session
  const chamber = "senate"; // or 'house'

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
      return members;
    });
}
