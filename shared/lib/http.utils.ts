import { STATUS_CODES } from 'http';
import { request } from 'undici';
import { stringify } from 'qs';

import { HttpError } from '../modules/errors/http-errors';

export const getRequest = async <T>(
  url: string,
  query?: unknown
): Promise<T> => {
  if (query !== undefined) url += `?${stringify(query)}`;

  const { body, statusCode } = await request(url);
  const data = await body.json();
  if (statusCode > 199 && statusCode < 300) return data;

  const message = STATUS_CODES[statusCode] as string;
  throw new HttpError(message, statusCode, data);
};
