package br.com.joaolisboa.portfolio_profissional.wakatime.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WakatimeAllTimeDTO {

    private DataDTO data;

    public DataDTO getData() {
        return data;
    }

    public void setData(DataDTO data) {
        this.data = data;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DataDTO {
        private String text;

        @JsonProperty("total_seconds")
        private Double totalSeconds;

        private String decimal;

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

        public String getDecimal() {
            return decimal;
        }

        public void setDecimal(String decimal) {
            this.decimal = decimal;
        }
    }
}
