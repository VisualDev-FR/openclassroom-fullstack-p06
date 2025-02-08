package com.openclassrooms.mddapi;

public class Exceptions {

    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }

    public static class DuplicateUserException extends RuntimeException {
        public DuplicateUserException(String email) {
            super(String.format("User with email '%s' already exists.", email));
        }
    }

    public static class DuplicateSubscriptionException extends RuntimeException {
        public DuplicateSubscriptionException(Long user_id, Long topic_id) {
            super(String.format("User '%s' already subscribed to topic '%s'", user_id, topic_id));
        }
    }
}
