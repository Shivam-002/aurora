package com.thunder.aurora.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thunder.aurora.dto.HomeLibraryItemDTO;
import com.thunder.aurora.dto.UserProfileResponse;
import com.thunder.aurora.service.UserProfileService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/user_profile/")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping("/get-user-profile")
    public ResponseEntity<UserProfileResponse> getUserProfile(@RequestHeader(name = "Authorization") String token) {
        return ResponseEntity.ok(userProfileService.getUserProfile(token));
    }

    @GetMapping("/get-home-library")
    public ResponseEntity<List<HomeLibraryItemDTO>> getHomeLibrary(
            @RequestHeader(name = "Authorization") String token) {
        return ResponseEntity.ok(userProfileService.getHomeLibrary(token));
    }

    @PostMapping("/update-recent-tracks")
    public void updateRecentTracks(@RequestHeader(name = "Authorization") String token,
            @RequestBody List<UUID> trackIds) {
        userProfileService.updateRecentTracks(token, trackIds);
    }
}
