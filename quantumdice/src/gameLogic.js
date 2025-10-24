const HOUSE_EDGE = 0.01;

/**
 * Calculates the payout multiplier based on the win chance.
 * @param {number} winChance - The chance of winning, from 0 to 100.
 * @returns {number} The payout multiplier.
 */
export function calculatePayout(winChance) {
  if (winChance <= 0 || winChance >= 100) {
    return 0;
  }
  const multiplier = (1 - HOUSE_EDGE) * (100 / winChance);
  return parseFloat(multiplier.toFixed(4));
}

/**
 * Generates a cryptographically secure random server seed.
 * @returns {string} A 32-byte hex string.
 */
export function generateServerSeed() {
  const buffer = new Uint8Array(32);
  window.crypto.getRandomValues(buffer);
  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Calculates the roll result based on the provably fair algorithm.
 * @param {string} serverSeed - The server seed.
 * @param {string} clientSeed - The client seed.
 * @param {number} nonce - The number of bets made with this seed pair.
 * @returns {Promise<number>} The roll result, from 0.00 to 99.99.
 */
export async function getRollResult(serverSeed, clientSeed, nonce) {
  const hmacKey = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(serverSeed),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const data = `${clientSeed}:${nonce}`;
  const signature = await window.crypto.subtle.sign(
    "HMAC",
    hmacKey,
    new TextEncoder().encode(data)
  );

  const signatureArray = Array.from(new Uint8Array(signature));
  const hexHash = signatureArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const luckyNumberHex = hexHash.substring(0, 5);
  const luckyNumberInt = parseInt(luckyNumberHex, 16);

  const result = luckyNumberInt % 10000;
  const diceRoll = result / 100;

  return diceRoll;
}
