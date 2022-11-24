const imm = require("./UTIL/sheetToJson").getSheetOne("sheets/imm.xlsx");
const tmm = require("./UTIL/sheetToJson").getSheetOne("sheets/tm_make_model.csv");

const merged = [];

for(let i = 0; i < Math.min(imm.length, tmm.length); i++) {
    const immObj = imm[i];
    const tmmObj = tmm[i];

    let id = "";
    if(immObj.make == tmmObj.make && immObj.model == tmmObj.model) {
        id = immObj.id;
    }
    else {
        id = findSameMakeModelFromIMM(tmmObj.make, tmmObj.model);
    }
    merged.push({
        id : id,
        ...tmmObj
    });
}

function findSameMakeModelFromIMM(make, model) {
    for (let i = 0; i < imm.length; i++) {
        const el = imm[i];
        if (el.make == make && el.model == model) {
            return el.id;
        }
    }
    return "";
}

const reader = require("xlsx");
const file = reader.readFile("sheets/merged_imm_tmm.xlsx");

const ws = reader.utils.json_to_sheet(merged);
reader.utils.book_append_sheet(file, ws, "imm_tmm_merged");
reader.writeFile(file, "sheets/merged_imm_tmm.xlsx");