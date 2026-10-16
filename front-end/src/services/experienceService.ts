import type { Experience } from "@/types/Experience";

const API_URL = 'http://localhost:8080/api/experiences';

export async function getExperiences(): Promise<Experience[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Erro ao buscar experiências profissionais');
  }

  return response.json() as Promise<Experience[]>;
}