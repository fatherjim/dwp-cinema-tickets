function generateNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateAccountId() {
  return generateNumberBetween(1, 100);
}

export { generateAccountId };
