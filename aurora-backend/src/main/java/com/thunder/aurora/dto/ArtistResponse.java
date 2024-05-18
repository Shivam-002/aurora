package com.thunder.aurora.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ArtistResponse {

    private UUID id;
    private String name;
    private long views;
    private List<TrackResponse> popularTracks;
}
