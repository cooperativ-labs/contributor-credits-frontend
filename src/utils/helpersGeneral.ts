export function unique(items: any[]): any[] {
  return Array.from(new Set(items));
}

export function mapZip<T, R>(keys: T[], values: R[]): Map<T, R> {
  return new Map(keys.map((key, i) => [key, values[i]]));
}

export function setHttp(link) {
  if (link.search(/^http[s]?\:\/\//) == -1) {
    link = 'http://' + link;
  }
  return link;
}

export function getHumanDate(date) {
  const dateObj = new Date(date);
  return dateObj?.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
