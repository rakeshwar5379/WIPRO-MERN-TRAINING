import React from "react";

function Card({ title, value, lastUpdated }) {
  console.log(title + " rendered");

  return (
    <div>
      <h4>{title}</h4>
      <p>{value}</p>
      <small>{lastUpdated}</small>
    </div>
  );
}

export default React.memo(Card);
