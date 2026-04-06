const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_API_URL) || 'http://localhost:8000';

async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export const api = {
  // Portfolios
  getPortfolios: (params = '') => fetchAPI(`/api/portfolios/${params ? '?' + params : ''}`),
  getPortfolio: (slug) => fetchAPI(`/api/portfolios/${slug}`),
  createPortfolio: (data) => fetchAPI('/api/portfolios/', { method: 'POST', body: JSON.stringify(data) }),
  updatePortfolio: (id, data) => fetchAPI(`/api/portfolios/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePortfolio: (id) => fetchAPI(`/api/portfolios/${id}`, { method: 'DELETE' }),

  // Films
  getFilms: (params = '') => fetchAPI(`/api/films/${params ? '?' + params : ''}`),
  getFilm: (slug) => fetchAPI(`/api/films/${slug}`),
  createFilm: (data) => fetchAPI('/api/films/', { method: 'POST', body: JSON.stringify(data) }),
  updateFilm: (id, data) => fetchAPI(`/api/films/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteFilm: (id) => fetchAPI(`/api/films/${id}`, { method: 'DELETE' }),

  // Testimonials
  getTestimonials: (params = '') => fetchAPI(`/api/testimonials/${params ? '?' + params : ''}`),
  createTestimonial: (data) => fetchAPI('/api/testimonials/', { method: 'POST', body: JSON.stringify(data) }),
  updateTestimonial: (id, data) => fetchAPI(`/api/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTestimonial: (id) => fetchAPI(`/api/testimonials/${id}`, { method: 'DELETE' }),

  // Blog
  getPosts: (params = '') => fetchAPI(`/api/blog/${params ? '?' + params : ''}`),
  getPost: (slug) => fetchAPI(`/api/blog/${slug}`),
  createPost: (data) => fetchAPI('/api/blog/', { method: 'POST', body: JSON.stringify(data) }),
  updatePost: (id, data) => fetchAPI(`/api/blog/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePost: (id) => fetchAPI(`/api/blog/${id}`, { method: 'DELETE' }),

  // Enquiries
  getEnquiries: (params = '') => fetchAPI(`/api/enquiries/${params ? '?' + params : ''}`),
  createEnquiry: (data) => fetchAPI('/api/enquiries/', { method: 'POST', body: JSON.stringify(data) }),
  updateEnquiry: (id, data) => fetchAPI(`/api/enquiries/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteEnquiry: (id) => fetchAPI(`/api/enquiries/${id}`, { method: 'DELETE' }),
};
