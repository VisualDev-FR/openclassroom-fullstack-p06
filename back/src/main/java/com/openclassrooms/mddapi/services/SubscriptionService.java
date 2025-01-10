package com.openclassrooms.mddapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Subscription;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserService userService;

    public List<Subscription> findByTopicID(Long topic_id) {
        return this.subscriptionRepository.findByTopicId(topic_id);
    }

    public List<Subscription> findByUserID() {

        User currentUser = this.userService.getCurrentUser();

        return this.subscriptionRepository.findByUserId(currentUser.getId());
    }
}
