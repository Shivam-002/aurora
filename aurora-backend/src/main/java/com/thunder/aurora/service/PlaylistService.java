package com.thunder.aurora.service;

import org.springframework.stereotype.Service;

import com.thunder.aurora.dto.PlaylistResponse;
import com.thunder.aurora.dto.TrackResponse;
import com.thunder.aurora.entities.Playlist;
import com.thunder.aurora.entities.Track;
import com.thunder.aurora.entities.UserProfile;
import com.thunder.aurora.repos.PlaylistRepo;
import com.thunder.aurora.repos.UserProfileRepo;
import com.thunder.aurora.security.entity.User;
import com.thunder.aurora.security.repository.UserRepo;
import com.thunder.aurora.security.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlaylistService {

    private final UserRepo userRepo;
    private final UserProfileRepo userProfileRepo;

    private final JwtService jwtService;

    private final PlaylistRepo playlistRepo;

    private static final String LIKED_PLAYLIST_NAME = "Liked";

    public void createLikedPlaylist(UserProfile userProfile) {

        Playlist likedPlaylist = Playlist.builder()
                .name(LIKED_PLAYLIST_NAME)
                .tracks(null)
                .userProfile(userProfile)
                .build();

        playlistRepo.save(likedPlaylist);

    }

    public void createPlaylist(String token, String name) {

        User user = userRepo.findByEmail(jwtService.extractUsername(token)).get();

        UserProfile userProfile = userProfileRepo.findByUser(user);

        Playlist playlist = Playlist.builder()
                .name(name)
                .tracks(null)
                .userProfile(userProfile)
                .build();

        playlistRepo.save(playlist);
    }

    public PlaylistResponse findPlaylistById(UUID id) {

        Playlist playlist = playlistRepo.findById(id).orElse(null);

        if (playlist == null) {
            return null;
        }

        return PlaylistResponse.builder()
                .id(playlist.getId())
                .name(playlist.getName())
                .tracks(playlist.getTracks())
                .build();
    }

    public List<Playlist> findPlaylistByUserProfile(UserProfile userProfile) {
        return playlistRepo.findByUserProfile(userProfile);
    }

    public Playlist getLikedPlaylist() {

        Playlist likedPlaylist = playlistRepo.findByName(LIKED_PLAYLIST_NAME);

        return likedPlaylist;
    }

    public void likeTrack(Track track) {

        Playlist likedPlaylist = getLikedPlaylist();

        List<Track> tracks = likedPlaylist.getTracks();

        tracks.add(track);

        likedPlaylist.setTracks(tracks);

        playlistRepo.save(likedPlaylist);
    }

    public void unlikeTrack(Track track) {

        Playlist likedPlaylist = getLikedPlaylist();

        List<Track> tracks = likedPlaylist.getTracks();

        tracks.remove(track);

        likedPlaylist.setTracks(tracks);

        playlistRepo.save(likedPlaylist);
    }

    public List<UUID> getLikedPlaylistTracks() {

        Playlist likedPlaylist = getLikedPlaylist();

        List<Track> tracks = likedPlaylist.getTracks();

        return tracks.stream().map(Track::getId).toList();
    }

    public TrackResponse getATrack(UUID id) {
        Playlist playlist = playlistRepo.findById(id).orElse(null);
        if (playlist == null || playlist.getTracks().isEmpty()) {
            return null;
        }
        Track track = playlist.getTracks().get(0);
        return TrackResponse.builder()
                .id(track.getId())
                .title(track.getName())
                .build();
    }

}
