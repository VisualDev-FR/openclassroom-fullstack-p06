package com.openclassrooms.mddapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    public List<Comment> findByPostId(Long post_id);
}
