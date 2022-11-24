const reader = require("xlsx");

const getSheetOne = path => {
    console.log(`path : ${path}`);
    const file = reader.readFile(path);
    const sheetOne = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[0]]
    );
    return sheetOne;
};

const getFile = path => reader.readFile(path);

module.exports.getSheetOne = getSheetOne;
module.exports.getFile = getFile;