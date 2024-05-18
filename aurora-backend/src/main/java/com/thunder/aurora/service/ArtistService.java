package com.thunder.aurora.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.thunder.aurora.dto.ArtistResponse;
import com.thunder.aurora.dto.HomepageTopItemDTO;
import com.thunder.aurora.dto.TrackResponse;
import com.thunder.aurora.entities.Artist;
import com.thunder.aurora.entities.Track;
import com.thunder.aurora.repos.ArtistRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArtistService {

    private final int TOP_ARTIST_LIMIT = 10;

    private final ArtistRepo artistRepo;

    public List<Artist> getAllArtists() {
        return artistRepo.findAll();
    }

    public ArtistResponse getArtistById(UUID id) {
        List<Track> tracks = artistRepo.findTracksByArtistId(id);

        if (tracks != null) {
            Artist artist = artistRepo.findById(id).get();

            long totalViews = tracks.stream()
                    .mapToLong(Track::getViews)
                    .sum();

            List<TrackResponse> trackResponses = tracks.stream().map(track -> TrackResponse.builder()
                    .id(track.getId())
                    .title(track.getName())
                    .views(track.getViews())
                    .duration(track.getDuration())
                    .artistName(track.getArtists().stream()
                            .map(Artist::getName)
                            .collect(Collectors.joining(", ")))
                    .type("track")
                    .build()).toList();

            return ArtistResponse.builder()
                    .id(artist.getId())
                    .name(artist.getName())
                    .popularTracks(trackResponses)
                    .views(totalViews)
                    .build();
        }

        return null;
    }

    public List<HomepageTopItemDTO> getHomePageTopArtists() {
        List<Artist> artists = artistRepo.findRandomArtists(PageRequest.of(0, TOP_ARTIST_LIMIT));
        List<HomepageTopItemDTO> homepageTopItemDTOs = artists.stream().map(artist -> HomepageTopItemDTO.builder()
                .id(artist.getId())
                .title(artist.getName())
                .url(null)
                .type("artist")
                .build()).toList();
        return homepageTopItemDTOs;
    }

    public List<Artist> getArtist(int limit) {
        return artistRepo.findRandomArtists(PageRequest.of(0, limit));
    }
}
