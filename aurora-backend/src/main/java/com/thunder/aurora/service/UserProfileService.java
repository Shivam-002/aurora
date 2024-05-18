package com.thunder.aurora.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.thunder.aurora.dto.HomeLibraryItemDTO;
import com.thunder.aurora.dto.UserProfileResponse;
import com.thunder.aurora.entities.Artist;
import com.thunder.aurora.entities.Playlist;
import com.thunder.aurora.entities.Track;
import com.thunder.aurora.entities.UserProfile;
import com.thunder.aurora.repos.UserProfileRepo;
import com.thunder.aurora.security.entity.User;
import com.thunder.aurora.security.pojos.request.UserProfileRequest;
import com.thunder.aurora.security.repository.UserRepo;
import com.thunder.aurora.security.service.JwtService;

import lombok.RequiredArgsConstructor;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserProfileRepo userProfileRepo;
    private final PlaylistService playlistService;
    private final ArtistService artistService;
    private final TrackService trackService;

    private static final Integer MAX_LIBRARY_SIZE = 5;
    private static final Integer MAX_RECENT_TRACKS = 10;

    private final JwtService jwtService;
    private final UserRepo userRepo;

    public void createUserProfile(UserProfileRequest req) {
        UserProfile userProfile = UserProfile.builder()
                .lastPlayedTrack(null)
                .searches(null)
                .recentTracks(null)
                .gender(req.getGender())
                .country(req.getCountry())
                .user(req.getUser())
                .build();

        UserProfile savedUserProfile = userProfileRepo.save(userProfile);

        playlistService.createLikedPlaylist(savedUserProfile);
    }

    public void updateRecentTracks(String token, List<UUID> trackIds) {
        User user = userRepo.findByEmail(jwtService.extractUsername(token)).get();

        UserProfile userProfile = userProfileRepo.findByUser(user);

        List<Track> tracks = trackIds.stream().map((trackId) -> {
            Track track = trackService.getTrackById(trackId);
            return track;
        }).toList();

        userProfile.setRecentTracks(tracks.subList(0, Math.min(tracks.size(), MAX_RECENT_TRACKS)));

        userProfileRepo.save(userProfile);

    }

    public UserProfile findByUser(User user) {
        return userProfileRepo.findByUser(user);
    }

    public UserProfileResponse getUserProfile(String token) {
        User user = userRepo.findByEmail(jwtService.extractUsername(token)).get();

        UserProfile userProfile = userProfileRepo.findByUser(user);

        UserProfileResponse userProfileResponse = UserProfileResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .lastPlayedTrack(userProfile.getLastPlayedTrack())
                .searches(userProfile.getSearches() == null ? userProfile.getSearches() : new ArrayList<>())
                .recentTracks(userProfile.getRecentTracks() == null ? userProfile.getRecentTracks() : new ArrayList<>())
                .likedTracks(userProfile.getLikedTracks().stream().map(Track::getId).toList())
                .dislikedTracks(userProfile.getDislikedTracks().stream().map(Track::getId).toList())
                .gender(userProfile.getGender().toString())
                .country(userProfile.getCountry().toString())
                .build();

        return userProfileResponse;
    }

    public List<Playlist> getUserPlaylists(String token) {

        Optional<User> optionalUser = userRepo.findByEmail(jwtService.extractUsername(token));

        if (optionalUser.isPresent()) {
            UserProfile userProfile = userProfileRepo.findByUser(optionalUser.get());

            return playlistService.findPlaylistByUserProfile(userProfile);
        }

        else {
            // TODO : Better handle exception
            throw new RuntimeException("User not found");
        }
    }

    public List<HomeLibraryItemDTO> getHomeLibrary(String token) {

        List<HomeLibraryItemDTO> libs = new ArrayList<>();
        List<Playlist> playlists = getUserPlaylists(token);
        List<Artist> artists = new ArrayList<>();

        if (playlists.size() < MAX_LIBRARY_SIZE) {
            artists = artistService.getArtist(MAX_LIBRARY_SIZE - playlists.size());
        }

        playlists.stream().map((playlist) -> HomeLibraryItemDTO.builder()
                .id(playlist.getId())
                .title(playlist.getName())
                .song_count(playlist.getTracks().size())
                .type("playlist")
                .build()).forEach(libs::add);

        // TODO : Count Artist Songs
        artists.stream().map((artist) -> HomeLibraryItemDTO.builder()
                .id(artist.getId())
                .title(artist.getName())
                .song_count(0)
                .type("artist")
                .build()).forEach(libs::add);
        return libs;
    }

}
