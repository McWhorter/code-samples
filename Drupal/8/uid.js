/**
 * Returns a random base-36 uid with namespacing
 * @function
 * @param {Number} length - number of random base-36 digits desired.
 * @param {String} namespace - name of plugin to be incorporated in uid, optional.
 * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
 * @returns {String} - unique id
 */
const UiD = (length = 6, namespace) => {
  let str = '';
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
  const charsLength = chars.length;

  for (let i = 0; i < length; i += 1) {
    str += chars[Math.floor(Math.random() * charsLength)];
  }

  return namespace ? `${str}-${namespace}` : str;
};

export default UiD;
