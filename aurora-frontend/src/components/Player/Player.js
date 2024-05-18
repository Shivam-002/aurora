import React from 'react'
import './Player.css'
import MusicControl from './MusicControl'
import SongInfo from './SongInfo';
import VolumeControl from './VolumeControl';
const dummy_tracks = [];

function Player() {
  return (
    <div className='player'>
      <SongInfo/>
      <MusicControl/>
      <VolumeControl/>
    </div>
  )
}
export default Player;