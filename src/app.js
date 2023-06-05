function main() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const address = sheet.getRange(1, 2).getDisplayValue();

  // トランザクションの作成
  const transactionQr = getTransactionUri(address, 104, 10, "test");

  const qr = qrcode(0, "L");
  qr.addData(JSON.stringify(transactionQr));
  qr.make();

  const base64str = qr.createDataURL(5).replace("data:image/gif;base64,", "");
  const imageBlob = Utilities.newBlob(Utilities.base64Decode(base64str), "image/gif", "qr");

  sheet.insertImage(imageBlob, 2, 3);
}

function getAmount(args) {
  const node = "https://symbolnode.blockchain-authn.app:3001";
  return getAccountAmount(args, node, 104);
}
