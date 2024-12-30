const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

function readExcel() {
  const workbook = XLSX.readFile(path.resolve(__dirname, './address.xlsx'));
  const sheet_name_list = workbook.SheetNames;
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  fs.writeFileSync(path.resolve(__dirname, './to-list.json'), JSON.stringify(xlData, null, 2));
}

readExcel();
