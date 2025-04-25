package com.karan.firstJobApp.Job.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Job job;


    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference(value = "user-applications")
    private Users users;


    private LocalDateTime appliedDate;

    private String status; // PENDING, CONFIRMED, REJECTED

    private String coverLetter;

    private String resumeUrl;

    public JobApplication() {
    }

    public JobApplication(Job job, Users users, String coverLetter, String resumeUrl) {
        this.job = job;
        this.users = users;
        this.coverLetter = coverLetter;
        this.resumeUrl = resumeUrl;
        this.appliedDate = LocalDateTime.now();
        this.status = "PENDING";
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public Users getUser() {
        return users;
    }

    public void setUser(Users users) {
        this.users = users;
    }

    public LocalDateTime getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDateTime appliedDate) {
        this.appliedDate = appliedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }
}