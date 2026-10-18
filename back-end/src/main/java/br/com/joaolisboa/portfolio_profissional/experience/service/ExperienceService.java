package br.com.joaolisboa.portfolio_profissional.experience.service;

import org.springframework.stereotype.Service;

import br.com.joaolisboa.portfolio_profissional.experience.model.Experience;
import br.com.joaolisboa.portfolio_profissional.experience.repository.ExperienceRepository;

import java.util.List;

@Service 
public class ExperienceService {
  private final ExperienceRepository repository;

  public ExperienceService(ExperienceRepository repository) {
     this.repository = repository;
  }

  public List<Experience> findAll() {
    return repository.findAll();
  }

  public Experience save(Experience experience) {
    return repository.save(experience);
  }

  public Experience findById(Integer id) {
    return repository.findById(id).
      orElseThrow(() ->
        new RuntimeException("Experience not found")
      );
  }

  public Experience update(Integer id, Experience updatedExperience){
    Experience experience = this.findById(id);
    
    experience.setCompany(updatedExperience.getCompany());
    experience.setPositionPt(updatedExperience.getPositionPt());
    experience.setPositionEn(updatedExperience.getPositionEn());
    experience.setSeniorityLevel(updatedExperience.getSeniorityLevel());
    experience.setDescriptionPt(updatedExperience.getDescriptionPt());
    experience.setDescriptionEn(updatedExperience.getDescriptionEn());
    experience.setStartDate(updatedExperience.getStartDate());
    experience.setEndDate(updatedExperience.getEndDate());
    experience.setCurrent(updatedExperience.isCurrent());

    return repository.save(experience);
    
  }
  

}
