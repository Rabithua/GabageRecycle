/**
 * Converts a Uint8Array to a base64 encoded string.
 *
 * This function takes a Uint8Array buffer, converts each byte to its corresponding
 * character code, joins them into a binary string, and then encodes that string
 * to base64 using the built-in btoa() function.
 *
 * @param buffer - The Uint8Array to convert to base64
 * @returns A base64 encoded string representation of the input buffer
 *
 * @example
 * // Converting a Uint8Array to base64
 * const buffer = new Uint8Array([72, 101, 108, 108, 111]);
 * const base64String = arrayBufferToBase64(buffer);
 * // base64String will be "SGVsbG8="
 */
function arrayBufferToBase64(buffer: Uint8Array): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export { arrayBufferToBase64 };
