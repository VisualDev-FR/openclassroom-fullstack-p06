package com.openclassrooms.mddapi.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.Exceptions.DuplicateSubscriptionException;
import com.openclassrooms.mddapi.Exceptions.ResourceNotFoundException;
import com.openclassrooms.mddapi.model.Subscription;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private TopicService topicService;

    public List<Subscription> findByTopicID(Long topic_id) {
        return this.subscriptionRepository.findByTopicId(topic_id);
    }

    public List<Subscription> findByUserID() {

        User currentUser = this.userService.getCurrentUser();

        return this.subscriptionRepository.findByUserId(currentUser.getId());
    }

    public Subscription find(Long topic_id, Long user_id) {
        return this.subscriptionRepository
                .findByTopicIdAndUserId(topic_id, user_id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Can't find subscription with topic_id: " + topic_id + " and user_id: " + user_id));
    }

    public Subscription create(Long topic_id) {

        Topic topic = this.topicService.findByID(topic_id);
        User currentUser = this.userService.getCurrentUser();
        Long user_id = currentUser.getId();

        if (this.exists(topic_id, user_id)) {
            throw new DuplicateSubscriptionException(user_id, topic_id);
        }

        Subscription subscription = new Subscription();

        subscription.setTopic(topic);
        subscription.setUser(currentUser);

        return this.subscriptionRepository.save(subscription);
    }

    public void delete(Long topic_id) {

        Topic topic = this.topicService.findByID(topic_id);
        User currentUser = this.userService.getCurrentUser();

        Subscription subscription = this.find(topic.getId(), currentUser.getId());

        this.subscriptionRepository.delete(subscription);
    }

    public Boolean exists(Long topic_id, Long user_id) {

        return this.subscriptionRepository
                .findByTopicIdAndUserId(topic_id, user_id)
                .isPresent();
    }

    public List<Topic> findSubscribedTopics() {
        return this.findByUserID()
                .stream()
                .map(Subscription::getTopic)
                .collect(Collectors.toList());
    }

}
