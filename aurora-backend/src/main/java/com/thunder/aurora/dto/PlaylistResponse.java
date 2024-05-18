package com.thunder.aurora.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.thunder.aurora.entities.Track;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PlaylistResponse {

    private UUID id;
    private String name;
    private List<Track> tracks;

}
