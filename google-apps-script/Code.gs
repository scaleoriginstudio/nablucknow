/**
 * NAB Lucknow website - form intake endpoint.
 *
 * One web app receives every form on the site (Volunteer, Donate, Event
 * sign-up, Programme enquiry, CSR enquiry, Contact). Each submission carries
 * a `formType` field; the script appends a row to a tab of that name inside
 * one spreadsheet, creating the tab and its header row on first use and
 * adding a column whenever a new field appears.
 *
 * Setup
 *  1. Create a Google Sheet. Copy its ID from the URL:
 *     docs.google.com/spreadsheets/d/<THIS_IS_THE_ID>/edit
 *  2. Paste that ID into SHEET_ID below.
 *  3. Deploy > New deployment > type "Web app".
 *       Execute as: Me
 *       Who has access: Anyone
 *  4. Authorise when prompted, then copy the deployment's /exec URL.
 *  5. Put that URL in the site's .env.local as NEXT_PUBLIC_FORMS_ENDPOINT.
 *
 * The site posts multipart FormData with no custom headers, so no CORS
 * preflight is triggered and the row is written even though the browser
 * cannot read the response.
 */

var SHEET_ID = 'PUT_SPREADSHEET_ID_HERE';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(20000);
  try {
    var data = parseBody(e);
    var formType = String(data.formType || 'General').replace(/[^\w .-]/g, '').slice(0, 90) || 'General';

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(formType) || ss.insertSheet(formType);

    var fields = Object.keys(data).filter(function (k) {
      return k !== 'formType';
    });

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp'].concat(fields));
    }

    var headers = sheet.getRange(1, 1, 1, Math.max(1, sheet.getLastColumn())).getValues()[0];
    fields.forEach(function (f) {
      if (headers.indexOf(f) === -1) {
        sheet.getRange(1, headers.length + 1).setValue(f);
        headers.push(f);
      }
    });

    var row = headers.map(function (h) {
      if (h === 'Timestamp') return new Date();
      return data[h] !== undefined ? data[h] : '';
    });
    sheet.appendRow(row);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function parseBody(e) {
  if (e && e.parameter && Object.keys(e.parameter).length) {
    return e.parameter; // FormData / urlencoded
  }
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents); // JSON or text/plain JSON
    } catch (x) {
      // fall through
    }
  }
  return {};
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return json({ ok: true, message: 'NAB Lucknow form endpoint is live' });
}
