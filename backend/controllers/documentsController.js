import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const generateDocs = async (req, res) => {
  const { startupIdea } = req.body;

  if (!startupIdea) {
    return res.status(400).json({ error: 'startupIdea is required.' });
  }

  const prompt = `Generate a professional README.md and a short 2-line elevator pitch for this startup idea: "${startupIdea}".
  
  README must include:
  - Project title
  - Description
  - Features
  - Tech Stack
  - Getting Started
  - License
  
  Format: 
  {
    "readme": "...",
    "pitch": "..."
  }`;

  try {
    const response = await axios.post('https://api.cohere.ai/v1/chat', {
      model: 'command-r-plus',
      message: prompt,
      temperature: 0.6,
      max_tokens: 600,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    const output = response.data.text || response.data.generations?.[0]?.text || '';
    const [_, readme, pitch] = output.match(/README\s*[:\-]?\s*((.|\n)*?)\nPitch\s*[:\-]?\s*(.*)/i) || [];
    
    res.json({ readme: readme?.trim() || output, pitch: pitch?.trim() || 'No pitch found.' });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Document generation failed.', details: err.message });
  }
};
