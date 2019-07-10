'use strict';

function countItems(inputs) {
  const barcodeCounts = {};
  const barcodeArr = [];
  for (const barcode of inputs) {
    if (barcodeCounts[barcode] === undefined) {
      barcodeCounts[barcode] = 1;
      barcodeArr.push(barcode);
    } else {
      barcodeCounts[barcode]++;
    }
  }
  return barcodeArr.map((value) => 
    ({
      barcode: value,
      count: barcodeCounts[value],
    })
  );
}

function printReceipt(inputs) {
  console.log('请在此实现练习要求，并改写该行代码。');
}
