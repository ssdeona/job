
import type { JobsResponse } from '../types/job';

const API_URL = 'https://kata-jobs.onrender.com/api/jobs';

interface GetJobsParams {
  search: string;
  city: string;
  skills: string[];
  page: number;
}

export const getJobs = async ({
  search,
  city,
  skills,
  page,
}: GetJobsParams): Promise<JobsResponse> => {
  const params = new URLSearchParams();

  if (search) {
    params.set('search', search);
  }

  if (city) {
    params.set('city', city);
  }

  if (skills.length > 0) {
    params.set('skills', skills.join(','));
  }

  params.set('page', String(page));

  const response = await fetch(`${API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить вакансии');
  }

  return response.json();
};