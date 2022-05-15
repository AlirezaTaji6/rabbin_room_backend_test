import { validate } from 'class-validator';
import { ErrorResponse } from '../dto/response.dto';
import { ValidationErrorEnum} from '../../common/enums/validation-message.enum'

export class ValidatorUtil {

    static async validate(Schema: any, data: any) {

        const body = Object.assign(new Schema(), data)
        
        const result = await validate(body, { whitelist: true, forbidNonWhitelisted: true })
            
        if(!result.length) {
            return true
        }

        const resp = new ErrorResponse({
            statusCode: 400,
            message: ValidationErrorEnum.BODY_FAILED, 
            errors: result
        })
        return resp.serializeValidationErrors()
        
    }
}