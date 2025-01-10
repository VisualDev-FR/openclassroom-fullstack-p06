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
public class Comment {

    public static final int DESC_MAX_SIZE = 1024;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne
    @JoinColumn(nullable = false, name = "post_id", referencedColumnName = "id")
    public Post post;

    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id", referencedColumnName = "id")
    public User author;

    @Column(nullable = false, length = DESC_MAX_SIZE)
    public String content;

    @CreationTimestamp
    @Column(updatable = false)
    public Date created_at;

}
