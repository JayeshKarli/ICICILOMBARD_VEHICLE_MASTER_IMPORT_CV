const client = require("./UTIL/db_connection").client;
const reader = require("xlsx");
const sheetOne = require("./UTIL/sheetToJson").getSheetOne("sheets/imm.xlsx");

client.connect();

console.log(sheetOne.length);

sheetOne.forEach(el => {
    const query = `INSERT INTO 
    insurer_make_model(created, modified, insurer, make, model, vertical, vertical_subtype, tm_make_model_id, is_active, last_active_changed, psuedo_model)
    VALUES(NOW(), NOW(), 'ICICILOMBARD', '${el["make"]}', '${el["model"]}', 'CV', 'MISCD', ${el["id"]}, TRUE, NOW(), '${el["model"]}');`;
    client
        .query(query)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log("Got exception");
            console.log(err);
        })
});
