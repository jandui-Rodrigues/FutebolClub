const statusHTTP = [
  'INVALID_DATA',
  'UNAUTHORIZED',
  'NOT_FOUND',
  'SUCCESSFUL',
  'UNPROCESSABLE_ENTITY',
  'CREATED',
  'CONFLICT',
];

export default function mapStatusHTTP(status: string): number {
  const statusHTTPMap: Record<string, number> = {
    [statusHTTP[0]]: 400,
    [statusHTTP[1]]: 401,
    [statusHTTP[2]]: 404,
    [statusHTTP[3]]: 200,
    [statusHTTP[4]]: 422,
    [statusHTTP[5]]: 201,
    [statusHTTP[6]]: 409,
  };
  return statusHTTPMap[status]; // ?? 500;
}
