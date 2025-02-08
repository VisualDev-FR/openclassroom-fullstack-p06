package com.openclassrooms.mddapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.Exceptions.ResourceNotFoundException;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.payload.Request.PostCreationRequest;
import com.openclassrooms.mddapi.repository.PostRepository;

import lombok.Data;

@Data
@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private TopicService topicService;

    @Autowired
    private SubscriptionService subscriptionService;

    public List<Post> findAll() {

        List<Topic> subscribedTopics = this.subscriptionService.findSubscribedTopics();

        return this.postRepository.findByTopicIn(subscribedTopics);
    }

    public Post findByID(Long post_id) {
        return postRepository
                .findById(post_id)
                .orElseThrow(() -> new ResourceNotFoundException("Can't find post with id: " + post_id));
    }

    public List<Post> findByTopicID(Long id) {
        return postRepository.findByTopicId(id);
    }

    public Post create(PostCreationRequest postCreationRequest) {

        User currentUser = this.userService.getCurrentUser();
        Topic topic = this.topicService.findByID(postCreationRequest.getTopic_id());

        Post post = new Post();

        post.setTitle(postCreationRequest.getTitle());
        post.setDescription(postCreationRequest.getDescription());
        post.setAuthor(currentUser);
        post.setTopic(topic);

        return postRepository.save(post);
    }
}
