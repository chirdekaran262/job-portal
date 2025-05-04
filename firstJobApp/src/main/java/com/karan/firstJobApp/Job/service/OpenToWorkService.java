package com.karan.firstJobApp.Job.service;

import com.karan.firstJobApp.Job.model.OpenToWork;
import org.springframework.stereotype.Service;

import java.util.List;


public interface OpenToWorkService {
    List<OpenToWork> getOpenToWork();
    void addOpenToWork(OpenToWork openToWork);
    void updateOpenToWork(OpenToWork openToWork);
    void deleteOpenToWork(int id);
}
