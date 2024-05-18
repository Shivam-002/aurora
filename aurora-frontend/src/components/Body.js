import React from "react";
import "./Body.css";
import Header from "./Header";
import { PlayCircleFilled, Favorite, MoreHoriz } from "@material-ui/icons";
import SongRow from "./SongRow";
import Home from "./Home/Home";
import { useTheme } from "@material-ui/core";

function Body() {

  //TODO : Manage Menu States
  const theme = useTheme();

  return (
    <div style={{backgroundColor:'black'}}>
      <Home/>
    </div>
    // <div className="body">
    //   {/* <Header/> */}
    //   {/* <SearchBody/> */}
    //   {/* <PlaylistBody/> */}
    //   <div className="body__info">
    //     {/* <img src={discover_weekly?.images[0]?.url} alt="" /> */}
    //     <img alt="" />

    //     <div className="body__infoText">
    //       <strong>PLAYLIST</strong>
    //       <h2>Discover Weekly</h2>
    //       {/* <p>{discover_weekly?.description}</p> */}
    //       <p>Description</p>
    //     </div>
    //   </div>
    //   <div className="body__songs">
    //     <div className="body__icons">
    //       <PlayCircleFilled className="body__shuffle" />
    //       <Favorite fontSize="large" />
    //       <MoreHoriz />
    //     </div>
    //     {/* {dummy_tracks?.map((item) => (
    //       <SongRow track={item} />
    //     ))} */}
    //   </div>
    // </div>
  );
}

export default Body;