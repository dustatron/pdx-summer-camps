import React from "react";
import CampCard from "../CampCard";

function CampListWrapper() {
  return (
    <>
      <h1 className="text-center text-3xl">Summer Camps</h1>
      <div className="m-2 border-2 p-2">Filters</div>
      <div className="flex flex-wrap p-1">
        <CampCard />
        <CampCard />
        <CampCard />
        <CampCard />
      </div>
    </>
  );
}

export default CampListWrapper;
