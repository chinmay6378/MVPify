import fs from 'fs-extra';
import path from 'path';
import { createZipFromFolder } from '../utils/zipper.js';

export const exportMVP = async (req, res) => {
  const { landingHTML, schemaJSON, meta } = req.body;

  const timestamp = Date.now();
  const exportDir = path.join('public', `mvp-${timestamp}`);
  const zipPath = path.join('public', `mvp-${timestamp}.zip`);

  try {
    await fs.ensureDir(exportDir);

    // Write landing page
    await fs.writeFile(path.join(exportDir, 'index.html'), landingHTML);

    // Write schema
    await fs.writeJSON(path.join(exportDir, 'schema.json'), schemaJSON);

    // Optional: metadata/info
    await fs.writeJSON(path.join(exportDir, 'info.json'), meta || {});

    // Create ZIP
    await createZipFromFolder(exportDir, zipPath);

    // Clean up folder after zipping
    await fs.remove(exportDir);

    res.download(zipPath, `mvp-export.zip`);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create ZIP', details: err.message });
  }
};
