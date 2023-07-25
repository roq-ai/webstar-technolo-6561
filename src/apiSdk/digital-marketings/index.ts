import axios from 'axios';
import queryString from 'query-string';
import { DigitalMarketingInterface, DigitalMarketingGetQueryInterface } from 'interfaces/digital-marketing';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDigitalMarketings = async (
  query?: DigitalMarketingGetQueryInterface,
): Promise<PaginatedInterface<DigitalMarketingInterface>> => {
  const response = await axios.get('/api/digital-marketings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createDigitalMarketing = async (digitalMarketing: DigitalMarketingInterface) => {
  const response = await axios.post('/api/digital-marketings', digitalMarketing);
  return response.data;
};

export const updateDigitalMarketingById = async (id: string, digitalMarketing: DigitalMarketingInterface) => {
  const response = await axios.put(`/api/digital-marketings/${id}`, digitalMarketing);
  return response.data;
};

export const getDigitalMarketingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/digital-marketings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDigitalMarketingById = async (id: string) => {
  const response = await axios.delete(`/api/digital-marketings/${id}`);
  return response.data;
};
