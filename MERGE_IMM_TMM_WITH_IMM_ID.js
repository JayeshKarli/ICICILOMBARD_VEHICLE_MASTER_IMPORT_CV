const tmm = require("./UTIL/sheetToJson").getSheetOne(
    "sheets/merged_imm_tmm.xlsx"
);
const imm = require("./UTIL/sheetToJson").getSheetOne(
    "sheets/insurer_make_model_export.xlsx"
);

console.log('tmm[0]');
console.log(tmm[0]);
console.log('imm[0]');
console.log(imm[0]);

const merged = [];

let common = 0;
let diff = 0;
let foundId = 0;
for (let i = 0; i < Math.min(imm.length, tmm.length); i++) {
    const immObj = imm[i];
    const tmmObj = tmm[i];

    let id = "";
    if (tmmObj.id == immObj.tm_make_model_id) {
        id = immObj.id;
        common++;
    } else {
        id = findSameMakeModelFromIMM(tmmObj.id);
        if(id) {
            foundId++;
        }
        diff++;
    }
    merged.push({
        imm_id: id,
        ...tmmObj,
    });
}

console.log(`common : ${common}`);
console.log(`diff : ${diff}`);
console.log(`foundId : ${foundId}`);

console.log(merged[0]);

function findSameMakeModelFromIMM(tmmId) {
    for (let i = 0; i < imm.length; i++) {
        const el = imm[i];
        if (el.tm_make_model_id == tmmId) {
            return el.id;
        }
    }
    return "";
}



// const reader = require("xlsx");
// const file = reader.readFile("sheets/merged_imm_tmm.xlsx");

// const ws = reader.utils.json_to_sheet(merged);
// reader.utils.book_append_sheet(file, ws, "imm_tmm_merged");
// reader.writeFile(file, "sheets/merged_imm_tmm.xlsx");
