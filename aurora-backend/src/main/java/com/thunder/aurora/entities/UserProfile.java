package com.thunder.aurora.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thunder.aurora.security.entity.User;
import com.thunder.aurora.security.pojos.request.Country;
import com.thunder.aurora.security.pojos.request.Gender;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Data
@Table(name = "user_profile")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @OneToOne
    @JoinColumn(name = "last_played_track_id", referencedColumnName = "id", nullable = true, updatable = true)
    private Track lastPlayedTrack;

    private List<String> searches;

    @ManyToMany
    @JoinTable(name = "user_recent_tracks", joinColumns = @JoinColumn(name = "user_profile_id"), inverseJoinColumns = @JoinColumn(name = "track_id"))
    private List<Track> recentTracks;

    @ManyToMany
    @JoinTable(name = "aritst_follower_mapping", joinColumns = @JoinColumn(name = "user_profile_id"), inverseJoinColumns = @JoinColumn(name = "artist_id"))
    private List<Artist> followedArtists;

    @ManyToMany
    @JoinTable(name = "like_track", joinColumns = @JoinColumn(name = "user_profile_id"), inverseJoinColumns = @JoinColumn(name = "track_id"))
    private List<Track> likedTracks;

    @ManyToMany
    @JoinTable(name = "dislike_track", joinColumns = @JoinColumn(name = "user_profile_id"), inverseJoinColumns = @JoinColumn(name = "track_id"))
    private List<Track> dislikedTracks;

    @Column(name = "gender")
    private Gender gender;

    @Column(name = "country")
    private Country country;

    @OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL)
    private List<Playlist> playlists;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, updatable = false)
    @JsonIgnore
    private User user;
}
