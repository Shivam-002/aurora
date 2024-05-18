package com.thunder.aurora.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.thunder.aurora.dto.HomepageTopItemDTO;
import com.thunder.aurora.entities.Track;
import com.thunder.aurora.entities.UserProfile;
import com.thunder.aurora.repos.TrackRepo;
import com.thunder.aurora.repos.UserProfileRepo;
import com.thunder.aurora.security.entity.User;
import com.thunder.aurora.security.repository.UserRepo;
import com.thunder.aurora.security.service.JwtService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TrackService {

    private final int TOP_TRACK_LIMIT = 10;

    private final TrackRepo trackRepo;
    private final UserProfileRepo userProfileRepo;
    private final UserRepo userRepo;
    private final JwtService jwtService;

    public Track getTrackById(UUID id) {
        return trackRepo.findById(id).orElse(null);
    }

    public List<HomepageTopItemDTO> getHomePageTopTracks() {
        List<Track> tracks = trackRepo.findRandomTracks(PageRequest.of(0, TOP_TRACK_LIMIT));
        List<HomepageTopItemDTO> homepageTopItemDTOs = tracks.stream().map(track -> HomepageTopItemDTO.builder()
                .id(track.getId())
                .title(track.getName())
                .url(null)
                .type("track")
                .build()).toList();

        return homepageTopItemDTOs;
    }

    public void likeTrack(String token, UUID trackId) {
        Optional<User> optionalUser = userRepo.findByEmail(jwtService.extractUsername(token));

        if (optionalUser.isPresent()) {
            UserProfile userProfile = userProfileRepo.findByUser(optionalUser.get());

            // TODO : Add If not exist
            List<Track> likedTracks = userProfile.getLikedTracks();
            if (likedTracks.stream().noneMatch(track -> track.getId().equals(trackId))) {
                likedTracks.add(trackRepo.findById(trackId).orElseThrow());
            }

            userProfile.setLikedTracks(likedTracks);
            userProfileRepo.save(userProfile);
        }

        else {
            // TODO : Better handle exception
            throw new RuntimeException("Unable to find user profile for the given token!");
        }
    }

    public void unlikeTrack(String token, UUID trackId) {

        Optional<User> optionalUser = userRepo.findByEmail(jwtService.extractUsername(token));

        if (optionalUser.isPresent()) {
            UserProfile userProfile = userProfileRepo.findByUser(optionalUser.get());

            List<Track> likedTracks = userProfile.getLikedTracks();
            likedTracks.removeIf(track -> track.getId().equals(trackId));

            userProfile.setLikedTracks(likedTracks);
            userProfileRepo.save(userProfile);
        }

        else {
            // TODO : Better handle exception
            throw new RuntimeException("Unable to find user profile for the given token!");
        }
    }


    

}
