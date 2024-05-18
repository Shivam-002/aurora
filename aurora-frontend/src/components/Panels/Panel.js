import React from "react";
import "./Panel.css";
import Home from "./Home/Home";
import Search from "./Search/Search";
import Playlist from "./Playlist/Playlist";
import { usePanelContext } from "./PanelContext";
import PanelHeader from "./PanelHeader/PanelHeader";
import {
  NAV_ARTIST,
  NAV_HOME,
  NAV_PLAYLIST,
  NAV_SEARCH,
  NAV_USER_PROFILE,
} from "../../utilities";
import Artist from "./Artists/Artist";
import UserProfile from "./UserProfile/UserProfile";
import { TopSongProvider } from "../../provider/TopSongProvider";
import { TopArtistsProvider } from "../../provider/TopArtistProvider";

function Panel() {
  const { activePanel } = usePanelContext();

  return (
    <div className="panel">
      <PanelHeader />
      <TopSongProvider>
        <TopArtistsProvider>
          {activePanel.panelName === NAV_HOME && <Home />}
        </TopArtistsProvider>
      </TopSongProvider>
      {activePanel.panelName === NAV_SEARCH && <Search />}
      {activePanel.panelName === NAV_PLAYLIST && (
        <Playlist id={activePanel.id} />
      )}
      {activePanel.panelName === NAV_ARTIST && <Artist />}
      {activePanel.panelName === NAV_USER_PROFILE && <UserProfile />}
    </div>
  );
}

export default Panel;
