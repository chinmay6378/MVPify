import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const generateFeatures = async (req, res) => {
  const { idea } = req.body;

  if (!idea) {
    return res.status(400).json({ error: 'Startup idea is required.' });
  }

  try {
    const prompt = `List 5-7 key features needed to build a functional MVP for the following startup idea:\n"${idea}"\nRespond in bullet points without explanation.`;

    const response = await axios.post('https://api.cohere.ai/v1/chat', {
      model: "command-r-plus",
      message: prompt,
      temperature: 0.7,
      max_tokens: 300,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const rawText = response.data.text || response.data.generations?.[0]?.text || '';
    const features = rawText
      .split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().match(/^\d+\./))
      .map(f => f.replace(/^[-\d.]+\s*/, '').trim());

    res.json({ features });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Feature generation failed.', details: err.message });
  }
};
