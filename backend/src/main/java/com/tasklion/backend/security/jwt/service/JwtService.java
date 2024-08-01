package com.tasklion.backend.security.jwt.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;
import java.util.function.Function;

public interface JwtService {

    String extractUsername(String token);
    String extractCurrentRole(String token);
    Claims extractAllClaims(String token);
    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);

    String generateJwt(UserDetails userDetails);
    String generateJwt(UserDetails userDetails, Map<String, Object> extraClaims);
    String generateRefreshToken(UserDetails userDetails);
    String generateRefreshToken(UserDetails userDetails, Map<String, Object> extraClaims);

    boolean isTokenValid(String token, UserDetails userDetails);
    boolean isTokenExpired(String token);

}
