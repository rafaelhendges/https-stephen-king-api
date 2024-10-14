import axios from 'axios';


const api = axios.create({
    baseURL: 'https://stephen-king-api.onrender.com', 
});

export const getBooks = () => api.get('/books');
export const getBookDetails = (id: string) => api.get(`/books/${id}`);

export default api;
