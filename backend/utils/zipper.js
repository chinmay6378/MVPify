import fs from 'fs-extra';
import archiver from 'archiver';
import path from 'path';

export const createZipFromFolder = async (inputFolder, outputPath) => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => resolve());
    archive.on('error', err => reject(err));

    archive.pipe(output);
    archive.directory(inputFolder, false);
    archive.finalize();
  });
};
