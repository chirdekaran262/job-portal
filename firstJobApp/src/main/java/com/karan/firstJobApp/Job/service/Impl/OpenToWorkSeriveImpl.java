package com.karan.firstJobApp.Job.service.Impl;

import com.karan.firstJobApp.Job.model.OpenToWork;
import com.karan.firstJobApp.Job.repo.OpenToWorkRepo;
import com.karan.firstJobApp.Job.service.OpenToWorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OpenToWorkSeriveImpl implements OpenToWorkService {

    @Autowired
    OpenToWorkRepo openToWorkRepo;

    @Override
    public List<OpenToWork> getOpenToWork() {
        return openToWorkRepo.findAll();
    }

    @Override
    public void addOpenToWork(OpenToWork openToWork) {
        openToWorkRepo.save(openToWork);
    }

    @Override
    public void updateOpenToWork(OpenToWork openToWork) {
        OpenToWork openToWork1=openToWorkRepo.findById(openToWork.getId()).orElse(null);
        openToWork1.setName(openToWork.getName());
        openToWork1.setDescription(openToWork.getDescription());
        openToWork1.setJobtypes(openToWork.getJobtypes());
        openToWork1.setStatus(openToWork.getStatus());
        openToWork1.setLocation(openToWork.getLocation());
        openToWork1.setNotes(openToWork.getNotes());
        openToWorkRepo.save(openToWork1);
    }

    @Override
    public void deleteOpenToWork(int id) {
        openToWorkRepo.deleteById(id);
    }
}
