package com.openclassrooms.mddapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.model.Post;

public interface PostRepository extends JpaRepository<Post, Long>{

    public List<Post> findByTopicId(Long topicId);
}
