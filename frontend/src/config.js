// config.js
// Set this to true when deploying to Vercel/cPanel
const isProduction = import.meta.env.PROD || false;

export const config = {
  // Use your live cPanel backend URL here when going live, e.g., 'https://api.yourdomain.com'
  API_BASE_URL: isProduction 
    ? 'https://amigowebster.in/api' // We omit /api here because the frontend already adds /api to its fetch requests
    : 'http://localhost:5000'
};
