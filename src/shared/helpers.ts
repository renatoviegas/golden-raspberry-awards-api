export function numberValue(val: any): number | undefined {
  if (val === undefined || val === null || val === '') return undefined;
  const parsed = Number(val);
  return isNaN(parsed) ? undefined : parsed;
}

export function stringValue(val: any): string | undefined {
  if (val === undefined || val === null || val === '') return undefined;
  return String(val);
}

export function booleanValue(val: any): boolean | undefined {
  if (val === undefined || val === null || val === '') return undefined;
  if (val === true || val === 'true') return true;
  if (val === false || val === 'false') return false;
  return undefined;
}

export function removeUndefinedKeys<T extends Record<string, any>>(obj: T): T {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}
