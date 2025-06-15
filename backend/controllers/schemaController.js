import { cohere } from '../utils/cohereClient.js';

export const generateSchema = async (req, res) => {
  const { idea } = req.body;

  const prompt = `You're a database architect. Based on this app idea, output a database schema as JSON with tables, fields, and relationships:\n\n"${idea}"\n\nExample format:\n{\n  "users": { "id": "int", "name": "string", ... },\n  "posts": { "id": "int", "title": "string", "user_id": "foreign_key(users.id)" }\n}`;

  try {
    const response = await cohere.generate({
      model: "command-nightly",
      prompt,
      max_tokens: 500,
      temperature: 0.6
    });

    const output = response.body.generations[0].text.trim();

    // Optional: clean JSON
    let schemaJSON = {};
    try {
      schemaJSON = JSON.parse(output);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid JSON schema from AI', raw: output });
    }

    res.json({ schema: schemaJSON });
  } catch (err) {
    res.status(500).json({ error: 'AI schema generation failed', details: err.message });
  }
};
