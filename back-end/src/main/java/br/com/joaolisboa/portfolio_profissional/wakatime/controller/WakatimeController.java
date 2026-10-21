package br.com.joaolisboa.portfolio_profissional.wakatime.controller;

import br.com.joaolisboa.portfolio_profissional.wakatime.dto.WakatimeAllTimeDTO;
import br.com.joaolisboa.portfolio_profissional.wakatime.dto.WakatimeStatsDTO;
import br.com.joaolisboa.portfolio_profissional.wakatime.service.WakatimeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wakatime")
@CrossOrigin(origins = "http://localhost:5173")
public class WakatimeController {

    private final WakatimeService wakatimeService;

    public WakatimeController(WakatimeService wakatimeService) {
        this.wakatimeService = wakatimeService;
    }

    @GetMapping("/stats")
    public ResponseEntity<WakatimeStatsDTO> getStats(
            @RequestParam(name = "range", defaultValue = "last_7_days") String range) {
        WakatimeStatsDTO stats = wakatimeService.getStats(range);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/stats/{range}")
    public ResponseEntity<WakatimeStatsDTO> getStatsByPath(@PathVariable String range) {
        WakatimeStatsDTO stats = wakatimeService.getStats(range);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/all-time")
    public ResponseEntity<WakatimeAllTimeDTO> getAllTime() {
        WakatimeAllTimeDTO allTime = wakatimeService.getAllTime();
        return ResponseEntity.ok(allTime);
    }
}
