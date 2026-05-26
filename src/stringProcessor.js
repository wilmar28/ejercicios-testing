function maskEmail(email) {
  if (!email.includes('@')) {
    throw new Error('Email inválido');
  }

  const parts = email.split('@');
  const user = parts[0];
  const domain = parts[1];

  if (user.length === 1) {
    return email;
  }

  const masked =
    user[0] +
    '*'.repeat(user.length - 2) +
    user[user.length - 1];

  return masked + '@' + domain;
}

function reverseWords(sentence) {
  if (sentence.trim() === '') {
    return '';
  }

  return sentence
    .trim()
    .split(/\s+/)
    .reverse()
    .join(' ');
}

function extractHashtags(text) {
  const matches = text.match(/#[a-zA-Z0-9]+/g);

  return matches || [];
}

module.exports = {
  maskEmail,
  reverseWords,
  extractHashtags
};