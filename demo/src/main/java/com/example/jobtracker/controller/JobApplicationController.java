package com.example.jobtracker.controller;

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.example.jobtracker.service.JobApplicationService;
import com.example.jobtracker.entity.JobApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/api/job-applications")
public class JobApplicationController {
    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    @PostMapping()
    public ResponseEntity<JobApplication> createJobApplication(@Valid @RequestBody JobApplication application) {
        JobApplication saved = service.create(application);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    @GetMapping()
    public List<JobApplication> getAll(){
        return service.getAll();
    }
    @GetMapping("/{id}")
    public JobApplication getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public JobApplication updateApplication(@PathVariable Long id,@Valid @RequestBody JobApplication updatedJobApplication) {
        return service.update(id, updatedJobApplication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
