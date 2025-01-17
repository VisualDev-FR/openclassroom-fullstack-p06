package com.openclassrooms.mddapi.model;

import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Topic {

    public static final int TITLE_MAX_SIZE = 255;

    public static final int DESC_MAX_SIZE = 1024;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    @Column(nullable = false, length = TITLE_MAX_SIZE)
    public String title;

    @Column(nullable = false, length = DESC_MAX_SIZE)
    public String description;

    @CreationTimestamp
    @Column(updatable = false)
    private Date created_at;
}
