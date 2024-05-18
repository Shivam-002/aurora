package com.thunder.aurora.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thunder.aurora.dto.HomepageTopItemDTO;
import com.thunder.aurora.entities.Track;
import com.thunder.aurora.service.TrackService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/track")
@RequiredArgsConstructor
public class TrackController {

    private final TrackService trackService;

    @GetMapping("/get-by-id")
    public ResponseEntity<Track> getTrackById(@RequestParam("id") UUID id) {
        return ResponseEntity.ok(trackService.getTrackById(id));
    }

    @GetMapping("/get-top-tracks")
    public ResponseEntity<List<HomepageTopItemDTO>> getTopTracks() {
        return ResponseEntity.ok(trackService.getHomePageTopTracks());
    }

    @PostMapping("/unlike")
    public void unlikeTrack(@RequestHeader(name = "Authorization") String token, @RequestParam("id") UUID trackId) {
        trackService.unlikeTrack(token, trackId);
    }

    @PostMapping("/like")
    public void likeTrack(@RequestHeader(name = "Authorization") String token, @RequestParam("id") UUID trackId) {
        trackService.likeTrack(token, trackId);
    }
}