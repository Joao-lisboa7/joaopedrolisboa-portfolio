package br.com.joaolisboa.portfolio_profissional.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.joaolisboa.portfolio_profissional.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    // custom query methods can be added here
}

    