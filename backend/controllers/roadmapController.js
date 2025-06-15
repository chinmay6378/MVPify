import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const generateRoadmap = async (req, res) => {
  const { appType } = req.body;

  if (!appType) {
    return res.status(400).json({ error: 'appType is required.' });
  }

  const prompt = `Generate a 10–14 day solo developer roadmap to build an MVP for: "${appType}". 
Break it down by days or phases, focusing on frontend, backend, auth, and deployment.
Format the response as a JSON list of { day, tasks }`;

  try {
    const response = await axios.post('https://api.cohere.ai/v1/chat', {
      model: 'command-r-plus',
      message: prompt,
      temperature: 0.5,
      max_tokens: 800,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    const raw = response.data.text || response.data.generations?.[0]?.text || '';
    const steps = raw
      .split('\n')
      .filter(l => l.match(/^Day \d+:/i))
      .map(l => {
        const [_, day, task] = l.match(/Day (\d+):\s*(.*)/i) || [];
        return { day: `Day ${day}`, tasks: task };
      });

    res.json({ roadmap: steps });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Roadmap generation failed.', details: err.message });
  }
};
