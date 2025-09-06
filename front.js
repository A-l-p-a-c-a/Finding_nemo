// This runs in the user's browser
async function getOpenAIResponse(userPrompt) {
  try {
    // The request is sent to your Vercel serverless function
    const response = await fetch('/api/back', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong on the server.');
    }

    const data = await response.json();
    console.log('OpenAI response:', data.result);
    return data.result;

  } catch (error) {
    console.error('Failed to fetch from Vercel API:', error);
    return 'Error: Could not retrieve a response.';
  }
}
