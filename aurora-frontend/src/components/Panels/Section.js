import React from "react";
import "./Section.css";
import SongCard from "./SongCard";
import SkeletonSection from "../SkeletonSection";
function Section({ title, songs, onclick,onplay }) {
  return (
    <div>
      <h2 className="section-title">{title}</h2>
      <div className="card-container">
        {songs && songs.length > 0 ? (
          songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onclick={onclick}
              onplay={onplay}
            />
          ))
        ) : (
          <SkeletonSection />
        )}
      </div>
    </div>
  );
}

export default Section;
