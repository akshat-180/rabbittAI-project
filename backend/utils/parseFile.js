const csv = require("csv-parser");
const xlsx = require("xlsx");

function parseFile(file) {
  return new Promise((resolve, reject) => {
    if (file.originalname.endsWith(".csv")) {
      const results = [];

      const stream = require("stream");
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);

      bufferStream
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", reject);
    } else if (file.originalname.endsWith(".xlsx")) {
      const workbook = xlsx.read(file.buffer);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      resolve(xlsx.utils.sheet_to_json(sheet));
    } else reject(new Error("Invalid file"));
  });
}

module.exports = parseFile;