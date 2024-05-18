import React from 'react'
import './SongHeader.css'
import Favroite from '@material-ui/icons/Favorite';
import { AccessTime } from '@material-ui/icons';

function SongHeader() {
  return (
    <div className='playlist-song-header'>
        <span className='song-header-number'>#</span>
        <span className='song-header-title'>title</span>
        <span className='song-header-album'>album</span>
        <span className='song-header-date-added'>date added</span>
        <AccessTime style={{width:'15%',color:'#7b7b7b',margin:'0 0px 0 0px'}}/>
    </div>
  )
}

export default SongHeader;