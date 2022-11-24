const client = require("./UTIL/db_connection").client;
const reader = require("xlsx");
const file = reader.readFile("sheets/imm.xlsx");

client.connect();

const query = `SELECT * FROM tm_make_model WHERE vertical_subtype='MISCD' and is_active=TRUE`;
client
    .query(query)
    .then((res) => {
        const rowCount = res.rowCount;
        console.log(`\nrowCount : ${rowCount}\n`);
        return res.rows;
    })
    .then(rows => {
        const mappedRows = rows.map(el => {
            el["supported_fuel"] = el["supported_fuel"] && el["supported_fuel"].length ? el["supported_fuel"][0] : "";
            el["supported_cc"] = el["supported_cc"] && el["supported_cc"].length ? el["supported_cc"][0] : "";
            el["supported_gvw"] = el["supported_gvw"] && el["supported_gvw"].length ? el["supported_gvw"][0] : "";
            el["supported_sc"] = el["supported_sc"] && el["supported_sc"].length ? el["supported_sc"][0] : "";
            delete el.created;
            delete el.modified;
            delete el.make_id;
            delete el.model_id;
            delete el.last_active_changed;
            delete el.merged_model_id;
            delete el.vehicle_category;

            return el;
        });
        return mappedRows;
    })
    .then(rows => {
        console.log("Before writing data to imm.xlsx");

        const ws = reader.utils.json_to_sheet(rows);
        reader.utils.book_append_sheet(file, ws, "tm_make_model_data");
        reader.writeFile(file, "sheets/imm.xlsx");

        console.log("After writing data to imm.xlsx\n");
    })
    .catch((err) => {
        console.log("Got exception");
        console.log(err);
    })
    .finally(() => client.end());