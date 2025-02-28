export default async function handler(req, res) {
    // Get the 'query' parameter from the request URL, e.g., /api/proxy?query=your+question
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: "Missing query parameter" });
    }
  
    // Use the backend URL from the environment variable.
    // In Vercel, you'll set BACKEND_URL (e.g., "http://54.77.226.229:8000")
    const backendUrl = process.env.VITE_BACKEND_URL;
    if (!backendUrl) {
        console.log('BACKEND_URL is not configured');
      return res.status(500).json({ error: "BACKEND_URL is not configured" });
    }
  
    // Build the full URL to your backend endpoint.
    const fullUrl = `${backendUrl}/?query=${query}`;
  
    try {
      // Forward the request to the backend
      const backendResponse = await fetch(fullUrl);
      
      if (!backendResponse.ok) {
        // If the backend returns an error, forward that error message
        return res.status(backendResponse.status).json({ error: 'Backend error', details: await backendResponse.text() });
      }
      
      // Parse the JSON response from the backend
      const data = await backendResponse.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Proxy error:', error);
      res.status(500).json({ error: 'Proxy error', details: error.message });
    }
  }
  