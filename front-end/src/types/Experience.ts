export interface Experience {
  id: number;
  company: string;
  positionPt: string;
  positionEn: string;
  seniorityLevel: 'ESTAGIO' | 'JUNIOR' | 'PLENO' | 'SENIOR';
  descriptionPt: string;
  descriptionEn: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
}