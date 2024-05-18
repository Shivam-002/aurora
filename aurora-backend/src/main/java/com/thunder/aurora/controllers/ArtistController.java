package com.thunder.aurora.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.thunder.aurora.dto.ArtistResponse;
import com.thunder.aurora.dto.HomepageTopItemDTO;
import com.thunder.aurora.entities.Artist;
import com.thunder.aurora.service.ArtistService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/artist")
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistService artistService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Artist>> getAllArtist() {
        return ResponseEntity.ok(artistService.getAllArtists());
    }

    @GetMapping("/get-by-id")
    public ResponseEntity<ArtistResponse> getArtistById(@RequestParam(value = "id") UUID id) {
        return ResponseEntity.ok(artistService.getArtistById(id));
    }

    @GetMapping("/get-top-artist")
    public ResponseEntity<List<HomepageTopItemDTO>> getTopArtist() {
        return ResponseEntity.ok(artistService.getHomePageTopArtists());
    }
}
