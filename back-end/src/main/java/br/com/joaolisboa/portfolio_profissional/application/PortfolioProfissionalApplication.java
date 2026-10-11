package br.com.joaolisboa.portfolio_profissional.application;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.com.joaolisboa.repository.ProjectRepository;
import br.com.joaolisboa.portfolio_profissional.model.Project;

@SpringBootApplication(scanBasePackages = {"br.com.joaolisboa.portfolio_profissional.application"})
public class PortfolioProfissionalApplication{

	public static void main(String[] args) {
		SpringApplication.run(PortfolioProfissionalApplication.class, args);
	}

	@Bean
    public CommandLineRunner testarConexaoSupabase(ProjectRepository repository) {
        return args -> {
            System.out.println("=========================================");
            System.out.println("Iniciando teste de conexão com o Supabase...");
            
            // Cria um novo projeto para o seu portfólio
            Project meuProjeto = new Project();
            meuProjeto.setTitulo("Sistema de Portfólio");
            meuProjeto.setTecnologias("Java, Spring Boot, React, Tailwind, Supabase");
            meuProjeto.setDescricao("Backend do meu portfólio profissional");

            // Salva no banco de dados
            repository.save(meuProjeto);

            System.out.println("✅ Tabela criada e projeto salvo com sucesso no Supabase!");
            System.out.println("=========================================");
        };
		}
}
