package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Resume;
import com.example.service.ResumeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;
    
    
    @PostMapping("/saveResume")
    public ResponseEntity<String> saveResume(@RequestBody Resume resume) {
    	resumeService.saveResume(resume);
        return ResponseEntity.ok("Resume saved successfully!");
    }

    @GetMapping("/getAllResumes")
    public List<Resume> getAllResumes() {
        return resumeService.getAllResumes();
    }
    
//    @GetMapping("/test")
//    public String test() {
//        return "✅ Controller is working";
//    }

    @GetMapping("/{id}")
    public Resume getResumeById(@PathVariable Integer id) {
        return resumeService.getResumeById(id);
    }

    @PutMapping("/{id}")
    public Resume updateResume(@PathVariable Integer id, @RequestBody Resume resume) {
        return resumeService.updateResume(id, resume);
    }

    @DeleteMapping("/{id}")
    public void deleteResume(@PathVariable Integer id) {
        resumeService.deleteResume(id);
    }
}