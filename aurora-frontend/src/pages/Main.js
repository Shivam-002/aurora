import React from "react";
import "./Main.css";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import Panel from "../components/Panels/Panel";
import Player from "../components/Player/Player";
import { PlayerProvider } from "../components/Player/PlayerProvider";
import { useTrackContext } from "../components/Player/TrackProvider";
function Main() {

  const {activeTrack} = useTrackContext();

  return (
    <div className="main">
      <div className="nav-panel-container">
        <NavigationBar />
        <Panel />
      </div>
      <PlayerProvider>
      {<Player />}
      </PlayerProvider>
    </div>
  );
}

export default Main;
