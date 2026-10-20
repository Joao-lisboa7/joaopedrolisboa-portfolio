export interface LanguageStat {
  name: string;
  percent: number;
  totalSeconds: number;
  text: string;
}

export interface ProjectStat {
  name: string;
  percent: number;
  totalSeconds: number;
  text: string;
}

export interface EditorStat {
  name: string;
  percent: number;
  totalSeconds: number;
  text: string;
}

export interface WakatimeStats {
  data: {
    humanReadableTotal: string;
    humanReadableDailyAverage: string;
    totalSeconds: number;
    dailyAverage: number;
    languages: LanguageStat[];
    projects: ProjectStat[];
    editors: EditorStat[];
  };
}

export interface WakatimeAllTime {
  data: {
    text: string;
    totalSeconds: number;
    decimal: string;
  };
}
