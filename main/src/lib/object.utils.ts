export const addProperty = <T>(
  obj: T,
  property: string,
  value: unknown
): void => {
  (obj as any)[property] = value;
};
