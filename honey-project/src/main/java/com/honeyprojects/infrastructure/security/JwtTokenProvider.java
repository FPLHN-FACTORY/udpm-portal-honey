package com.honeyprojects.infrastructure.security;

import com.honeyprojects.infrastructure.contant.SessionConstant;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Component
public class JwtTokenProvider {

    @Value("${identity.secretKey}")
    private String secretKey;

    @Autowired
    private HttpSession httpSession;

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
        String name = claims.get("name", String.class);
        String userName = claims.get("userName", String.class);
        String email = claims.get("email", String.class);
        String id = claims.get("id", String.class);
        String picture = claims.get("picture", String.class);

        Object roleClaim = claims.get("role");

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if (roleClaim instanceof String) {
            authorities.add(new SimpleGrantedAuthority((String) roleClaim));
        } else if (roleClaim instanceof List<?>) {
            List<String> roleList = (List<String>) roleClaim;
            for (String role : roleList) {
                authorities.add(new SimpleGrantedAuthority(role));
            }
        }
        httpSession.setAttribute(SessionConstant.ID_USER, id);
        httpSession.setAttribute(SessionConstant.NAME, name);
        httpSession.setAttribute(SessionConstant.USER_NAME, userName);
        httpSession.setAttribute(SessionConstant.PICTURE, picture);
        httpSession.setAttribute(SessionConstant.EMAIL, email);
        return new UsernamePasswordAuthenticationToken(null, token, authorities);
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
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
