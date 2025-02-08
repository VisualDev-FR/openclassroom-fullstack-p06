package com.openclassrooms.mddapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.mapper.TopicMapper;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.services.SubscriptionService;
import com.openclassrooms.mddapi.services.TopicService;

@RestController
public class TopicController {

    @Autowired
    private TopicService topicService;

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private TopicMapper topicMapper;

    @GetMapping("/api/topic")
    public ResponseEntity<List<TopicDto>> findAll() {

        List<Topic> topics = this.topicService.findAll();

        return ResponseEntity.ok().body(this.topicMapper.toDto(topics));
    }

    @GetMapping("/api/topic/{id}")
    public ResponseEntity<TopicDto> findByID(@PathVariable("id") Long topic_id) {

        Topic topic = this.topicService.findByID(topic_id);

        return ResponseEntity.ok().body(this.topicMapper.toDto(topic));
    }

    @GetMapping("/api/topic/subscribed")
    public ResponseEntity<List<TopicDto>> findTopicBySubscribedUser() {

        List<Topic> topics = this.subscriptionService.findSubscribedTopics();

        return ResponseEntity.ok().body(this.topicMapper.toDto(topics));
    }
}
