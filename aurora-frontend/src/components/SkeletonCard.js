import React from "react";

import { Stack, Skeleton } from "@mui/material";

function SkeletonCard() {
  return (
    <Stack
      style={{
        width: "175px",
        height: "250px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#181818",
        padding: "10px",
        margin: "5px 0 5px 0",
        borderRadius: "5px",
      }}
      spacing={2}
      padding={"5px"}
    >
      <Skeleton
        variant="circular"
        width={175}
        height={175}
        sx={{ bgcolor: "#242424" }}
      />
      <div>
        <Skeleton
          variant="text"
          width={120}
          height={30}
          sx={{ bgcolor: "#242424" }}
        />
        <Skeleton
          variant="text"
          width={80}
          height={20}
          sx={{ bgcolor: "#242424" }}
        />
      </div>
    </Stack>
  );
}

export default SkeletonCard;
