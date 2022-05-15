export enum ValidationErrorEnum {
    BODY_FAILED = 'اطلاعات وارد شده غلط است',
    PARAM_FAILED = 'پارامتر های ارسال شده غلط است',
    QUERY_FAILED = 'کوئری پارامتر های وارد شده غلط است',
    MIN_VALUE = 'حداقل مقدار *field* ، *value* است',
    MAX_VALUE = 'حداکثر مقدار *field*, *value* است'
}