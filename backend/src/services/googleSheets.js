const { google } = require('googleapis');

let sheets = null;
let authorised = false;

function initGoogleSheets() {
  const clientEmail = process.env.GOOGLE_SERVICE_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    console.log('Google Sheets credentials not set. Sheets logging disabled.');
    return;
  }

  const auth = new google.auth.JWT(
    clientEmail,
    null,
    privateKey.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  sheets = google.sheets({ version: 'v4', auth });
  authorised = true;
  console.log('Google Sheets service initialised.');
}

async function appendToSheet(sheetName, row) {
  if (!authorised || !sheets) return;

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) return;

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:F`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    });
  } catch (err) {
    console.error(`Google Sheets append error (${sheetName}):`, err.message);
  }
}

module.exports = { initGoogleSheets, appendToSheet };
