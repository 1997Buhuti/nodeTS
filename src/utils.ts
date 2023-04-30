export function isInteger(val: string) {
  return val.match(/^\d+$/) ?? false;
}
