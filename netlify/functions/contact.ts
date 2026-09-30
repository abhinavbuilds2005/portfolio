import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing payload' })
      };
    }

    const { name, email, message, botcheck } = JSON.parse(event.body);

    // Spam honeypot detection
    if (botcheck) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Transmission accepted.' })
      };
    }

    // Validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name, email, and message are required fields.' })
      };
    }

    // Forward to Web3Forms safely with access key
    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: 'd95cbc2e-a628-4836-b956-a1b038407133',
        name,
        email,
        message,
        subject: `New Transmission from AI Engineering Portfolio: ${name}`
      })
    });

    const result = await web3Response.json();

    if (result.success) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          message: 'Transmission successfully delivered.'
        })
      };
    } else {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: result.message || 'Upstream transmission failed.'
        })
      };
    }
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'Internal server error.' })
    };
  }
};
