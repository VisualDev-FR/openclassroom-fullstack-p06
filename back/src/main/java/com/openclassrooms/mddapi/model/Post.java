package com.openclassrooms.mddapi.model;

import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Post {

    public static final int TITLE_MAX_SIZE = 255;

    public static final int DESC_MAX_SIZE = 1024;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne
    @JoinColumn(nullable = false, name = "topic_id", referencedColumnName = "id")
    public Topic topic;

    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id", referencedColumnName = "id")
    public User author;

    @Column(nullable = false, length = TITLE_MAX_SIZE)
    public String title;

    @Column(nullable = false, length = DESC_MAX_SIZE)
    public String description;

    @CreationTimestamp
    @Column(updatable = false)
    public Date created_at;

}
