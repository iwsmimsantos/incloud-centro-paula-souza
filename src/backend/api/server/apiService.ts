import axios from 'axios';

const urlBase = 'https://two025-1a-t13-es05-api2.onrender.com/api/v1';
const token = 'g3-d72f4d0e90fce94208a9cc383c7e10ae7b';

const api = axios.create({
  baseURL: urlBase,
  headers: {
    'Authorization': `Bearer ${token}`,
  }
});

// Institution endpoints
export const getAllInstitutions = async () => {
  try {
    const response = await api.get('/institutions');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar instituições:', error);
    throw error;
  }
};

export const getInstitutionById = async (id: string | number) => {
  try {
    const response = await api.get(`/institutions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar instituição:', error);
    throw error;
  }
};

export const getInstitutionStudents = async (id: string | number) => {
  try {
    const response = await api.get(`/institutions/${id}/students`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar alunos da instituição:', error);
    throw error;
  }
};

// Student endpoints
export const getStudentById = async (id: string | number) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar aluno:', error);
    throw error;
  }
};

export const getStudentEnrollments = async (id: string | number) => {
  try {
    const response = await api.get(`/students/${id}/enrollments`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar matrículas do aluno:', error);
    throw error;
  }
};

// Course endpoints
export const getAllCourses = async () => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar cursos:', error);
    throw error;
  }
};

export const getCourseById = async (id: string | number) => {
  try {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar curso:', error);
    throw error;
  }
};

export const getCourseStudents = async (id: string | number) => {
  try {
    const response = await api.get(`/courses/${id}/students`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar alunos do curso:', error);
    throw error;
  }
};

// Stats endpoint
export const getStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    throw error;
  }
};

export default api;