import { NextFunction } from 'connect';
import { Response, Router } from 'express'
import { ErrorResponse, SuccessResponse } from '../common/dto/response.dto';
import { StatusCodeEnum } from '../common/enums/status-code.enum';
import { uploadMiddleware } from '../common/middlewares/upload-image.middleware';
import { FsProxy } from '../common/proxies/fs.proxy';
import { UploadErrorEnum } from './enums/upload-message.enum';

const fsProxy = new FsProxy()

const uploadRouter = Router();

uploadRouter.post('/', uploadMiddleware.single('file'), upload)

async function upload(req: any, res: Response, next: NextFunction) {
    console.log(req.file);

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

    return new SuccessResponse<string>({
        data: req.file.path,
    }).send(res)
    
}

export { uploadRouter }