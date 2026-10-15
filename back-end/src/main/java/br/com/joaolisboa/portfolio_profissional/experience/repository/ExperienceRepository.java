package br.com.joaolisboa.portfolio_profissional.experience.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.joaolisboa.portfolio_profissional.experience.model.Experience;

@Repository 
public interface ExperienceRepository extends JpaRepository<Experience, Long>{

}
