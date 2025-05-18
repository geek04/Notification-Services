const en = require('../../locales/en.json');
const es = require('../../locales/es.json');

function getMessage(key, lang = 'en', params = {}) {
  const messages = { en, es };
  let template = messages[lang]?.notifications[key] || messages['en'].notifications[key];
  // Simple template interpolation
  Object.entries(params).forEach(([k, v]) => {
    template = template.replace(`{{${k}}}`, v);
  });
  return template;
}

module.exports = { getMessage };
