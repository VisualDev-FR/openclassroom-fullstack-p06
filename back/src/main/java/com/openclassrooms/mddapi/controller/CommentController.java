package com.openclassrooms.mddapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.mapper.CommentMapper;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.payload.Request.CommentCreationRequest;
import com.openclassrooms.mddapi.services.CommentService;

import jakarta.validation.Valid;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private CommentMapper commentMapper;

    @GetMapping("/api/comment")
    public ResponseEntity<List<CommentDto>> findAll() {

        List<Comment> comments = this.commentService.findAll();

        return ResponseEntity.ok().body(this.commentMapper.toDto(comments));
    }

    @GetMapping("/api/comment/{id}")
    public ResponseEntity<CommentDto> findByID(@PathVariable("id") Long comment_id) {

        Comment comments = this.commentService.findById(comment_id);

        return ResponseEntity.ok().body(this.commentMapper.toDto(comments));
    }

    @GetMapping("/api/comment/post/{id}")
    public ResponseEntity<List<CommentDto>> findByPostID(@PathVariable("id") Long post_id) {

        List<Comment> comments = this.commentService.findByPostID(post_id);

        return ResponseEntity.ok().body(this.commentMapper.toDto(comments));
    }

    @PostMapping("/api/comment")
    public ResponseEntity<CommentDto> createComment(@Valid @RequestBody CommentCreationRequest body) {

        Comment comment = this.commentService.createComment(body);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(this.commentMapper.toDto(comment));
    }

}
