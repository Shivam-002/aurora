package com.thunder.aurora.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thunder.aurora.entities.UserProfile;
import com.thunder.aurora.security.entity.User;
import java.util.UUID;

@Repository
public interface UserProfileRepo extends JpaRepository<UserProfile, UUID> {
    public UserProfile findByUser(User user);


    

}
