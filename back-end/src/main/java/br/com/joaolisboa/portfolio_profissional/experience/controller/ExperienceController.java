package br.com.joaolisboa.portfolio_profissional.experience.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
@RequestMapping("/api/experiences")
public class ExperienceController {

  @GetMapping
  public String Teste(){
    return "Teste ok";
  }

}
