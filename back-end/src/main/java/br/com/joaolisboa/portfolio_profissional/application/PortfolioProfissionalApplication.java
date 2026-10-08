package br.com.joaolisboa.portfolio_profissional.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"br.com.joaolisboa.portfolio_profissional.application"})
public class PortfolioProfissionalApplication{

	public static void main(String[] args) {
		SpringApplication.run(PortfolioProfissionalApplication.class, args);
	}

}
