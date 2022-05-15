import { NextFunction } from 'connect';
import { Response, Router } from 'express'
import { ErrorResponse, SuccessResponse } from '../common/dto/response.dto';
import { StatusCodeEnum } from '../common/enums/status-code.enum';
import { uploadMiddleware } from '../common/middlewares/upload-image.middleware';
import { FsProxy } from '../common/proxies/fs.proxy';
import { UploadErrorEnum } from './enums/upload-message.enum';
const toPdf = require('office-to-pdf')

const fsProxy = new FsProxy()

const uploadRouter = Router();

uploadRouter.post('/', uploadMiddleware.single('file'), upload)

async function upload(req: any, res: Response, next: NextFunction) {

    if(req.fileValidationError) {

        if(req.file) {
            await fsProxy.unlinkAsync(req.file.path)
        }
        
        return new ErrorResponse({
            statusCode: StatusCodeEnum.FORBIDDEN,
            message: req.fileValidationError
        }).send(res)
    }

    if(!req.file) {
        return new ErrorResponse({
            statusCode: StatusCodeEnum.NOT_VALID,
            message: UploadErrorEnum.NOT_UPLOADED
        }).send(res)
    }
    
    let path = req.file.path
    const type = req.file.originalname.slice(req.file.originalname.lastIndexOf('.')+1, req.file.originalname.length)
    
    if(type != 'pdf' && type != 'PDF') {
        const fileBuffer = await fsProxy.readFileAsync(req.file.path)
        const pdfBuffer = await toPdf(fileBuffer)
        path = path.slice(0, path.lastIndexOf('.')) + '.pdf'

        await fsProxy.writeFileAsync(path, pdfBuffer)
        await fsProxy.unlinkAsync(req.file.path)
        
    }
    
    return new SuccessResponse<string>({
        data: path,
    }).send(res)
    
}

export { uploadRouter }