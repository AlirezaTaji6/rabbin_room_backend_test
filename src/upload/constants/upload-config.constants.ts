import { Request } from 'express'
import { UploadErrorEnum } from '../enums/upload-message.enum'

export class UploadConfigConstants {
    
    static diskStorageConfig = {
        destination: `files`,
        filename: (req: Request, file: Express.Multer.File, cb: any) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    };

    static fileFilter(req: any, file: Express.Multer.File, cb: any) {
        if (
            !file.originalname.match(
                /\.(docx|pdf|pptx)$/
            )
        )
        {
            req.fileValidationError = UploadErrorEnum.NOT_ALLOWED_TYPE;
            return cb(null, false);
        }
        return cb(null, true);
    }

    static limits = {
        fieldSize: 10000000
    }
}