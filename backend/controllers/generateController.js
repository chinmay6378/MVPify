import { cohere } from '../utils/cohereClient.js';

export const generateCopy = async (req, res) => {
  const { idea } = req.body;

  const prompt = `Generate a landing page hero title, subtitle, and 3 features for this startup idea:\n"${idea}"`;

  try {
    const response = await cohere.generate({
      model: "command-nightly",
      prompt,
      max_tokens: 300,
      temperature: 0.8
    });

    const output = response.body.generations[0].text;
    res.json({ output });
  } catch (err) {
    res.status(500).json({ error: 'AI generation failed', details: err.message });
  }
};
