const client = require("./UTIL/db_connection").client;
const reader = require("xlsx");
const file = reader.readFile("sheets/insurer_make_model_export.xlsx");

client.connect();

const query = `SELECT * FROM insurer_make_model WHERE vertical_subtype='MISCD' and is_active=TRUE`;
client
    .query(query)
    .then((res) => {
        const rowCount = res.rowCount;
        console.log(`\nrowCount : ${rowCount}\n`);
        return res.rows;
    })
    .then((rows) => {
        const mappedRows = rows.map((el) => {
            delete el.created;
            delete el.modified;
            delete el.make_id;
            delete el.model_id;
            delete el.last_active_changed;

            return el;
        });
        return mappedRows;
    })
    .then((rows) => {
        console.log(rows[0]);
        console.log("Before writing data to imm.xlsx");

        const ws = reader.utils.json_to_sheet(rows);
        reader.utils.book_append_sheet(file, ws, "insurer_make_model_data");
        reader.writeFile(file, "sheets/insurer_make_model_export.xlsx");

        console.log("After writing data to imm.xlsx\n");
    })
    .catch((err) => {
        console.log("Got exception");
        console.log(err);
    })
    .finally(() => client.end());
