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
public class HomepageTopItemDTO {
    private String title;
    private String url;
    private String type;
    private UUID id;
}
