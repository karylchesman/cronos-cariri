import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import crypto from 'node:crypto';

export default {
    storage: multer.diskStorage({
        filename: (req: Request, file, callback) => {
            crypto.randomBytes(10, (err, hash) => {
                if (err) { callback(err, "Error") };

                const fileName = `${hash.toString('hex')}-${file.originalname}`

                return callback(null, fileName);
            })
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
        const allowedMimes = [
            'text/html',
        ];

        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("Tipo de arquivo inválido."))
        }
    }
}