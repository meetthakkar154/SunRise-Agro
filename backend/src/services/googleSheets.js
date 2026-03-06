const { google } = require('googleapis');

let sheets = null;
let authorised = false;

function initGoogleSheets() {
  const clientEmail = (process.env.GOOGLE_SERVICE_EMAIL || '').trim();
  const rawKey = (process.env.GOOGLE_PRIVATE_KEY || '').trim();

  if (!clientEmail || !rawKey) {
    console.log('Google Sheets credentials not set. Sheets logging disabled.');
    return;
  }

  const privateKey = rawKey.replace(/\\n/g, '\n');

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  sheets = google.sheets({ version: 'v4', auth });
  authorised = true;
  console.log('Google Sheets service initialised.');
}

const createdTabs = new Set();

async function ensureTab(spreadsheetId, sheetName) {
  if (createdTabs.has(sheetName)) return;
  try {
    await sheets.spreadsheets.get({ spreadsheetId });
    const meta = await sheets.spreadsheets.get({ spreadsheetId, fields: 'sheets.properties.title' });
    const exists = meta.data.sheets.some(s => s.properties.title === sheetName);
    if (!exists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests: [{ addSheet: { properties: { title: sheetName } } }] },
      });
    }
    createdTabs.add(sheetName);
  } catch (e) {
    console.error('ensureTab error:', e.message);
  }
}

async function appendToSheet(sheetName, row) {
  if (!authorised || !sheets) throw new Error('Google Sheets not initialised');

  const spreadsheetId = (process.env.GOOGLE_SHEET_ID || '').trim();
  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID not set');

  await ensureTab(spreadsheetId, sheetName);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${sheetName}'!A:Z`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

module.exports = { initGoogleSheets, appendToSheet };
