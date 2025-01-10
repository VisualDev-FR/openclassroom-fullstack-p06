package com.openclassrooms.mddapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.mapper.PostMapper;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.services.PostService;

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

    @GetMapping("/api/post/topic/{id}")
    public ResponseEntity<List<PostDto>> findByTopicID(@PathVariable("id") Long topic_id) {

        List<Post> posts = this.postService.findByTopicId(topic_id);

        return ResponseEntity.ok().body(this.postMapper.toDto(posts));
    }
}
