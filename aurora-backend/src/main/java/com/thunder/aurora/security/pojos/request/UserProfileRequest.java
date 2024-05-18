package com.thunder.aurora.security.pojos.request;

import com.thunder.aurora.security.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserProfileRequest {
    private Gender gender;
    private Country country;
    private User user;
}
