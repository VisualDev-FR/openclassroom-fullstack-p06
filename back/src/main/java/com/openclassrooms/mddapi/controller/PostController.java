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

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.mapper.PostMapper;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.payload.Request.PostCreationRequest;
import com.openclassrooms.mddapi.services.PostService;

import jakarta.validation.Valid;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostMapper postMapper;

    @GetMapping("/api/post")
    public ResponseEntity<List<PostDto>> findAll() {

        List<Post> posts = this.postService.findAll();

        return ResponseEntity.ok().body(this.postMapper.toDto(posts));
    }

    @GetMapping("/api/post/{id}")
    public ResponseEntity<PostDto> findByID(@PathVariable("id") Long post_id) {

        Post post = this.postService.findByID(post_id);

        return ResponseEntity.ok().body(this.postMapper.toDto(post));
    }

    @PostMapping("/api/post")
    public ResponseEntity<PostDto> create(@Valid @RequestBody PostCreationRequest body) {

        Post post = postService.create(body);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(this.postMapper.toDto(post));
    }
}
