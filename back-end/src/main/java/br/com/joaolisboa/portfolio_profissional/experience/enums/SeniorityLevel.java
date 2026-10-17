package br.com.joaolisboa.portfolio_profissional.experience.enums;

public enum SeniorityLevel {
  ESTAGIO("Estágio", "Internship"),
  UNIOR("Júnior", "Junior"),
  PLENO("Pleno", "Mid-level"),
  SENIOR("Sênior", "Senior");

  private final String labelPt;
  private final String labelEn;

  SeniorityLevel(String labelPt, String labelEn) {
        this.labelPt = labelPt;
        this.labelEn = labelEn;
    }

  public String getLabelPt() { return labelPt; }
  public String getLabelEn() { return labelEn; }
}
