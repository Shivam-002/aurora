package com.thunder.aurora.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thunder.aurora.entities.Track;

import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

@Repository
public interface TrackRepo extends JpaRepository<Track, UUID> {

    @Query("SELECT a FROM Track a ORDER BY random()")
    List<Track> findRandomTracks(Pageable Pageable);

}
