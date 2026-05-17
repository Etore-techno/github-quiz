function doPost(e) {
  const ss = SpreadsheetApp.openById('REMPLACER_PAR_ID_DU_SHEET');
  const sheet = ss.getSheetByName('Reponses') || ss.insertSheet('Reponses');
  const data = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Horodatage', 'Prenom', 'Nom', 'Classe', 'Groupe', 'JSON']);
  }

  sheet.appendRow([
    new Date(),
    data.profile?.prenom || '',
    data.profile?.nom || '',
    data.profile?.classe || '',
    data.profile?.groupe || '',
    JSON.stringify(data),
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
