import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const generateLogo = async (req, res) => {
  const { brandName, vibe } = req.body;

  if (!brandName || !vibe) {
    return res.status(400).json({ error: 'brandName and vibe are required' });
  }

  const prompt = `Logo design for a brand named "${brandName}" with a "${vibe}" style. Centered, simple, on white background, high contrast, professional.`;

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4',
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
      data: JSON.stringify({ inputs: prompt }),
    });

    res.set('Content-Type', 'image/png');
    res.send(Buffer.from(response.data, 'binary'));
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Logo generation failed', details: err.message });
  }
};
