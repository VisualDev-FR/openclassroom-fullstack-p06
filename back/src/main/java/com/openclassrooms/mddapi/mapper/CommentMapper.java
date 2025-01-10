package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.model.Comment;

@Component
@Mapper(componentModel = "spring")
public interface CommentMapper extends EntityMapper<CommentDto, Comment> {

    @Override
    @Mapping(source = "post.id", target = "post_id")
    @Mapping(source = "author.id", target = "user_id")
    CommentDto toDto(Comment comment);

    @Override
    @Mapping(source = "post_id", target = "post.id")
    @Mapping(source = "user_id", target = "author.id")
    Comment toEntity(CommentDto commentDto);
}