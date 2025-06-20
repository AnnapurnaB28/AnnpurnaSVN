package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.Resume;
import com.example.repository.ResumeRepo;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepo resumeRepo;
    
    public void saveResume(Resume resume) {
        resumeRepo.save(resume);
    }

    public List<Resume> getAllResumes() {
        return resumeRepo.findAll();
    }

    public Resume getResumeById(Integer id) {
        Optional<Resume> resume = resumeRepo.findById(id);
        return resume.orElse(null);
    }

    public Resume updateResume(Integer id, Resume updatedResume) {
        Optional<Resume> optionalResume = resumeRepo.findById(id);

        if (optionalResume.isPresent()) {
            Resume resume = optionalResume.get();
            resume.setName(updatedResume.getName());
            resume.setEmail(updatedResume.getEmail());
            resume.setSkills(updatedResume.getSkills());
            resume.setExperience(updatedResume.getExperience());

            return resumeRepo.save(resume);
        }

        return null;
    }

    public void deleteResume(Integer id) {
    	resumeRepo.deleteById(id);
    }
}