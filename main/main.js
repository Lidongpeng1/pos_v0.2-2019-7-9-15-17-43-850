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

function conbineItem(barcodeCounts, allItems) {
  const result = [];
  for (const barcodeCount of barcodeCounts) {
    for (const item of allItems) {
      if (barcodeCount.barcode === item.barcode) {
        barcodeCount.item = item;
        result.push(barcodeCount);
        break;
      }
    }
  }
  return result;
}

function calculateItemsPrice(barcodeCountItems) {
  const result = [];
  for (const barcodeCountItem of barcodeCountItems) {
    const count = barcodeCountItem.count;
    const price = barcodeCountItem.item.price;
    barcodeCountItem.itemsPrice = count * price;
    result.push(barcodeCountItem);
  }
  return result;
}


function calculateTotalPrice(barcodeCountPriceItems) {
  return barcodeCountPriceItems.map((barcodeCountPriceItem) => barcodeCountPriceItem.itemsPrice)
    .reduce((totalPrice, itemsPrice) => totalPrice += itemsPrice);
}

function createReceipt(barcodeCountPriceItems, totalPrice) {
  let result = '***<没钱赚商店>收据***\n';
  for (const barcodeCountPriceItem of barcodeCountPriceItems) {
    const count = barcodeCountPriceItem.count;
    const name = barcodeCountPriceItem.item.name;
    const unit = barcodeCountPriceItem.item.unit;
    const price = barcodeCountPriceItem.item.price;
    const itemsPrice = barcodeCountPriceItem.itemsPrice;
    result += `名称：${name}，数量：${count}${unit}，单价：${price.toFixed(2)}(元)，小计：${itemsPrice.toFixed(2)}(元)\n`;
  }
  result += '----------------------\n';
  result += `总计：${totalPrice.toFixed(2)}(元)\n`;
  result += '**********************';
  return result;
}

function printReceipt(inputs) {
  const barcodeCounts = countItems(inputs);
  const allItems = loadAllItems();
  const barcodeCountItems = conbineItem(barcodeCounts, allItems);
  const barcodeCountPriceItems = calculateItemsPrice(barcodeCountItems);
  const totalPrice = calculateTotalPrice(barcodeCountPriceItems);
  const receipt = createReceipt(barcodeCountPriceItems, totalPrice);
  console.log(receipt);
}

