package com.karan.firstJobApp.Job.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class OpenToWork {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;

    @ElementCollection
    private List<String> location = new ArrayList<>();

    @ElementCollection
    private List<String> jobtypes = new ArrayList<>();

    @ElementCollection
    private List<String> notes = new ArrayList<>();

    private String status;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    private String resumeUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public OpenToWork() {
    }

    public OpenToWork(int id, String name, String description, List<String> location, List<String> jobtypes, List<String> notes, String status, Date created, String resumeUrl, Users user) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.jobtypes = jobtypes;
        this.notes = notes;
        this.status = status;
        this.created = created;
        this.resumeUrl = resumeUrl;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getLocation() {
        return location;
    }

    public void setLocation(List<String> location) {
        this.location = location;
    }

    public List<String> getJobtypes() {
        return jobtypes;
    }

    public void setJobtypes(List<String> jobtypes) {
        this.jobtypes = jobtypes;
    }

    public List<String> getNotes() {
        return notes;
    }

    public void setNotes(List<String> notes) {
        this.notes = notes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }


}
