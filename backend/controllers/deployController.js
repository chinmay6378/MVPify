import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const deployToVercel = async (req, res) => {
  const { githubRepoUrl, projectName } = req.body;

  if (!githubRepoUrl || !projectName) {
    return res.status(400).json({ error: 'GitHub repo URL and project name are required.' });
  }

  try {
    const response = await axios.post('https://api.vercel.com/v13/deployments', {
      name: projectName,
      gitSource: {
        type: 'github',
        repo: githubRepoUrl.replace('https://github.com/', ''),
      },
      projectSettings: {
        framework: 'vite' // or 'nextjs', etc.
      }
    }, {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const deployUrl = response.data?.url;
    res.json({ deployedUrl: `https://${deployUrl}` });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Deployment failed.', details: err.message });
  }
};
