package br.com.joaolisboa.portfolio_profissional.experience.model;

import java.time.LocalDate;

import br.com.joaolisboa.portfolio_profissional.experience.enums.SeniorityLevel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name = "Experience")
public class Experience {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  private String company;

  private String positionPt;
  private String positionEn;

  @Enumerated(EnumType.STRING)
  private SeniorityLevel seniorityLevel;

  @Column (columnDefinition = "TEXT")
  private String descriptionPt;

  @Column (columnDefinition = "TEXT")
  private String descriptionEn;

  private LocalDate startDate;
  private LocalDate endDate;
  private boolean current;

  public Experience() {
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getCompany() {
    return company;
  }

  public void setCompany(String company) {
    this.company = company;
  }

  public String getPositionPt() {
    return positionPt;
  }

  public void setPositionPt(String positionPt) {
    this.positionPt = positionPt;
  }

  public String getPositionEn() {
    return positionEn;
  }

  public void setPositionEn(String positionEn) {
    this.positionEn = positionEn;
  }

  public SeniorityLevel getSeniorityLevel() {
    return seniorityLevel;
  }

  public void setSeniorityLevel(SeniorityLevel seniorityLevel) {
    this.seniorityLevel = seniorityLevel;
  }

  public String getDescriptionPt() {
    return descriptionPt;
  }

  public void setDescriptionPt(String descriptionPt) {
    this.descriptionPt = descriptionPt;
  }

  public String getDescriptionEn() {
    return descriptionEn;
  }

  public void setDescriptionEn(String descriptionEn) {
    this.descriptionEn = descriptionEn;
  }

  public LocalDate getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDate startDate) {
    this.startDate = startDate;
  }

  public LocalDate getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDate endDate) {
    this.endDate = endDate;
  }

  public boolean isCurrent() {
    return current;
  }

  public void setCurrent(boolean current) {
    this.current = current;
  }
}
