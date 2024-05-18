package com.thunder.aurora.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thunder.aurora.entities.Playlist;
import com.thunder.aurora.entities.UserProfile;

import java.util.List;
import java.util.UUID;


@Repository
public interface PlaylistRepo extends JpaRepository<Playlist, UUID> {

    public List<Playlist> findByUserProfile(UserProfile userProfile);
    public Playlist findByName(String name);
}
