/**
 * DG HIIT — Captura de leads no Google Sheets
 *
 * CAMINHO ALTERNATIVO (se Extensões → Apps Script der erro):
 *
 * 1. Crie uma planilha em https://sheets.google.com → Planilha em branco
 * 2. Copie o ID da URL da planilha:
 *    https://docs.google.com/spreadsheets/d/ESTE_ID_AQUI/edit
 * 3. Acesse https://script.google.com → Novo projeto
 * 4. Cole este arquivo e substitua SPREADSHEET_ID pelo ID copiado
 * 5. Salve (Ctrl+S)
 * 6. Na primeira vez: clique em "doGet" → Executar → autorize o acesso
 * 7. Implantar → Nova implantação → App da Web
 *    - Executar como: Eu
 *    - Quem tem acesso: Qualquer pessoa
 * 8. Copie a URL (termina em /exec) e cole em lead-config.js
 */

// Cole aqui o ID da sua planilha (parte da URL entre /d/ e /edit)
var SPREADSHEET_ID = 'COLE_O_ID_DA_PLANILHA_AQUI';

var SHEET_NAME = 'Leads';

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    var raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var data = JSON.parse(raw);
    var sheet = getOrCreateSheet();

    sheet.appendRow([
      new Date(),
      data.nome || '',
      data.email || '',
      data.telefone || '',
      data.origem || '',
      data.pagina || '',
      data.data || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput('DG HIIT — endpoint de leads ativo.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function getSpreadsheet() {
  if (!SPREADSHEET_ID || SPREADSHEET_ID === 'COLE_O_ID_DA_PLANILHA_AQUI') {
    throw new Error('Configure SPREADSHEET_ID com o ID da sua planilha.');
  }

  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getOrCreateSheet() {
  var spreadsheet = getSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(['Data', 'Nome', 'E-mail', 'WhatsApp', 'Origem', 'Página', 'Data (ISO)']);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}
