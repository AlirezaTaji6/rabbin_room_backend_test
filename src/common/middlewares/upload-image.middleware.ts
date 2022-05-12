import * as multer from 'multer'
import { UploadConfigConstants } from '../../upload/constants/upload-config.constants'

const imageStorage = multer.diskStorage(UploadConfigConstants.diskStorageConfig)

export const uploadMiddleware = multer({ 
    storage: imageStorage, 
    limits: UploadConfigConstants.limits, 
    fileFilter: UploadConfigConstants.fileFilter
})