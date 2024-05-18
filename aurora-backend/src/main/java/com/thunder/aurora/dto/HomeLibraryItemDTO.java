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
public class HomeLibraryItemDTO {
    
    private UUID id;
    private String title;
    private String type;
    private long song_count;

    //TODO : Playlist / Artist URL
}
