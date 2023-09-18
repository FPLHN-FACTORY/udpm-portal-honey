package com.honeyprojects.infrastructure.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${identity.secretKey}")
    private String secretKey;

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        String role = claims.get("role", String.class);
        String name = claims.get("name", String.class);
        String userName = claims.get("userName", String.class);
        String email = claims.get("email", String.class);

        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);
//        User principal = new User();
//        principal.setId(UUID.fromString(idUser));
//        principal.setPhoneNumber(phoneNumber);
//        principal.setGender(gender);
//        principal.setAddress(address);
//        principal.setEmail(email);
//        principal.setFullName(fullName);
//        principal.setRole(Role.valueOf(authority.getAuthority()));
        return new UsernamePasswordAuthenticationToken(null, token, Collections.singletonList(authority));
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);

            Date expirationDate = claims.getBody().getExpiration();
            if (expirationDate.before(new Date())) {
                return false;
            }

            return true;
        } catch (JwtException | IllegalArgumentException e) {
            e.printStackTrace();
            return false;
        }
    }
}
