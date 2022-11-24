const client = require("./UTIL/db_connection").client;
const getSheetOne = require("./UTIL/sheetToJson").getSheetOne;
const sheetOne = getSheetOne("sheets/tm_make_model.csv");

client.connect();

sheetOne.forEach(currentElement => {
    const query = `INSERT INTO 
    tm_make_model(created, modified, make, model, vertical, vertical_subtype, supported_fuel, is_active, last_active_changed, supported_cc, supported_gvw, supported_sc)
    VALUES(NOW(), NOW(), '${currentElement["make"]}', '${currentElement["model"]}', 'CV', 'MISCD', '{"Diesel"}', TRUE, NOW(), '{${currentElement["CubicCapacity"]}}', '{${currentElement["GVW"]}}', '{${currentElement["SeatingCapacity"]}}');`;
    client
        .query(query)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log("Got exception");
            console.log(err);
        });
});

