package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.model.Post;

@Component
@Mapper(componentModel = "spring")
public interface PostMapper extends EntityMapper<PostDto, Post> {

    @Override
    @Mapping(source = "topic.id", target = "topic_id")
    @Mapping(source = "author.id", target = "user_id")
    PostDto toDto(Post post);

    @Override
    @Mapping(source = "topic_id", target = "topic.id")
    @Mapping(source = "user_id", target = "author.id")
    Post toEntity(PostDto postDto);
}