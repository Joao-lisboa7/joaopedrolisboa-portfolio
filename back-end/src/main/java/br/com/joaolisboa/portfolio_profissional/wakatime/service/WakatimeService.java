package br.com.joaolisboa.portfolio_profissional.wakatime.service;

import br.com.joaolisboa.portfolio_profissional.wakatime.dto.WakatimeAllTimeDTO;
import br.com.joaolisboa.portfolio_profissional.wakatime.dto.WakatimeStatsDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class WakatimeService {

    private static final Logger log = LoggerFactory.getLogger(WakatimeService.class);

    private final RestClient restClient;
    private final String apiKey;
    private final long cacheTtlMillis;

    private final Map<String, CacheEntry> cache = new ConcurrentHashMap<>();

    public WakatimeService(
            @Value("${wakatime.api.base-url:https://wakatime.com/api/v1}") String baseUrl,
            @Value("${wakatime.api.key:}") String apiKey,
            @Value("${wakatime.cache.ttl-minutes:30}") long ttlMinutes) {
        this.apiKey = apiKey != null ? apiKey.trim() : "";
        this.cacheTtlMillis = ttlMinutes * 60 * 1000L;
        this.restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

    public WakatimeStatsDTO getStats(String range) {
        String effectiveRange = (range == null || range.isBlank()) ? "last_7_days" : range.trim();
        String cacheKey = "stats_" + effectiveRange;

        CacheEntry entry = cache.get(cacheKey);
        if (entry != null && !entry.isExpired()) {
            log.debug("Retornando WakatimeStats [{}] do cache em memória", effectiveRange);
            return (WakatimeStatsDTO) entry.data();
        }

        if (apiKey.isEmpty()) {
            log.warn("Wakatime API key não configurada. Retornando dados demonstrativos para desenvolvimento.");
            WakatimeStatsDTO fallback = createMockStats(effectiveRange);
            cache.put(cacheKey, new CacheEntry(fallback, Instant.now().toEpochMilli() + cacheTtlMillis));
            return fallback;
        }

        try {
            log.info("Buscando estatísticas do Wakatime na API externa para período: {}", effectiveRange);
            String authHeader = buildAuthHeader(apiKey);

            WakatimeStatsDTO response = restClient.get()
                    .uri("/users/current/stats/{range}", effectiveRange)
                    .header(HttpHeaders.AUTHORIZATION, authHeader)
                    .retrieve()
                    .onStatus(HttpStatusCode::isError, (req, res) -> {
                        log.error("Erro ao chamar API do WakaTime: status {}", res.getStatusCode());
                    })
                    .body(WakatimeStatsDTO.class);

            if (response != null && response.getData() != null) {
                cache.put(cacheKey, new CacheEntry(response, Instant.now().toEpochMilli() + cacheTtlMillis));
                return response;
            }
        } catch (Exception ex) {
            log.error("Falha ao consultar Wakatime stats ({}). Motivo: {}", effectiveRange, ex.getMessage());
        }

        return createMockStats(effectiveRange);
    }

    public WakatimeAllTimeDTO getAllTime() {
        String cacheKey = "all_time";

        CacheEntry entry = cache.get(cacheKey);
        if (entry != null && !entry.isExpired()) {
            log.debug("Retornando WakatimeAllTime do cache em memória");
            return (WakatimeAllTimeDTO) entry.data();
        }

        if (apiKey.isEmpty()) {
            log.warn("Wakatime API key não configurada. Retornando dados all-time demonstrativos.");
            WakatimeAllTimeDTO fallback = createMockAllTime();
            cache.put(cacheKey, new CacheEntry(fallback, Instant.now().toEpochMilli() + cacheTtlMillis));
            return fallback;
        }

        try {
            log.info("Buscando all_time_since_today do Wakatime na API externa");
            String authHeader = buildAuthHeader(apiKey);

            WakatimeAllTimeDTO response = restClient.get()
                    .uri("/users/current/all_time_since_today")
                    .header(HttpHeaders.AUTHORIZATION, authHeader)
                    .retrieve()
                    .onStatus(HttpStatusCode::isError, (req, res) -> {
                        log.error("Erro ao chamar Wakatime all-time: status {}", res.getStatusCode());
                    })
                    .body(WakatimeAllTimeDTO.class);

            if (response != null && response.getData() != null) {
                cache.put(cacheKey, new CacheEntry(response, Instant.now().toEpochMilli() + cacheTtlMillis));
                return response;
            }
        } catch (Exception ex) {
            log.error("Falha ao consultar Wakatime all-time. Motivo: {}", ex.getMessage());
        }

        return createMockAllTime();
    }

    private String buildAuthHeader(String key) {
        if (key.startsWith("sec_") || key.startsWith("waka_sec_")) {
            return "Bearer " + key;
        }
        String encoded = Base64.getEncoder().encodeToString((key + ":").getBytes(StandardCharsets.UTF_8));
        return "Basic " + encoded;
    }

    private WakatimeStatsDTO createMockStats(String range) {
        WakatimeStatsDTO dto = new WakatimeStatsDTO();
        WakatimeStatsDTO.DataDTO data = new WakatimeStatsDTO.DataDTO();
        data.setHumanReadableTotal("38 hrs 42 mins");
        data.setHumanReadableDailyAverage("5 hrs 31 mins");
        data.setTotalSeconds(139320.0);
        data.setDailyAverage(19860.0);

        var languages = new ArrayList<WakatimeStatsDTO.LanguageItemDTO>();
        languages.add(createLanguage("Java", 42.5, "16 hrs 25 mins", 59100.0));
        languages.add(createLanguage("TypeScript", 28.3, "10 hrs 58 mins", 39480.0));
        languages.add(createLanguage("SQL", 12.1, "4 hrs 40 mins", 16800.0));
        languages.add(createLanguage("CSS", 9.4, "3 hrs 38 mins", 13080.0));
        languages.add(createLanguage("HTML", 7.7, "2 hrs 59 mins", 10740.0));
        data.setLanguages(languages);

        var projects = new ArrayList<WakatimeStatsDTO.ProjectItemDTO>();
        projects.add(createProject("portfolio-profissional", 54.0, "20 hrs 50 mins", 75000.0));
        projects.add(createProject("backend-api", 31.0, "12 hrs 00 mins", 43200.0));
        projects.add(createProject("microservices-playground", 15.0, "5 hrs 52 mins", 21120.0));
        data.setProjects(projects);

        var editors = new ArrayList<WakatimeStatsDTO.EditorItemDTO>();
        editors.add(createEditor("VS Code", 68.0, "26 hrs 18 mins", 94680.0));
        editors.add(createEditor("IntelliJ IDEA", 32.0, "12 hrs 24 mins", 44640.0));
        data.setEditors(editors);

        dto.setData(data);
        return dto;
    }

    private WakatimeAllTimeDTO createMockAllTime() {
        WakatimeAllTimeDTO dto = new WakatimeAllTimeDTO();
        WakatimeAllTimeDTO.DataDTO data = new WakatimeAllTimeDTO.DataDTO();
        data.setText("1,420 hrs 15 mins");
        data.setTotalSeconds(5112900.0);
        data.setDecimal("1420.25");
        dto.setData(data);
        return dto;
    }

    private WakatimeStatsDTO.LanguageItemDTO createLanguage(String name, double percent, String text, double seconds) {
        var item = new WakatimeStatsDTO.LanguageItemDTO();
        item.setName(name);
        item.setPercent(percent);
        item.setText(text);
        item.setTotalSeconds(seconds);
        return item;
    }

    private WakatimeStatsDTO.ProjectItemDTO createProject(String name, double percent, String text, double seconds) {
        var item = new WakatimeStatsDTO.ProjectItemDTO();
        item.setName(name);
        item.setPercent(percent);
        item.setText(text);
        item.setTotalSeconds(seconds);
        return item;
    }

    private WakatimeStatsDTO.EditorItemDTO createEditor(String name, double percent, String text, double seconds) {
        var item = new WakatimeStatsDTO.EditorItemDTO();
        item.setName(name);
        item.setPercent(percent);
        item.setText(text);
        item.setTotalSeconds(seconds);
        return item;
    }

    private record CacheEntry(Object data, long expiresAt) {
        boolean isExpired() {
            return Instant.now().toEpochMilli() > expiresAt;
        }
    }
}
