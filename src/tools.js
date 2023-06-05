/**
 * @param {string} recipientPlainAddress
 * @param {104|152} networkType
 * @param {number} amount
 * @param {string} message
 */
function getTransactionUri(recipientPlainAddress, networkType, amount, message) {
  // get transaction qr json
  const res = UrlFetchApp.fetch("http://symbolnode.blockchain-authn.app:8080/invoke/01H253JJT8NG9000GZJ000000B", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      recipientAddress: recipientPlainAddress,
      networkType: networkType,
      amount: amount,
      message: message,
    }),
  });

  return JSON.parse(res.getContentText());
}

/**
 *
 * @param {string} plainAddress
 * @param {string} nodeUrl
 * @param {104|152} networkType
 * @returns
 */
function getAccountAmount(plainAddress, nodeUrl, networkType) {
  const res = UrlFetchApp.fetch(`${nodeUrl}/accounts/${plainAddress}`, {
    method: "get",
    contentType: "application/json",
  });

  const currencyId = networkType === 104 ? "6BED913FA20223F8" : "72C0212E67A08BCE";
  const mosaic = JSON.parse(res.getContentText()).account.mosaics.find((e) => e.id === currencyId);

  if (!mosaic) {
    throw new Error("Mosaic is not find");
  }

  return Number(mosaic.amount) / 1000000;
}
