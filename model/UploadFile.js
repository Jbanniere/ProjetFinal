import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { asyncQuery } from '../config/database';

class UploadFile {
  constructor(sql, params) {
    this.allowedExtensions = ['jpeg', 'jpg', 'png', 'gif'];
    this.imageDirectory = 'public/img';
    this.MAX_FIELD_SIZE = 20 * 1024 * 1024;
    this.sqlImg = 'INSERT INTO pictures (url) VALUES (?)';
    this.form = formidable({
      multiples: false,
      keepExtensions: true,
      encoding: 'utf-8',
      maxFieldsSize: this.MAX_FIELD_SIZE,
    });
    this.sql = sql
    this.params = [...params]
  }

  checkAcceptedExtensions(file) {
    const type = file.mimetype.split('/').pop();
    return this.allowedExtensions.includes(type);
  }

  async uploadFile(req, res) {
    this.form.parse(req, async (err, fields, files) => {
      const {username} = fields
      if (err) {
        if (err.code === 'LIMIT_FIELD_SIZE') {
          return res
            .status(400)
            .json({ error: `Le fichier dépasse la taille maximum autorisée de ${this.MAX_FIELD_SIZE / 1024 / 1024} Mo.` });
        }
        return res.status(500).json({ error: 'Le fichier ne peut pas être traité.' });
      }

      const file = files.files;
      if (!file || file.size === 0) {
        return res.status(400).json({ error: 'Aucun fichier n\'a été téléchargé.' });
      }

      if (!this.checkAcceptedExtensions(file)) {
        return res.status(400).json({ error: 'Type de fichier non valide.' });
      }

      const newFilename = `${file.newFilename}`;
      const newPath = path.join(this.imageDirectory, newFilename);

      if (!fs.existsSync(this.imageDirectory)) {
        return res.status(500).json({ error: `Le dossier ${this.imageDirectory} n'existe pas.` });
      }

      try {
        await fs.promises.copyFile(file.filepath, newPath);
        await asyncQuery(this.sqlImg, [newFilename]);
        if(this.sql){
            await asyncQuery(this.sql, this.paramsSql);
        }
        return res.json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: 'Le fichier ne peut pas être enregistré.' });
      }
    });
  }
}

export default UploadFile;