package br.com.joaolisboa.portfolio_profissional.wakatime.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WakatimeStatsDTO {

    private DataDTO data;

    public DataDTO getData() {
        return data;
    }

    public void setData(DataDTO data) {
        this.data = data;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DataDTO {
        @JsonProperty("human_readable_total")
        private String humanReadableTotal;

        @JsonProperty("human_readable_daily_average")
        private String humanReadableDailyAverage;

        @JsonProperty("total_seconds")
        private Double totalSeconds;

        @JsonProperty("daily_average")
        private Double dailyAverage;

        private List<LanguageItemDTO> languages;
        private List<ProjectItemDTO> projects;
        private List<EditorItemDTO> editors;

        public String getHumanReadableTotal() {
            return humanReadableTotal;
        }

        public void setHumanReadableTotal(String humanReadableTotal) {
            this.humanReadableTotal = humanReadableTotal;
        }

        public String getHumanReadableDailyAverage() {
            return humanReadableDailyAverage;
        }

        public void setHumanReadableDailyAverage(String humanReadableDailyAverage) {
            this.humanReadableDailyAverage = humanReadableDailyAverage;
        }

        public Double getTotalSeconds() {
            return totalSeconds;
        }

        public void setTotalSeconds(Double totalSeconds) {
            this.totalSeconds = totalSeconds;
        }

        public Double getDailyAverage() {
            return dailyAverage;
        }

        public void setDailyAverage(Double dailyAverage) {
            this.dailyAverage = dailyAverage;
        }

        public List<LanguageItemDTO> getLanguages() {
            return languages;
        }

        public void setLanguages(List<LanguageItemDTO> languages) {
            this.languages = languages;
        }

        public List<ProjectItemDTO> getProjects() {
            return projects;
        }

        public void setProjects(List<ProjectItemDTO> projects) {
            this.projects = projects;
        }

        public List<EditorItemDTO> getEditors() {
            return editors;
        }

        public void setEditors(List<EditorItemDTO> editors) {
            this.editors = editors;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class LanguageItemDTO {
        private String name;
        private Double percent;
        private String text;

        @JsonProperty("total_seconds")
        private Double totalSeconds;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Double getPercent() {
            return percent;
        }

        public void setPercent(Double percent) {
            this.percent = percent;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public Double getTotalSeconds() {
            return totalSeconds;
        }

        public void setTotalSeconds(Double totalSeconds) {
            this.totalSeconds = totalSeconds;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ProjectItemDTO {
        private String name;
        private Double percent;
        private String text;

        @JsonProperty("total_seconds")
        private Double totalSeconds;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Double getPercent() {
            return percent;
        }

        public void setPercent(Double percent) {
            this.percent = percent;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public Double getTotalSeconds() {
            return totalSeconds;
        }

        public void setTotalSeconds(Double totalSeconds) {
            this.totalSeconds = totalSeconds;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class EditorItemDTO {
        private String name;
        private Double percent;
        private String text;

        @JsonProperty("total_seconds")
        private Double totalSeconds;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Double getPercent() {
            return percent;
        }

        public void setPercent(Double percent) {
            this.percent = percent;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public Double getTotalSeconds() {
            return totalSeconds;
        }

        public void setTotalSeconds(Double totalSeconds) {
            this.totalSeconds = totalSeconds;
        }
    }
}
