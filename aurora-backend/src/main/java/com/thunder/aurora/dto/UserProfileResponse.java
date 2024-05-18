package com.thunder.aurora.dto;

import com.thunder.aurora.entities.Track;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileResponse {
    private String firstName;
    private String lastName;
    private Track lastPlayedTrack;
    private List<String> searches;
    private List<Track> recentTracks;
    private List<UUID> likedTracks;
    private List<UUID> dislikedTracks;
    private String gender;
    private String country;
}
