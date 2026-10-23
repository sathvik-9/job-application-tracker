package com.example.jobtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.jobtracker.entity.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    
}
