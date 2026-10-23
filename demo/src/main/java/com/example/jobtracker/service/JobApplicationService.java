package com.example.jobtracker.service;

import org.springframework.stereotype.Service;
import com.example.jobtracker.repository.JobApplicationRepository;
import com.example.jobtracker.entity.JobApplication;
import java.util.List;
//import java.lang.RuntimeException;
import com.example.jobtracker.exception.ApplicationNotFoundException;

@Service
public class JobApplicationService {
    private final JobApplicationRepository repository;

    public JobApplicationService(JobApplicationRepository repository) {
        this.repository = repository;
    }

    public JobApplication create(JobApplication application) {
        if (application.getStatus() == null || application.getStatus().isEmpty()){
            application.setStatus("Applied");

        }
        return repository.save(application);
    }

    public List<JobApplication> getAll(){
        return repository.findAll();
    }
    public JobApplication getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ApplicationNotFoundException(id));
    }

    public JobApplication update(Long id, JobApplication updatedApplication) {
        JobApplication existingApplication = repository.findById(id).orElseThrow(() -> new ApplicationNotFoundException(id));
        existingApplication.setCompanyName(updatedApplication.getCompanyName());
        existingApplication.setPosition(updatedApplication.getPosition());
        existingApplication.setApplicationDate(updatedApplication.getApplicationDate());
        existingApplication.setStatus(updatedApplication.getStatus());
        return repository.save(existingApplication);

    }

    public void delete(Long id) {
        JobApplication existingApplication = repository.findById(id).orElseThrow(() -> new ApplicationNotFoundException(id));
        repository.delete(existingApplication);
    }
}