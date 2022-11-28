const client = require("./UTIL/db_connection").client;
const sheetOne = require("./UTIL/sheetToJson").getSheetOne("sheets/ivm.xlsx");

console.log(sheetOne[12]);

console.log(isValid(sheetOne[1]));

client.connect();

let validValuesCount = 0;
sheetOne.forEach(el => {
    if(isValid(el)) {
        const query = `INSERT INTO
        insurer_vehicle_master(created, modified, variant, gvw, seating_capacity, cubic_capacity, fuel_type, raw_mapping, insurer_make_model_id, is_active, last_active_changed, usage_type)
        VALUES(NOW(), NOW(), '${el["model"]}', ${el["GVW"]}, ${el["SeatingCapacity"]}, ${el["CubicCapacity"]}, 'Diesel', '{ "cc": ${el["CubicCapacity"]}, "fuel": "Diesel", "make": "${el["make"]}", "model": "${el["model"]}", "fuelType": "Diesel", "makeCode": ${el["MakeCode"]}, "modelCode": ${el["ModelCode"]}, "grossWeight": ${el["GVW"]}, "vehicleClass": "MISCD", "seatingCapacity": ${el["SeatingCapacity"]} }', ${el["imm_id"]}, TRUE, NOW(), 'Depends on vehicle');`;
        client
            .query(query)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log("Got exception");
                console.log(err);
            });
    }
});

console.log(`validValueCount : ${validValuesCount}`);

function isValid(obj) {
    let result =
        true &&
        !!obj["imm_id"] &&
        !!obj["id"] &&
        !!obj["make"] &&
        !!obj["model"] &&
        !!obj["CubicCapacity"] &&
        !!obj["SeatingCapacity"] &&
        !!obj["MakeCode"] &&
        !!obj["ModelCode"] &&
        !!obj["GVW"];

    return result;
}