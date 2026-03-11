const phoneLengths = {
  '+91': 10,
  '+1': 10,
  '+44': 10,
  '+61': 9,
  '+81': 10,
  '+49': 11,
  '+33': 9,
  '+86': 11,
  '+7': 10,
  '+971': 9,
  '+92': 10,
  '+880': 10,
  '+94': 9,
  '+966': 9,
  '+20': 10,
  '+34': 9,
  '+39': 10,
  '+55': 11,
  '+62': 10,
  '+82': 10,
};

function getPhoneLength(countryCode) {
  return phoneLengths[countryCode] || 10;
}

module.exports = { phoneLengths, getPhoneLength };
