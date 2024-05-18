import React, { useEffect } from "react";
import "./MusicControl.css";
import {
  Pause,
  Repeat,
  Shuffle,
  SkipNext,
  SkipPrevious,
  PlayCircleFilled,
  RepeatOne,
} from "@material-ui/icons";
import {
  Box,
  Slider,
  Typography,
  makeStyles,
  useTheme,
  withStyles,
} from "@material-ui/core";
import { usePlayerContext } from "./PlayerProvider";
import playerController from "../../PlayerController";
import { useTrackContext } from "./TrackProvider";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 27,
    height: 27,
    color: theme.palette.primary.main,
    marginLeft: 10,
    marginRight: 10,
    "&:hover": {
      color: theme.palette.primary.hover,
    },
  },
}));

//TODO : Extract this common component to a separate file
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

const formatTime = (time) => {
  const minutes = Math.floor(time / (60 * 1000));
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

function MusicControl() {
  const classes = useStyles();
  const theme = useTheme();

  const { player, handlePlayerChange } = usePlayerContext();
  const { activeTrack, handleTrackChange } = useTrackContext();
  const [seekValue, setSeekValue] = React.useState(0);

  useEffect(() => {
    if (activeTrack && activeTrack.id) {
      if (player.isPlaying) next();
      else play();
    }
  }, [activeTrack]);

  const play = async () => {
    const result = await playerController.play(() => {});
    handlePlayerChange({ ...player, isPlaying: result });
  };

  const resume = async () => {
    const result = playerController.resume();
    handlePlayerChange({ ...player, isPlaying: result });
  }

  const pause = () => {
    playerController.pause();
    handlePlayerChange({ ...player, isPlaying: false });
  };

  const shuffle = () => {
    handlePlayerChange({ ...player, isShuffle: !player.isShuffle });
  };

  const next = () => {
    if (!player.isPlaying) return;

    playerController.skip("next");
    handlePlayerChange({
      ...player,
      isPlaying: true,
      currentTrackIndex: player.currentTrackIndex + 1,
    });
    setSeekValue(0);
  };

  const previous = () => {
    if (!player.isPlaying) return;

    playerController.skip("prev");
    handlePlayerChange({
      ...player,
      isPlaying: true,
      currentTrackIndex: player.currentTrackIndex - 1,
    });
    setSeekValue(0);
  };

  const playPause = async () => {
    if (player.isPlaying) {
      pause();
    } else {
      await resume();
    }
  };

  const onSeek = (event, newValue) => {
    if (!player.isPlaying) return;

    setSeekValue(newValue);
    playerController.seek(seekValue);
  };

  const step = () => {
    const seek = playerController.getSeek() || 0;
    console.log("seek", seek);
    setSeekValue(seek);
    if (player.isPlaying) {
    }
  };

  const resetSeek = () => {};

  const loop = () => {
    if (!player.isPlaying) return;

    const _loop = !player.isLoop;
    handlePlayerChange({ ...player, isLoop: _loop });
    playerController.loop(_loop);
  };

  return (
    <div className="music-controller">
      <div className="controls">
        <Shuffle className={classes.icon} onClick={shuffle} />
        <SkipPrevious className={classes.icon} onClick={previous} />
        <div className="play-pause-container">
          {player.isPlaying ? (
            <Pause onClick={playPause} />
          ) : (
            <PlayCircleFilled onClick={playPause} />
          )}
        </div>
        <SkipNext
          className={classes.icon}
          onClick={next}
          disabled={!player.isPlaying}
        />
        {player.isLoop ? (
          <RepeatOne
            className={classes.icon}
            onClick={loop}
            style={{ color: "#fff" }}
          />
        ) : (
          <Repeat className={classes.icon} onClick={loop} />
        )}
      </div>
      <div className="timeline-container">
        <Typography
          style={{
            color: theme.palette.text.dim,
            fontSize: "0.85rem",
            fontWeight: "bold",
          }}
        >
          {formatTime(100)}
        </Typography>
        <div className="slider-container">
          <CustomSlider
            size="small"
            defaultValue={0}
            aria-label="Small"
            valueLabelDisplay="auto"
            value={seekValue}
            onChange={onSeek}
            disabled={!player.isPlaying}
          />
        </div>
        <Typography
          style={{
            color: theme.palette.text.dim,
            fontSize: "0.85rem",
            fontWeight: "bold",
          }}
        >
          {formatTime(activeTrack?.duration)}
        </Typography>
      </div>
    </div>
  );
}

export default MusicControl;
