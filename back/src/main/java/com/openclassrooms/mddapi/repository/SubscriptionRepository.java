package com.openclassrooms.mddapi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Subscription;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    public List<Subscription> findByTopicId(Long topicId);

    public List<Subscription> findByUserId(Long userId);

    public Optional<Subscription> findByTopicIdAndUserId(Long topicId, Long userId);
}
