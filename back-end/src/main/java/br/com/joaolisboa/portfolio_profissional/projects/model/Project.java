package br.com.joaolisboa.portfolio_profissional.projects.model;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String titulo;
  private String tecnologias;
  private String descricao;

  // Construtor vazio obrigatório para o JPA
  public Project() {}

  // Getters e Setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getTitulo() { return titulo; }
  public void setTitulo(String titulo) { this.titulo = titulo; }

  public String getTecnologias() { return tecnologias; }
  public void setTecnologias(String tecnologias) { this.tecnologias = tecnologias; }

  public String getDescricao() { return descricao; }
  public void setDescricao(String descricao) { this.descricao = descricao; }
}
