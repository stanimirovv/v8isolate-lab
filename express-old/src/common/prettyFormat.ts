import format from 'pretty-format';

export default function prettyFormat(obj: unknown) {
  format(obj, { min: true });
}
