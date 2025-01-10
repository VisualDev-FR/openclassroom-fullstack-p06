package com.openclassrooms.mddapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.repository.CommentRepository;

import lombok.Data;

@Data
@Service
public class CommentService {

    @Autowired
    public CommentRepository commentRepository;

    public List<Comment> findAll() {
        return commentRepository.findAll();
    }
}
