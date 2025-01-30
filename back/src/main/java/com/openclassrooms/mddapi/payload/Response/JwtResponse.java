package com.openclassrooms.mddapi.payload.Response;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
  private Long id;
  private String token;
  private String email;
  private String username;
  private Date Expiration;
}
