export default function removeHttp(url: string) {
  return url.replace(/^https?:\/\//, '');
}