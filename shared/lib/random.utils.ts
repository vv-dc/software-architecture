import { randomUUID, randomInt } from 'crypto';
import { loremIpsum } from 'lorem-ipsum';

export const randomItem = <T>(items: T[]): T => {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
};

export const randomFloat = (min: number, max: number, precision: number) => {
  const value = Math.random() * (max - min) + min;
  return parseFloat(value.toFixed(precision));
};

export const randomInteger = randomInt;

export const randomUuid = (prefix: string, maxLength?: number) => {
  const value = `${prefix}_${randomUUID()}`;
  return maxLength ? value.slice(0, maxLength) : value;
};

export const randomText = (minLength: number, maxLength: number): string =>
  loremIpsum({
    count: randomInt(minLength, maxLength),
    units: 'words',
  });

export const randomEmail = (domain: string) =>
  `${randomUuid('email', 30)}@${domain}`;
