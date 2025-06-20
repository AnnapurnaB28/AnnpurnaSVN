package com.example.repository;

import com.example.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeRepo extends JpaRepository<Resume, Integer> {
}
