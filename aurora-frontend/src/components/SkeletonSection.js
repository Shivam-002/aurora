import React from "react";
import SkeletonCard from "./SkeletonCard";

function SkeletonSection() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "30px",
      }}
    >
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

export default SkeletonSection;
