import React from "react";
import "./App.css";
import { PanelProvider } from "./components/Panels/PanelContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import routes from "./Routes";
import { TrackProvider } from "./components/Player/TrackProvider";
import { UserProfileProvider } from "./components/UserProfileProvider";
import { NavProvider } from "./components/Panels/NavProvider";
import { PlaylistProvider } from "./provider/PlaylistProvider";

function App() {
  return (
    <PanelProvider>
      <UserProfileProvider>
        <TrackProvider>
          <PlaylistProvider>
            <NavProvider>
              <Router>
                <div className="app">
                  <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    {routes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        element={<route.component />}
                      />
                    ))}
                  </Routes>
                </div>
              </Router>
            </NavProvider>
          </PlaylistProvider>
        </TrackProvider>
      </UserProfileProvider>
    </PanelProvider>
  );
}

export default App;
