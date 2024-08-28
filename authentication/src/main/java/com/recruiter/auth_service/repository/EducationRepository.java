package com.recruiter.auth_service.repository;


import com.recruiter.auth_service.model.resume.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationRepository extends JpaRepository<Education, Integer> {
    List<Education> findEducationByUserId(Integer userId);
}
