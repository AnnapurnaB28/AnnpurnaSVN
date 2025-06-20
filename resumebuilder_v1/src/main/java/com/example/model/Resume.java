package com.example.model;

import java.io.Serializable;
import jakarta.persistence.*;


/**
 * The persistent class for the resumes database table.
 * 
 */
@Entity
@Table(name="resumes")
@NamedQuery(name="Resume.findAll", query="SELECT r FROM Resume r")
public class Resume implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	private String email;

	private String experience;

	private String name;

	private String skills;

	public Resume() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {	
		this.email = email;
	}

	public String getExperience() {
		return this.experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSkills() {
		return this.skills;
	}

	public void setSkills(String skills) {
		this.skills = skills;
	}

}