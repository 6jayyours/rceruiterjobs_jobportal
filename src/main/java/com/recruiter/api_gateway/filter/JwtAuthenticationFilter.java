package com.recruiter.api_gateway.filter;

import com.recruiter.api_gateway.util.JwtUtil;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {

    private final RouteValidator validator;
    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(RouteValidator validator, JwtUtil jwtUtil) {
        super(Config.class);
        this.validator = validator;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request=null;
            if(validator.isSecured.test(exchange.getRequest())) {
                if(!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("missing authorization header");
                }

                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                if(authHeader != null && authHeader.startsWith("Bearer ")){
                    authHeader= authHeader.substring(7);
                }
                try{
                    jwtUtil.validateToken(authHeader);
                    request=exchange.getRequest()
                            .mutate()
                            .header("userName", jwtUtil.extractUsername(authHeader))
                            .header("role", jwtUtil.extractRole(authHeader))
                            .header("userId" , jwtUtil.extractUserId(authHeader))
                            .build();
                }catch (Exception e){
                    System.out.println("invalid access token....!");
                    throw new RuntimeException("un authorized access to application");
                }
            }
            return chain.filter(exchange.mutate().request(request).build());
        });
    }



    public static class Config{
    }
}
