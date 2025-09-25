import toast from "react-hot-toast";

class ApiService {
  baseURL: string | undefined;
  defaultHeaders: Record<string, string>;

  constructor(baseURL: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // constructor(baseURL = 'https://student-management-be-production.up.railway.app') {
  //   this.baseURL = baseURL;
  //   this.defaultHeaders = {
  //     'Content-Type': 'application/json',
  //   };
  // }
  

  // Get auth token from localStorage
  getAuthToken() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      // console.log('Auth token retrieved:', token ? 'Token exists' : 'No token');
      return token;
    }
    return null;
  }

  // Get headers with authentication if token exists
  getHeaders(customHeaders = {}) {
    const token = this.getAuthToken();
    const headers = { ...this.defaultHeaders, ...customHeaders };
    
    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint: string, options: { headers?: Record<string, string>; [key: string]: any } = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: this.getHeaders(options.headers),
    };

    // console.log('Making API request:', {
    //   url,
    //   headers: config.headers,
    //   method: config.method || 'GET'
    // });

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      // Handle different response statuses
      if (response.status === 401) {
        // For public endpoints, don't redirect automatically
        const publicEndpoints = ['/auth/login', '/application', '/pre-assessment'];
        if (publicEndpoints.some(publicEndpoint => endpoint.includes(publicEndpoint))) {
          throw new Error('401 Unauthorized - Invalid credentials');
        }
        // For other endpoints, clear token and redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          window.location.href = '/auth/login';
        }
        throw new Error('Unauthorized access. Please login again.');
      }

      if (response.status === 400) {
        let serverMessage = 'Bad request - Invalid data';
        try {
          const msg = Array.isArray(data?.message) ? data.message.join(', ') : (data?.message || serverMessage);
          serverMessage = msg;
        } catch {}
        throw new Error(`400 ${serverMessage}`);
      }

      if (response.status === 403) {
        throw new Error('Access forbidden. You do not have permission to perform this action.');
      }

      if (response.status === 404) {
        throw new Error('Resource not found.');
      }

      if (response.status === 500) {
        throw new Error('500 Internal server error');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      if(response.ok && (response.status === 200 || response.status === 201) && options.method !== 'GET'){
        try {
         if(data.message){
            toast.success(data.message);
          }
        } catch {}
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return data;
      } else if (contentType && contentType.includes('text/')) {
        return await response.text();
      } else {
        return response;
      }

    } catch (error) {
      console.error(`API Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // GET request
  async get(endpoint: string, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  // POST request
  async post(endpoint: string, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint: string, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // PATCH request
  async patch(endpoint: string, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint: string) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // Upload file (multipart/form-data)
  async upload(endpoint: string, formData: FormData) {
    const headers = { ...this.defaultHeaders };
    delete headers['Content-Type']; // Let browser set content-type for multipart
    
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.request(endpoint, {
      method: 'POST',
      headers,
      body: formData,
    });
  }

  // Upload file with PUT method (multipart/form-data)
  async uploadPut(endpoint: string, formData: FormData) {
    const headers = { ...this.defaultHeaders };
    delete headers['Content-Type']; // Let browser set content-type for multipart
    
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.request(endpoint, {
      method: 'PUT',
      headers,
      body: formData,
    });
  }

  // Download file
  async download(endpoint: string, filename = 'download') {
    const response = await this.request(endpoint, {
      method: 'GET',
      headers: { ...this.defaultHeaders },
    });

    if (response instanceof Response) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  }

  // Set base URL
  setBaseURL(newBaseURL: string) {
    this.baseURL = newBaseURL;
  }

  // Set default headers
  setDefaultHeaders(headers: Record<string, string>) {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }
}

// Create a default instance
const apiService = new ApiService();

// Export both the class and the default instance
export { ApiService, apiService };

// Export default instance for convenience
export default apiService;
