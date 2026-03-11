// Maps country codes to their respective phone number lengths
// Add or update as needed for more countries
const phoneLengths = {
  '+91': 10, // India
  '+1': 10, // United States
  '+44': 10, // United Kingdom (varies, but 10 for mobiles)
  '+61': 9, // Australia (mobiles are 9 digits after country code)
  '+81': 10, // Japan (varies, 10 or 11)
  '+49': 11, // Germany (varies, 10-11)
  '+33': 9, // France
  '+86': 11, // China
  '+7': 10, // Russia
  '+971': 9, // UAE
  '+92': 10, // Pakistan
  '+880': 10, // Bangladesh (varies, 10-11)
  '+94': 9, // Sri Lanka
  '+966': 9, // Saudi Arabia
  '+20': 10, // Egypt (varies, 10-11)
  '+34': 9, // Spain
  '+39': 10, // Italy (varies, 9-10)
  '+55': 11, // Brazil
  '+62': 10, // Indonesia (varies, 9-11)
  '+82': 10 // South Korea
};

export default phoneLengths;
