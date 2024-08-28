package com.recruiter.auth_service.repository;

import com.recruiter.auth_service.model.Role;
import com.recruiter.auth_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User findByEmail(String name);

    List<User> findByRole(Role role);

    @Query("SELECT u FROM User u WHERE u.id IN :userIds")
    List<User> findByUserIds(@Param("userIds") List<Integer> userIds);
}
