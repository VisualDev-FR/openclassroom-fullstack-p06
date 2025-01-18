package com.openclassrooms.mddapi.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.payload.Request.CommentCreationRequest;
import com.openclassrooms.mddapi.repository.CommentRepository;

import lombok.Data;

@Data
@Service
public class CommentService {

    @Autowired
    public CommentRepository commentRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    public List<Comment> findByPostID(Long post_id) {
        return commentRepository.findByPostId(post_id);
    }

    public Comment createComment(CommentCreationRequest dto) {

        Post post = this.postService.findByID(dto.getPost_id());
        User currentUser = this.userService.getCurrentUser();

        Comment comment = new Comment();

        comment.setAuthor(currentUser);
        comment.setContent(dto.getContent());
        comment.setPost(post);

        return this.commentRepository.save(comment);
    }

}
