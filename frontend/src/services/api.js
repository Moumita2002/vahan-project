import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

export const createEntity = (data) => api.post('/create-entity', data);
export const getEntities = () => api.get('/entities');
export const createRecord = (entityName, data) => api.post(`/${entityName}`, data);
export const getRecords = (entityName) => api.get(`/${entityName}`);
export const updateRecord = (entityName, id, data) => api.put(`/${entityName}/${id}`, data);
export const deleteRecord = (entityName, id) => api.delete(`/${entityName}/${id}`);
