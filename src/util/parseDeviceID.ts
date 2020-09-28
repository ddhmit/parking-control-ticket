export default function parseDeviceID(id: string): string[] {
  if (!id) return [];
  let res = id
    .trim()
    .split('-')
    .filter(c => !!c);
  if (res.length < 2) return [];
  return res;
}
