import React from "react";
import { Stack, Skeleton } from "@mui/material";

function PlaylistSkeleton() {
  return (
    <Stack
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#181818",
        padding: "10px",
        margin: "5px",
        borderRadius: "5px",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px",
      }}
    >
      <Skeleton
        variant="circular"
        width={35}
        height={35}
        sx={{ bgcolor: "#242424" }}
      />
      <Skeleton
        variant="text"
        width={120}
        height={35}
        sx={{ bgcolor: "#242424" }}
      />
    </Stack>
  );
}

export default PlaylistSkeleton;
