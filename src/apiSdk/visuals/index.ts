import axios from 'axios';
import queryString from 'query-string';
import { VisualInterface, VisualGetQueryInterface } from 'interfaces/visual';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getVisuals = async (query?: VisualGetQueryInterface): Promise<PaginatedInterface<VisualInterface>> => {
  const response = await axios.get('/api/visuals', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createVisual = async (visual: VisualInterface) => {
  const response = await axios.post('/api/visuals', visual);
  return response.data;
};

export const updateVisualById = async (id: string, visual: VisualInterface) => {
  const response = await axios.put(`/api/visuals/${id}`, visual);
  return response.data;
};

export const getVisualById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/visuals/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVisualById = async (id: string) => {
  const response = await axios.delete(`/api/visuals/${id}`);
  return response.data;
};
