package com.thunder.aurora.repos;

import org.springframework.stereotype.Repository;

import com.thunder.aurora.entities.Artist;
import com.thunder.aurora.entities.Track;

import java.util.UUID;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface ArtistRepo extends JpaRepository<Artist, UUID> {

    @Query("SELECT a FROM Artist a ORDER BY random()")
    List<Artist> findRandomArtists(Pageable Pageable);

    @Query("SELECT t FROM Track t JOIN t.artists a WHERE a.id = :artistId")
    List<Track> findTracksByArtistId(@Param("artistId") UUID artistId);

}
