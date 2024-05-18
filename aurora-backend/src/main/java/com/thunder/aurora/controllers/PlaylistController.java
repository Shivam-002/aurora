package com.thunder.aurora.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.thunder.aurora.dto.PlaylistResponse;
import com.thunder.aurora.dto.TrackResponse;
import com.thunder.aurora.entities.Playlist;
import com.thunder.aurora.entities.Track;
import com.thunder.aurora.service.PlaylistService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("api/v1/playlist")
@RequiredArgsConstructor
@Slf4j
public class PlaylistController {

    private final PlaylistService playlistService;

    @PostMapping("/create")
    public void createPlaylist(@RequestHeader("Authorization") String token,@RequestParam String name) {
        log.info("Creating playlist with name: {}", name);
        playlistService.createPlaylist(token,name);
    }

    @GetMapping("/get-by-id")
    public PlaylistResponse getPlaylistById(@RequestParam UUID id) {
        return playlistService.findPlaylistById(id);
    }

    @GetMapping("/liked-playlist-tracks")
    public List<UUID> getLikedPlaylistTracks() {
        return playlistService.getLikedPlaylistTracks();
    }

    @GetMapping("/liked-playlist")
    public Playlist getLikedPlaylist() {
        return playlistService.getLikedPlaylist();
    }

    @GetMapping("/get-a-track")
    public TrackResponse getATrack(@RequestParam("id") UUID id) {
        return playlistService.getATrack(id);
    }
}
