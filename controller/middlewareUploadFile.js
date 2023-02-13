import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif'];
const imageDirectory = 'public/img';
const MAX_FIELD_SIZE = 20 * 1024 * 1024;


const form = formidable({
  multiples: false,  // on autorise le téléchargement de plusieurs fichiers à la fois
  keepExtensions: true, // pour afficher l'extension de l'image, pas seulement son nom
  encoding: 'utf-8', // format pour renomer le fichier
  maxFieldsSize: MAX_FIELD_SIZE,
});


const checkAcceptedExtensions = (file) => {
    const type = file.mimetype.split('/').pop(); // pour vérifier si l'extension est acceptée (on récupère le nom et on sépare de l'extenstion pour vérif)
    return allowedExtensions.includes(type);
};

export default async (req, res, next) => {

    form.parse(req, async (err, fields, files) => {
        if (err) {
                
            // Cas : le fichier est trop lourd
            if (err.code === 'LIMIT_FIELD_SIZE') {
                return res.status(400).json({ error: `Le fichier dépasse la taille maximum autorisée de ${MAX_FIELD_SIZE / 1024 / 1024} Mo.` });
            }
            return res.status(500).json({ error: 'Le fichier ne peut pas être traité.' });
        }

        const file = files.files;
        
        // Cas : aucun fichier
        if (!file || file.size === 0) {
            return res.status(400).json({ error: 'Aucun fichier n\'a été téléchargé.' });
        }
        
        // Cas : extension non conforme
        if (!checkAcceptedExtensions(file)) {
            return res.status(400).json({ error: 'Type de fichier non valide.' });
        }

        const newFilename = `${file.newFilename}`; // renomme le fichier aléatoirement
        const newPath = path.join(imageDirectory, newFilename); // pour afficher le nom du dossier + le nom du fichier
        
        // on vérifie si le dossier existe
        if (!fs.existsSync(imageDirectory)) {
            return res.status(500).json({ error: `Le dossier ${imageDirectory} n'existe pas.` }); // vérifie que le dossier existe
        }

        try {
            await fs.promises.copyFile(file.filepath, newPath);
            console.log(fields)
            req.body = fields;
            req.body.files = files.files.newFilename;
            next();
        } catch (e) {
            return res.status(500).json({ error: 'Le fichier ne peut pas être enregistré.' });
        }
        
    });
};