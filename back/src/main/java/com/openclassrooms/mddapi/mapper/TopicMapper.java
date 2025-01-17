package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.model.Topic;

@Component
@Mapper(componentModel = "spring")
public interface TopicMapper extends EntityMapper<TopicDto, Topic> {

}
