import type { WakatimeStats, WakatimeAllTime } from '../types/Wakatime';

const API_BASE_URL = 'http://localhost:8080/api/wakatime';

export async function getWakatimeStats(range: string = 'last_7_days'): Promise<WakatimeStats> {
  const response = await fetch(`${API_BASE_URL}/stats?range=${encodeURIComponent(range)}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar estatísticas do Wakatime (${response.status})`);
  }
  return response.json() as Promise<WakatimeStats>;
}

export async function getWakatimeAllTime(): Promise<WakatimeAllTime> {
  const response = await fetch(`${API_BASE_URL}/all-time`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar tempo all-time do Wakatime (${response.status})`);
  }
  return response.json() as Promise<WakatimeAllTime>;
}
