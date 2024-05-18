package com.thunder.aurora.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "track")
public class Track {

    @Id
    @Column(name = "id", unique = true, nullable = false)
    private UUID id;

    @Column(name = "duration", nullable = false)
    private long duration;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "views")
    private long views;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "track_artist", joinColumns = @JoinColumn(name = "track_id"), inverseJoinColumns = @JoinColumn(name = "artist_id"))
    private List<Artist> artists;

}
