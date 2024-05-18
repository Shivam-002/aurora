import React from "react";
import "./VolumeControl.css";
import {
  FullscreenRounded,
  VolumeUpRounded,
  VolumeOff,
} from "@material-ui/icons";
import {
  Slider,
  Tooltip,
  Typography,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import playerController from "../../PlayerController";

//TODO : Change Volume Icon according to the volume
//TODO : Add Mute Functionality
const CustomSlider = withStyles({
  root: {
    position: "relative",
    "&:hover $thumb": {
      display: "block",
      color: "#fff",
    },
    "&:hover $track": {
      color: "#b074ff",
    },
  },
  thumb: {
    display: "none",
  },
  track: {
    color: "#fff",
  },
})(Slider);

const useStyles = makeStyles(() => ({
  tooltip: {
    backgroundColor: "#181818",
    color: "#fff",
  },
}));

function VolumeControl() {
  const classes = useStyles();

  const [volume, setVolume] = React.useState(50);
  const [isMuted, setIsMuted] = React.useState(false);

  const onVolumeChange = (event, newValue) => {
    setVolume(newValue);
    playerController.volume(newValue / 100);
    if (newValue === 0) {
      setIsMuted(true);
    }
  };

  const mute = () => {
    setIsMuted(true);
    playerController.volume(0);
  };

  const unmute = () => {
    setIsMuted(false);
    if (volume === 0) {
      setVolume(10);
      playerController.volume(0.1);
    }
  };

  return (
    <div className="volume-control">
      {volume > 0 || !isMuted ? (
        <VolumeUpRounded className="volume-icon" onClick={mute} />
      ) : (
        <VolumeOff className="volume-icon" onClick={unmute} />
      )}

      <div className="volume-slider-container">
        <CustomSlider
          style={{ color: "#fff", width: "150px" }}
          size="small"
          defaultValue={50}
          aria-label="Small"
          valueLabelDisplay="auto"
          onChange={onVolumeChange}
        />
      </div>
      <FullscreenRounded className="fullscreen-icon" />
    </div>
  );
}

export default VolumeControl;
