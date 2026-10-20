package br.com.joaolisboa.portfolio_profissional.wakatime;

import br.com.joaolisboa.portfolio_profissional.wakatime.dto.WakatimeAllTimeDTO;
import br.com.joaolisboa.portfolio_profissional.wakatime.dto.WakatimeStatsDTO;
import br.com.joaolisboa.portfolio_profissional.wakatime.service.WakatimeService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WakatimeServiceTest {

    @Test
    @DisplayName("Deve retornar fallback com dados demonstrativos quando apiKey estiver vazia")
    void shouldReturnMockDataWhenApiKeyIsEmpty() {
        WakatimeService service = new WakatimeService("https://wakatime.com/api/v1", "", 30);

        WakatimeStatsDTO stats = service.getStats("last_7_days");
        assertNotNull(stats);
        assertNotNull(stats.getData());
        assertFalse(stats.getData().getLanguages().isEmpty());
        assertEquals("Java", stats.getData().getLanguages().get(0).getName());

        WakatimeAllTimeDTO allTime = service.getAllTime();
        assertNotNull(allTime);
        assertNotNull(allTime.getData());
        assertNotNull(allTime.getData().getText());
    }

    @Test
    @DisplayName("Deve utilizar o cache em memória em chamadas subsequentes")
    void shouldUseCacheOnSubsequentCalls() {
        WakatimeService service = new WakatimeService("https://wakatime.com/api/v1", "", 30);

        WakatimeStatsDTO firstCall = service.getStats("last_7_days");
        WakatimeStatsDTO secondCall = service.getStats("last_7_days");

        assertSame(firstCall, secondCall, "A segunda chamada deve retornar exatamente a mesma instância do cache");
    }
}
