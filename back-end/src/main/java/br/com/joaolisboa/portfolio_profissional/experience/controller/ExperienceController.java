package br.com.joaolisboa.portfolio_profissional.experience.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.joaolisboa.portfolio_profissional.experience.model.Experience;
import br.com.joaolisboa.portfolio_profissional.experience.service.ExperienceService;

@RestController 
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/experiences")
public class ExperienceController {
  private final ExperienceService service;

  public ExperienceController(ExperienceService service) {
    this.service = service;
  }

  @GetMapping
  public List<Experience> findAll() {
    return service.findAll();
  }

  @PostMapping
  public Experience save(@RequestBody Experience experience) {
    return service.save(experience);
  }

}
