package com.openclassrooms.mddapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.PostRepository;

import lombok.Data;

@Data
@Service
public class PostService {

    @Autowired
    public PostRepository postRepository;

    public List<Post> findAll() {
        return postRepository.findAll();
    }

    public List<Post> findByTopicID(Long id) {
        return postRepository.findByTopicId(id);
    }

    public Post create(Post post) {
        return postRepository.save(post);
    }
}
