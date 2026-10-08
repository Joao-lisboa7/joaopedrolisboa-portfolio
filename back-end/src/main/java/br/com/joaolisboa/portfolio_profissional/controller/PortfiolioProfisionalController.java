package br.com.joaolisboa.portfolio_profissional.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller 
public class PortfiolioProfisionalController {

  @GetMapping("/home")
  public String home (){
    return "home";
  }

  
}
