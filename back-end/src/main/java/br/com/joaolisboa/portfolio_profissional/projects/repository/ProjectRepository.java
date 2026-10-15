package br.com.joaolisboa.portfolio_profissional.projects.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.joaolisboa.portfolio_profissional.projects.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
   
}