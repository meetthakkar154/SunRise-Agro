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

const headersWritten = new Set();

async function ensureTab(spreadsheetId, sheetName) {
  if (createdTabs.has(sheetName)) return;
  try {
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

async function ensureHeaders(spreadsheetId, sheetName, headers) {
  if (!headers || headersWritten.has(sheetName)) return;
  try {
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `'${sheetName}'!A1:Z1`,
    });
    if (!existing.data.values || existing.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `'${sheetName}'!A1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [headers] },
      });
    }
    headersWritten.add(sheetName);
  } catch (e) {
    console.error('ensureHeaders error:', e.message);
  }
}

async function appendToSheet(sheetName, row, headers) {
  if (!authorised || !sheets) throw new Error('Google Sheets not initialised');

  const spreadsheetId = (process.env.GOOGLE_SHEET_ID || '').trim();
  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID not set');

  await ensureTab(spreadsheetId, sheetName);
  await ensureHeaders(spreadsheetId, sheetName, headers);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${sheetName}'!A:Z`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

module.exports = { initGoogleSheets, appendToSheet };
