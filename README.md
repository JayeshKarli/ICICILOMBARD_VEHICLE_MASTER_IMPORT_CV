# ICICILOMBARD_VEHICLE_MASTER_IMPORT_CV

Node scripts for importing data from masters provided by ICICI Lombard

The execution order of scripts is as follows 

1. insurer_make_model.js. For this we'll need masters from insurers with only relevant columns(check tm_make_model.xlsx file for relevant columns).
2. After that we'll export data from tm_make_model table using export_insurer_make_model.js file. This will export the table data to imm.xlsx file. The imm.xlsx file will also be used to insert data into Elastic DB.
3. insurer_make_model.js file will import data from imm.xlsx file to insurer_make_model table.
4. MERGE_XL_IMM_TMM.js file to get data in merged_imm_tmm.xlsx.
5. export_insurer_make_mode.js to export insurer_make_model table data to insurer_make_model_export.xlsx file.
6. MERGE_IMM_TMM_WITH_IMM_ID.js wil write data to ivm.xlsx which will be used to import data into insurer_vehicle_master table
7. insurer_vehicle_master.js to import data into insurer_vehicle_master table.
