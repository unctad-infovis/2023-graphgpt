// https://stackoverflow.com/questions/59016562/parse-csv-records-in-to-an-array-of-objects-in-javascript
const CSVtoJSON = (csv) => {
  const lines = csv.toString().split(/\r\n|\r|\n/g);
  const result = [];
  const headers = lines[0].split(',');
  for (let i = 1; i < lines.length; i++) {
    const obj = {};

    const str = lines[i];
    let s = '';
    let flag = 0;
    for (let j = 0; j < str.length; j++) {
      let ch = str[j];
      if (ch === '"' && flag === 0) {
        flag = 1;
      } else if (ch === '"' && flag === 1) flag = 0;
      if (ch === ',' && flag === 0) ch = '|';
      if (ch !== '"') s += ch;
    }

    const properties = s.split('|');
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = properties[j];
    }

    result.push(obj);
  }
  return result;
};

export default CSVtoJSON;
