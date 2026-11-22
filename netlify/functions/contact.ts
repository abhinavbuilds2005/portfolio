import { Handler } from '@netlify/functions';

const RECIPIENT_EMAIL = 'abhinavanand9996@gmail.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

export const handler: Handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
    };
  }

  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing request payload' })
      };
    }

    let payload: { name?: string; email?: string; message?: string; botcheck?: string };
    try {
      payload = JSON.parse(event.body);
    } catch {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid JSON payload' })
      };
    }

    const { name, email, message, botcheck } = payload;

    // Spam honeypot trap
    if (botcheck) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ success: true, message: 'Transmission accepted.' })
      };
    }

    // Validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Name, email, and message are required fields.' })
      };
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // 1. Primary Delivery Channel: FormSubmit.co AJAX Endpoint
    try {
      const fsResponse = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://coderabhinavanand.netlify.app',
          'Referer': 'https://coderabhinavanand.netlify.app/'
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          _subject: `New Transmission from AI Engineering Portfolio: ${trimmedName}`
        })
      });

      if (fsResponse.ok) {
        const fsData = await fsResponse.json().catch(() => null);
        if (fsData && (fsData.success === 'true' || fsData.success === true)) {
          return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
              success: true,
              message: 'Message delivered directly to inbox.'
            })
          };
        }
      }
    } catch (fsErr) {
      console.warn('FormSubmit provider attempt error:', fsErr);
    }

    // 2. Secondary Fallback Channel: Web3Forms (with fallback catch)
    try {
      const web3Response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://coderabhinavanand.netlify.app',
          'Referer': 'https://coderabhinavanand.netlify.app/'
        },
        body: JSON.stringify({
          access_key: 'd95cbc2e-a628-4836-b956-a1b038407133',
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          subject: `New Transmission from AI Engineering Portfolio: ${trimmedName}`
        })
      });

      const contentType = web3Response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const web3Data = await web3Response.json();
        if (web3Data.success) {
          return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
              success: true,
              message: 'Message delivered directly to inbox.'
            })
          };
        }
      }
    } catch (web3Err) {
      console.warn('Web3Forms provider attempt error:', web3Err);
    }

    // If both upstream providers were unreachable, return 502 with helpful details
    return {
      statusCode: 502,
      headers: corsHeaders,
      body: JSON.stringify({
        error: 'Direct email dispatch temporarily unavailable. Please email abhinavanand9996@gmail.com directly.'
      })
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message || 'Internal server error.' })
    };
  }
};
