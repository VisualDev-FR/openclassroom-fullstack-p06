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
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.payload.Request.PostCreationRequest;
import com.openclassrooms.mddapi.services.PostService;
import com.openclassrooms.mddapi.services.TopicService;
import com.openclassrooms.mddapi.services.UserService;

import jakarta.validation.Valid;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private TopicService topicService;

    @GetMapping("/api/post")
    public ResponseEntity<List<PostDto>> findAll() {

        List<Post> posts = this.postService.findAll();

        return ResponseEntity.ok().body(this.postMapper.toDto(posts));
    }

    @GetMapping("/api/post/topic/{id}")
    public ResponseEntity<List<PostDto>> findByTopicID(@PathVariable("id") Long topic_id) {

        List<Post> posts = this.postService.findByTopicID(topic_id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.postMapper.toDto(posts));
    }

    @PostMapping("/api/post")
    public ResponseEntity<PostDto> create(@Valid @RequestBody PostCreationRequest body) {

        User currentUser = this.userService.getCurrentUser();
        Topic topic = this.topicService.findByID(body.getTopic_id());

        Post post = new Post();

        post.setTitle(body.getTitle());
        post.setDescription(body.getDescription());
        post.setAuthor(currentUser);
        post.setTopic(topic);

        post = postService.create(post);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(this.postMapper.toDto(post));
    }
}
