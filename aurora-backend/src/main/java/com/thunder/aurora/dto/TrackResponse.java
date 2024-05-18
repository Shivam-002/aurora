package com.thunder.aurora.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class TrackResponse {

    private UUID id;
    private String title;
    private long views;
    private long duration;
    private String type;
    private String artistName;
}
