package com.tasklion.backend.service.impl;

import com.tasklion.backend.config.SecurityPropertyConfig;
import com.tasklion.backend.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    private final SecurityPropertyConfig securityPropertyConfig;

    private SecurityPropertyConfig.Jwt jwt() {
        return securityPropertyConfig.getJwt();
    }

    @Override
    public String extractUsername(String token) {
        return extractClaim(token, claims -> claims.get("username", String.class));
    }

    @Override
    public Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    @Override
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    @Override
    public String generateToken(UserDetails userDetails) {
        return generateToken(userDetails, new HashMap<>());
    }

    @Override
    public String generateToken(UserDetails userDetails, Map<String, Object> claims) {
        claims.put("username", userDetails.getUsername());
        claims.put("roles", userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList())
        );
        return buildToken(claims, jwt().getSubject(), jwt().getExpirationInMs());
    }

    @Override
    public String generateRefreshToken(UserDetails userDetails) {
        SecurityPropertyConfig.RefreshToken refreshToken = jwt().getRefreshToken();
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("username", userDetails.getUsername());
        return buildToken(claims, refreshToken.getSubject(), refreshToken.getExpirationInMs());
    }

    private String buildToken(Map<String, Object> claims, String subject, long expiration) {
        return Jwts
                .builder()
                .issuer(jwt().getIssuer())
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey())
                .compact();
    }

    @Override
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    @Override
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwt().getSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
