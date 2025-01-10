package com.openclassrooms.mddapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.openclassrooms.mddapi.model.Subscription;


public interface SubscriptionRepository extends JpaRepository<Subscription, Long>{

    public List<Subscription> findByTopicId(Long topicId);

    public List<Subscription> findByUserId(Long userId);
}
