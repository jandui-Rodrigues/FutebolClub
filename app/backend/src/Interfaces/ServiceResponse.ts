export type ServiceResponseErrorType = 'INVALID_DATA' |
'UNAUTHORIZED' | 'NOT_FOUND' | 'BAD_REQUEST' | 'UNPROCESSABLE_ENTITY' | 'INTERNAL_ERROR';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: { message: string }
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED',
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
