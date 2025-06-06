// Initialize an empty object to store table-related data
let tableSamples = {};

let questionnaire_response = {};

let default_currency_Symbol = "€";

let table_group = [
    "Standard Pricing", 
    "Various Investment Products", "Test Automation Table",
    "Maintenance Table",
    "OEM Investment", 
    "SiL factory Usage Information", 
    "CE Tests",
    "FnD Tests"
];

let table_info={};
let table_inputs = {};
const tables = [
    { 
        name: "Standard Pricing", 
        hasTotal: false, 
        columns: [
            { type: "price", saved_Id_key: "rate", column_title: "Rate" }
        ]
    },
    { 
        name: "Various Investment Products", 
        hasTotal: false, 
        columns: [
            { type: "hour", saved_Id_key: "min_hours", column_title: "Min duration [Hrs]" },
            // { type: "select", saved_Id_key: "ol/cl", column_title: "Open Loop/Closed Loop",
            //     options: { OL: "Open Loop", CL: "Closed Loop", Both: "Both"} 
            // }
        ]
    },
    {   name: "Test Automation Table", 
        hasTotal: false, 
        columns: [
            { type: "hour", saved_Id_key: "min_hours", column_title: "Min duration [Hrs]" }
        ]
    },
    { 
        name: "Maintenance Table", 
        hasTotal: false, 
        columns: [
            { type: "hour", saved_Id_key: "hours", column_title: "Duration [Hrs]" }
        ]
    },
    { 
        name: "OEM Investment", 
        hasTotal: true, 
        columns: [
            { type: "price", saved_Id_key: "price", column_title: "Price" }
        ]
    },
    { 
        name: "SiL factory Usage Information", 
        hasTotal: false, 
        columns: [
            { type: "hour", saved_Id_key: "hours", column_title: "Saved efforts with SiL factory[hr]" },
            // { type: "percentage", saved_Id_key: "percentage", column_title: "HCL Share [%]" }
        ]
    },
    { 
        name: "CE Tests", 
        hasTotal: true, 
        columns: [
            { type: "hour", saved_Id_key: "hours", column_title: "Hours" },
            // { type: "select", saved_Id_key: "ol/cl", column_title: "Open Loop/Closed Loop",
            //     options: { OL: "Open Loop", CL: "Closed Loop"}
            // }
           // { type: "price", saved_Id_key: "price", column_title: "Price" }
        ]
    },
    { 
        name: "FnD Tests", 
        hasTotal: true, 
        columns: [
            { type: "hour", saved_Id_key: "hours", column_title: "Hours" }
        ]
    }
];

let std_table_value = {
    "currency": "€",
    "tables": {
        "Standard Pricing" : [
            {"title": 'HCL hr rate', "Rate": '124'},
            {"title": 'LCL hr rate', "Rate": '31'},
            {"title": 'Cost of HiL lab per hour', "Rate": '20'}
        ],
        "Various Investment Products":{
            "SiL from scratch (L)":[
                {"title": 'vECU OL', "Min duration [Hrs]": '202', "Loop Type": "Open Loop"},
                {"title": 'vNP creation (per channel)', "Min duration [Hrs]": '20', "Loop Type": "Open Loop"},
                {"title": 'vEL', "Min duration [Hrs]": '40', "Loop Type": "Closed Loop"},
                {"title": 'vMDL [HiL 2 SiL]', "Min duration [Hrs]": '36', "Loop Type": "Closed Loop"},
                {"title": 'Closed loop validation', "Min duration [Hrs]": '487',  "Loop Type": "Closed Loop"}
            ],
            "SiL for Successive pVer (M)":[
                {"title": 'vECU OL', "Min duration [Hrs]": '115', "Loop Type": "Open Loop"},
                {"title": 'vNP creation (per channel)', "Min duration [Hrs]": '20', "Loop Type": "Open Loop"},
                {"title": 'vEL', "Min duration [Hrs]": '20', "Loop Type": "Closed Loop"},
                {"title": 'vMDL [HiL 2 SiL]', "Min duration [Hrs]": '12', "Loop Type": "Closed Loop"},
                {"title": 'Closed loop validation', "Min duration [Hrs]": '226',  "Loop Type": "Closed Loop"}],
            "SiL Series (S)":[
                {"title": 'vECU OL', "Min duration [Hrs]": '75', "Loop Type": "Open Loop"},
                {"title": 'vNP creation (per channel)', "Min duration [Hrs]": '0', "Loop Type": "Open Loop"},
                {"title": 'vEL', "Min duration [Hrs]": '10', "Loop Type": "Closed Loop"},
                {"title": 'vMDL [HiL 2 SiL]', "Min duration [Hrs]": '10', "Loop Type": "Closed Loop"},
                {"title": 'Closed loop validation', "Min duration [Hrs]": '118',  "Loop Type": "Closed Loop"}
            ]
        },
        "Test Automation Table":[
            {"title": '', "Min duration [Hrs]": '0'},
        ],
        "Maintenance Table":[
            {"title": 'Approx effort per PVER', "Duration [Hrs]": '48.4'}
        ],
        "OEM Investment":[
            {"title": 'OEM one-time payment', "Price": '10000'},
            {"title": 'OEM per delivery', "Price": '1500'}
        ],
        "SiL factory Usage Information":[
            {"title": 'Total SiL Usage', "Saved efforts with SiL factory[hr]": '50.4'}
        ],
        "CE Tests":[
            {"title": 'ComVeh  RT', "Hours": '96'},
            {"title": 'ComDia RT', "Hours": '3'},
            {"title": 'Layer RT', "Hours": '8'},
            {"title": 'BFT/ET', "Hours": '1.5'}
        ],
        "FnD Tests":[
            {"title": '', "Hours": '0'},
        ]
    }
};

function create_table_groups() {
    // get_questionnaire_response();

    // Loop through each element in the table_group array
    for (let i = 0; i < table_group.length; i++) {
        // Get the current group name from the array
        const group = table_group[i];

        // Switch case to handle specific logic for each group
        switch (group) {
            case "Standard Pricing":
                console.log("Handling Standard Pricing");
                // Code to handle "Standard Pricing" group
                tableSamples[group] = [];
                break;

            case "Various Investment Products":
                console.log("Handling Various Investment Products");
                // Code to handle "Various Investment Products" group
                tableSamples[group] = [];
                break;
            
            case "Test Automation Table":
                console.log("Handling Various Investment Products");
                // Code to handle "Various Investment Products" group
                tableSamples[group] = [];
                break;

            case "Maintenance Table":
                console.log("Handling Maintenance Table");
                // Code to handle "Maintenance Table" group
                tableSamples[group] = [];
                break;

            case "OEM Investment":
                {if(questionnaire_response["question2"].toLowerCase()==="yes"){
                    console.log("Handling Return Table");
                    // Code to handle "OEM Investment" group
                    tableSamples[group] = [];
                }
                break;
            }
            case "SiL factory Usage Information":
                console.log("SiL factory Usage Information");
                // Code to handle "SiL factory Usage Information" group
                tableSamples[group] = [];
                break;

            case "CE Tests":
                console.log("Handling CE Tests");
                // Code to handle "CE Tests" group
                tableSamples[group] = [];
                break;

            case "FnD Tests":
                console.log("Handling CE Tests");
                // Code to handle "CE Tests" group
                tableSamples[group] = [];
                break;

            // Default case for handling any unexpected group
            default:
                console.log("No specific handling for this group");
                // Code for unhandled cases
        }
    }
    console.log(`[create_table_groups] tableSamples : ${JSON.stringify( tableSamples)}`);
}

function create_tablesample(){
   
    // Iterate over the keys in tableSamples
    for (const key in tableSamples) {
        // Use switch case to handle specific keys
        switch (key) {
            case "Standard Pricing":{
                // Append "XYZ" to the "Standard Pricing" array
                // tableSamples[key].push("HCL hr rate");
                // tableSamples[key].push("LCL hr rate");
                // tableSamples[key].push("Cost of HiL lab per hour");

                std_table_value["tables"][key].forEach(item => {  // Iterate each List Index
                    // Push Title of each Dictionary
                    tableSamples[key].push(item.title)
                });
                break;
            }
            // Add more cases as needed for other keys
            case "Various Investment Products": {
                    // Append "XYZ" to the "Various Investment Products" array
                    // tableSamples[key].push("vECU OL");
                    // tableSamples[key].push("vEL");
                    // tableSamples[key].push("vNP creation (per channel)");
                    // tableSamples[key].push("ComVeh (vNP) TA Setup (OL)");
                    // tableSamples[key].push("ComDia TA Setup (OL)");
                    // tableSamples[key].push("SWSH TA Setup (OL)");
                    // if (questionnaire_response["question1"].toLowerCase()==="no" ){
                    //     tableSamples[key].push("HiL model development (from scratch)");
                    // }
                    // tableSamples[key].push("vMDL [HiL 2 SiL]");
                    // tableSamples[key].push("Closed loop validation");
                    // tableSamples[key].push("BFT/ET : TA Setup (CL)");      
                    sil_type = questionnaire_response['question3'];
                    std_table_value["tables"][key][sil_type].forEach(item => {  // Iterate each List Index
                        // Push Title of each Dictionary
                        if((questionnaire_response['question4'] === "Open Loop") && (item["Loop Type"] === "Open Loop")){
                            tableSamples[key].push(item.title);
                        }
                        else if((questionnaire_response['question4'] === "Closed Loop" ) && 
                        ((item["Loop Type"] === "Open Loop") || (item["Loop Type"] === "Closed Loop"))){
                            tableSamples[key].push(item.title);
                        }
                    });
                    break;
            }

            case "Test Automation Table":{ 
                // tableSamples[key].push("Approx effort per PVER");
                std_table_value["tables"][key].forEach(item => {  // Iterate each List Index
                    // Push Title of each Dictionary
                    tableSamples[key].push(item.title)
                });
                break;
            }

            case "Maintenance Table":{ 
                // tableSamples[key].push("Approx effort per PVER");
                std_table_value["tables"][key].forEach(item => {  // Iterate each List Index
                    // Push Title of each Dictionary
                    tableSamples[key].push(item.title)
                });
                break;
            }

            case "OEM Investment":{
                    // tableSamples[key].push("OEM one-time payment");
                    // tableSamples[key].push("OEM per delivery");
                    std_table_value["tables"][key].forEach(item => {  // Iterate each List Index
                        // Push Title of each Dictionary
                        tableSamples[key].push(item.title)
                    });
                    break;
            }

            case "SiL factory Usage Information":{
                // tableSamples[key].push("vXCU generation");
                // tableSamples[key].push("vVEH artefact generation");
                // tableSamples[key].push("vVEH Integration");
                // tableSamples[key].push("vVEH testing");
                std_table_value["tables"][key].forEach(item => {  // Iterate each List Index
                    // Push Title of each Dictionary
                    tableSamples[key].push(item.title)
                });
                break;
            }
            case "CE Tests":{
                // tableSamples[key].push("ComVeh  RT");
                // tableSamples[key].push("ComDia RT");
                // tableSamples[key].push("Layer RT");
                // tableSamples[key].push("BFT/ET");
                // tableSamples[key].push("SYSQT/SWSQT");
                std_table_value["tables"][key].forEach(item => {  // Iterate each List Index
                    // Push Title of each Dictionary
                    tableSamples[key].push(item.title)
                });
                break;
            }

            case "FnD Tests":{
                std_table_value["tables"][key].forEach(item => {  // Iterate each List Index
                    // Push Title of each Dictionary
                    tableSamples[key].push(item.title)
                })
                break;
            }
            
            default:
                console.log(`No action for ${key}`);
        }
    }

    console.log(tableSamples);
}

function get_questionnaire_response(){
    // Retrieve answers from localStorage using the new variable name
    questionnaire_response = JSON.parse(localStorage.getItem("answers"));
    console.log("questionnaire response of page 1: ", questionnaire_response);
}

// Function to create the table and handle all operations
function create_table() {
    const tablesContainer = document.getElementById("tables-container");
    document.getElementById("currency").value = default_currency_Symbol; // Sets Euro (€) as default
    tables.forEach(table => {
       // console.log(`[out] table = ${table["name"]}`);
        console.log(`[out] table = ${table.name}`);

        const isNoToQuestion2 = questionnaire_response.question2.toLowerCase() === "no";
        const isReturnTable = table.name === "OEM Investment";
        
        if (isNoToQuestion2 && isReturnTable) {
            return;
        }
        // if (!table["name"] in tableSamples){
        //     console.log(`table = ${table["name"]}`);
        //     return;
        // }
        const tableGroup = document.createElement("div");
        tableGroup.classList.add("table-group");

        // Create title + Add button container
        const headerContainer = document.createElement("div");
        headerContainer.classList.add("header-container");
        
        const groupTitle = document.createElement("div");
        groupTitle.classList.add("group-title");
        groupTitle.textContent = table.name;
        groupTitle.style.fontWeight = "bold"; // Makes text bold
        headerContainer.appendChild(groupTitle);

        if(!['Standard Pricing', 'Maintenance Table', 'OEM Investment', 'SiL factory Usage Information'].includes(table.name)){
            const addRowBtn = document.createElement("button");
            addRowBtn.classList.add("btn", "btn-sm", "btn-info");
            addRowBtn.textContent = "Add +";
            addRowBtn.onclick = () => addRow(table.name);
            headerContainer.appendChild(addRowBtn);
        }
       
        tableGroup.appendChild(headerContainer);

        // Create table
        const tableElement = document.createElement("table");
        tableElement.classList.add("table", "table-bordered");

        // Create table header
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        
        // Title column
        const titleTh = document.createElement("th");
        titleTh.textContent = "Title";
        headerRow.appendChild(titleTh);
        
        table.columns.forEach(col => {
            const th = document.createElement("th");
            th.textContent = col.column_title;
            headerRow.appendChild(th);
        });
        const emptyTh = document.createElement("th");
        emptyTh.textContent =" ";
        headerRow.appendChild(emptyTh);

        thead.appendChild(headerRow);
        tableElement.appendChild(thead);

        // Create table body
        const tbody = document.createElement("tbody");
        tbody.id = `${table.name}-tbody`;
        tableElement.appendChild(tbody);

        tableGroup.appendChild(tableElement);
        tablesContainer.appendChild(tableGroup);

        // Apply custom styles to the header cells (th) for the darker border
        Array.from(headerRow.children).forEach(th => {
            th.style.borderBottom = '2px solid #888'; // Apply bottom border with darker gray
            th.style.borderTop = '2px solid #888'; // Apply bottom border with darker gray
            th.style.padding = '8px'; // Optional: add padding to make it look cleaner
            th.style.borderLeft = 'none'; // Remove all borders from <td> elements
            th.style.borderRight = 'none'; // Remove all borders from <td> elements
            th.style.textAlign = 'center'; // Align header text to the center
            th.style.backgroundColor = '#f0f8ff';      // Light Blue background for title row
            th.style.color = '#333';                   // Dark text color for contrast
        });

        // Load predefined rows
        for (let i = 0; i < table.defaultRows; i++) {
            addRow(table.name);
        }
        // Auto-add rows from tableSamples
       if (tableSamples[table.name] ) {
            tableSamples[table.name].forEach(title => {
                addRowContents(table.name, title);
            });
        }
    });
}

// Function to add a new row with predefined contents (e.g., sample data)
function addRowContents(tableName, title = "")  {
    const table = tables.find(t => t.name === tableName);
    const tbody = document.getElementById(`${tableName}-tbody`);
    const newRow = document.createElement("tr");

    // Create Title input field with predefined title
    const titleTd = document.createElement("td");
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.classList.add("form-control");
    titleInput.value = title;
    if(title){
        titleInput.readOnly = true;
    }
    else{
        titleInput.placeholder = "Type the title here...";
    }
    
    titleTd.appendChild(titleInput);
    newRow.appendChild(titleTd);
    if (!table_inputs[tableName]){
        table_inputs[tableName]=[];
    }

    // Create columns for each field in the row (based on table columns)
    table.columns.forEach(col => {
        let std_value = 0;
        let row_info = {};
        const td = document.createElement("td");
        const input = document.createElement("input");
        // input.type = "number";
        input.type = "text";
        // input.step = col.type === "hour" ? "0.5" : col.type === "price" ? "0.01" : "0.1"; // Set step value based on column type
        // input.value = 0;

        const currencySelect = document.getElementById("currency");
        const selectedCurrency = currencySelect.options[currencySelect.selectedIndex].title;
        input.title = col.type === "hour"
            ? "Enter time in hours (e.g., 1.5 for 1 hour 30 minutes)"
            : col.type === "price"
            ? `Enter price in ${selectedCurrency} (e.g., 199.99)`
            : col.type === "percentage"
            ? "Enter percentage value (e.g., 12.5 for 12.5%)"
            : "";

        // add custom Attribute to recognized input field
        input.dataset.type = col.type;

        if (tableName === "Various Investment Products") {
            const subTable = std_table_value.tables[tableName][questionnaire_response.question3];
            if (subTable) {
                row_info = subTable.find(item => item.title === title);
                
            }
        } else {
            row_info = std_table_value.tables[tableName].find(item => item.title === title);

        }
        
        if (row_info) {
            std_value = row_info[col.column_title];
        } else {
            console.warn("No matching row found for title:", title);
            std_value = 0; // or some default value
        }
        input.value = std_value;

        input.classList.add("form-control");
        input.style.minWidth = "80px"; // Prevents input box from being too small
        input.style.flex = "1"; // Allows resizing while keeping symbol aligned

        // Special handling for "price" type column (currency symbol)
        if (col.type === "price") {
            td.style.display = "flex"; 
            td.style.alignItems = "center";
            td.style.gap = "5px"; // Ensures small space between input and currency symbol

            const span = document.createElement("span");
            span.className = "currency-symbol";
            span.textContent = document.getElementById("currency").value;
            span.style.marginLeft = "5px"; // Small gap between input and currency

            // Listen for changes to currency symbol and update accordingly
            document.getElementById("currency").addEventListener("change", (e) => {
                document.querySelectorAll(".currency-symbol").forEach(el => {
                    el.textContent = e.target.value;
                });
            });
            td.appendChild(input);
            td.appendChild(span);
            table_inputs[tableName].push(input);
        } 
        else if (col.type === "select") {
            td.style.display = "flex";
            td.style.alignItems = "center";
            td.style.gap = "5px";

            const select = document.createElement('select');
            select.setAttribute('class', "form-select");
            select.setAttribute('id', "ol_cl_select");
            select.setAttribute('name', "ol_cl_select");

            // Create placeholder option
            const placeholderOption = document.createElement("option");
            placeholderOption.textContent = "Select an option";
            placeholderOption.value = "";
            placeholderOption.disabled = true;
            placeholderOption.selected = true;
            placeholderOption.classList.add("light-placeholder"); 
            select.appendChild(placeholderOption);

            // for each on options: iterate each element to embed in selection widget   
            for (const [value, label] of Object.entries(col.options)) {
                const option = document.createElement('option');
                // option.value = value;
                // option.title = label;
                // option.textContent = label;
                option.setAttribute('value', value);
                option.setAttribute('title', label);
                option.textContent = label;
                select.appendChild(option);
            }
            td.appendChild(select);
            table_inputs[tableName].push(select);
            select.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                event.preventDefault();
                const inputs = table_inputs[tableName];
                    const currentIndex = inputs.indexOf(event.target);
                    if (currentIndex > -1 && currentIndex < inputs.length - 1) {
                            inputs[currentIndex + 1].focus();
                    }
                }
            });


        }
        else {
            td.appendChild(input);
            table_inputs[tableName].push(input);
        }

        // Add event listener for scroll to adjust input values
       // input.addEventListener("wheel", (e) => handleScroll(e, input, col.type));

        // Remove leading zeros in input field when typed
        input.addEventListener("input", () => removeLeadingZeros(input));
        input.addEventListener("blur", () => {
            let value = input.value.trim();
            console.log(`type=${typeof value}`);
        
            // 1. If empty, set to "0.00"
            if (value === "") {
                input.value = "0.00";
                return;
            }
        
            // 2. If not a valid number, skip
            if (isNaN(value)) {
                return;
            }
        
            // 3. If ends with '.', remove the dot
            if (value.endsWith('.')) {
                value = value.slice(0, -1);
            }
        
            // 4. Parse float and normalize it
            let num = parseFloat(value);
        
            // 5. Format: Remove trailing .00 or .0 or keep up to 2 decimals
            if (Number.isInteger(num)) {
                input.value = num.toString();  // No decimals
            } else {
                // Keep up to 2 decimals, remove unnecessary zeros
                input.value = parseFloat(num.toFixed(2)).toString();
            }
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
            event.preventDefault();
            const inputs = table_inputs[tableName];
                const currentIndex = inputs.indexOf(event.target);
                if (currentIndex > -1 && currentIndex < inputs.length - 1) {
                        inputs[currentIndex + 1].focus();
                }
            }
        });
 
        // input.addEventListener("wheel", (e) => handleScroll(e, input));
        newRow.appendChild(td);
    });

    // Append new row to the table body
    const actionTd = document.createElement("td");
    actionTd.style.textAlign = "center"; // Center align the delete button
    tbody.appendChild(newRow); // Add the new row to the table body

    if(!['Standard Pricing', 'Maintenance Table', 'OEM Investment', 'SiL factory Usage Information'].includes(tableName)){
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("custom-delete-btn"); 
        deleteBtn.innerHTML = ` <img src="../icon/Delete.png" alt="Delete" width="16" height="16">`; // Bootstrap trash icon
        deleteBtn.title = "Delete Row";

        // Delete Row Functionality
        deleteBtn.addEventListener("click", () => {
            newRow.remove();
        });
        actionTd.appendChild(deleteBtn);

    }
    newRow.appendChild(actionTd); // Append delete button at the end of the row
    // **Added this line to apply bottom border to the row**
    newRow.style.borderBottom = '2px solid #bbb';
    // **Remove all borders from the row's cells**
    Array.from(newRow.children).forEach(td => {
        td.style.border = 'none'; // Remove all borders from <td> elements
    });
}

// Function to remove leading zeros from the input value
function removeLeadingZeros(input) {
     //input.value = input.value.replace(/^0+(?=\d)/, ''); // Regex to remove leading zeros
     let value = input.value;
     // Remove non-numeric characters except for the decimal point
     value = value.replace(/[^0-9.]/g, '');
     
     // Remove leading zeros
     value = value.replace(/^0+(?=\d)/, '');
      
     // Count the number of decimal points
     const decimalCount = (value.match(/\./g) || []).length;
         // Ensure the value is a valid float
          if(value === ""){
              input.value = '0';
          }
          else if (decimalCount > 1) {
             value = value.slice(0, value.lastIndexOf('.')) + value.slice(value.lastIndexOf('.') + 1);
             input.value = value;
         }
         else {
             input.value = value;
          }
}

function removeNumbers(e, input) {
    if (e.key === 'Backspace') {
        e.preventDefault(); // Prevent default backspace behavior

        let start = input.selectionStart;
        let end = input.selectionEnd;
        let value = input.value;

        if (start === end && start > 0) {
            // Normal backspace: delete the character before the cursor
            value = value.slice(0, start - 1) + value.slice(end);
            console.log(`start=${start} end=${end}`)
            start--; // Move cursor one step back
        } else if (start !== end) {
            // If text is selected, delete the selected text
            value = value.slice(0, start) + value.slice(end);
        }

        // Clean up the value: allow only digits and a single dot
        let cleaned = '';
        let dotFound = false;
        for (let char of value) {
            if (char >= '0' && char <= '9') {
                cleaned += char;
            } else if (char === '.' && !dotFound) {
                cleaned += '.';
                dotFound = true;
            }
        }

        // Ensure the value is valid and has only one decimal point
        cleaned = cleaned.replace(/[^0-9.]/g, ''); // Only keep digits and a dot
        const parts = cleaned.split('.');
        if (parts.length > 2) {
            cleaned = parts[0] + '.' + parts.slice(1).join('');
        }

        // Remove leading zeros if necessary
        if (cleaned.startsWith('00')) {
            cleaned = cleaned.replace(/^0+/, '');
        } else if (cleaned.startsWith('0') && cleaned[1] !== '.' && cleaned.length > 1) {
            cleaned = cleaned.replace(/^0+/, '');
        }

        // If input is empty after delete, set to "0"
        if (cleaned === '') {
            cleaned = '0';
            start = 1; // Set cursor after "0"
        }

        input.value = cleaned;
        input.setSelectionRange(start, start);
    }
}

// Function to add a new row to the selected table
function addRow(tableName) {
    const table = tables.find(t => t.name === tableName);
    const tbody = document.getElementById(`${tableName}-tbody`);
    const newRow = document.createElement("tr");

    // Title input field
    const titleTd = document.createElement("td");
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.classList.add("form-control");
    titleInput.placeholder = "Type the title here..."
    titleTd.appendChild(titleInput);
    newRow.appendChild(titleTd);
    if (!table_inputs[tableName]){
        table_inputs[tableName]=[];
    }

    table.columns.forEach(col => {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.type = "text";
        input.step = col.type === "hour" ? "0.5" : col.type === "price" ? "0.01" : "0.1";
        input.value = 0;
        input.classList.add("form-control");
        input.style.minWidth = "80px"; // Prevents input box from being too small
        input.style.flex = "1"; // Allows resizing while keeping symbol aligned
        const currencySelect = document.getElementById("currency");
        const selectedCurrency = currencySelect.options[currencySelect.selectedIndex].title;
        input.title = col.type === "hour"
            ? "Enter time in hours (e.g., 1.5 for 1 hour 30 minutes)"
            : col.type === "price"
            ? `Enter price in ${selectedCurrency} (e.g., 199.99)`
            : col.type === "percentage"
            ? "Enter percentage value (e.g., 12.5 for 12.5%)"
            : "";

        // add custom Attribute to recognized input field
        input.dataset.type = col.type;

        // Special handling for "price" type column (currency symbol)
        if (col.type === "price") {
            td.style.display = "flex"; 
            td.style.alignItems = "center";
            td.style.gap = "5px"; // Ensures small space between input and currency symbol

            const span = document.createElement("span");
            span.className = "currency-symbol";
            span.textContent = document.getElementById("currency").value;
            span.style.marginLeft = "5px"; // Small gap between input and currency
            
            document.getElementById("currency").addEventListener("change", (e) => {
                document.querySelectorAll(".currency-symbol").forEach(el => {
                    el.textContent = e.target.value;
                });
            });
            
            td.appendChild(input);
            td.appendChild(span);
            table_inputs[tableName].push(input);
            
        }
        else if (col.type === "select") {
            td.style.display = "flex";
            td.style.alignItems = "center";
            td.style.gap = "5px";
        
            const select = document.createElement('select');
            select.setAttribute('class', "form-select");
            select.setAttribute('id', "ol_cl_select");
            select.setAttribute('name', "ol_cl_select");

             // Create placeholder option
             const placeholderOption = document.createElement("option");
             placeholderOption.textContent = "Select an option";
             placeholderOption.value = "";
             placeholderOption.disabled = true;
             placeholderOption.selected = true;
             placeholderOption.classList.add("light-placeholder"); 
             select.appendChild(placeholderOption);
 
             // for each on options: iterate each element to embed in selection widget
             
             for (const [value, label] of Object.entries(col.options)) {
                 const option = document.createElement('option');
                 // option.value = value;
                 // option.title = label;
                 // option.textContent = label;
                 option.setAttribute('value', value);
                 option.setAttribute('title', label);
                 option.textContent = label;
                 select.appendChild(option);
             }
             select.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                event.preventDefault();
                const inputs = table_inputs[tableName];
                    const currentIndex = inputs.indexOf(event.target);
                    if (currentIndex > -1 && currentIndex < inputs.length - 1) {
                            inputs[currentIndex + 1].focus();
                    }
                }
            });
             td.appendChild(select);    
             table_inputs[tableName].push(select);  
        }
        else{
            td.appendChild(input);
            table_inputs[tableName].push(input);
        }

        // input.addEventListener("wheel", (e) => handleScroll(e, input));
        // Inside the forEach loop where inputs are created
        input.addEventListener("input", () => removeLeadingZeros(input));
        
        input.addEventListener("blur", () => {
            let value = input.value.trim();
            console.log(`type=${typeof value}`);
        
            // 1. If empty, set to "0.00"
            if (value === "") {
                input.value = "0.00";
                return;
            }
            
            // 2. If not a valid number, skip
            if (isNaN(value)) {
                return;
            }
        
            // 3. If ends with '.', remove the dot
            if (value.endsWith('.')) {
                value = value.slice(0, -1);
            }
        
            // 4. Parse float and normalize it
            let num = parseFloat(value);
        
            // 5. Format: Remove trailing .00 or .0 or keep up to 2 decimals
            if (Number.isInteger(num)) {
                input.value = num.toString();  // No decimals
            } else {
                // Keep up to 2 decimals, remove unnecessary zeros
                input.value = parseFloat(num.toFixed(2)).toString();
            }
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
            event.preventDefault();
            const inputs = table_inputs[tableName];
                const currentIndex = inputs.indexOf(event.target);
                if (currentIndex > -1 && currentIndex < inputs.length - 1) {
                        inputs[currentIndex + 1].focus();
                }
            }
        });
 

        newRow.appendChild(td);
    });

    // Append new row to the table body
    const actionTd = document.createElement("td");
    actionTd.style.textAlign = "center"; // Center align the delete button

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("custom-delete-btn"); 
    deleteBtn.innerHTML = ` <img src="../icon/Delete.png" alt="Delete" width="16" height="16">`; // Bootstrap trash icon
    deleteBtn.title = "Delete Row";

    // Delete Row Functionality
    deleteBtn.addEventListener("click", () => {
        newRow.remove();
    });

    actionTd.appendChild(deleteBtn);
    newRow.style.borderBottom = '2px solid #bbb';
    newRow.appendChild(actionTd); // Append delete button at the end of the row
    Array.from(newRow.children).forEach(td => {
        td.style.border = 'none'; // Remove all borders from <td> elements
    });
    // Append new row to tbody
    tbody.appendChild(newRow);
}

// Handle scroll event for value change
function handleScroll(e, input) {
    // Only modify if input is focused AND cursor is hovering over it
    if (document.activeElement !== input || !input.matches(':hover')) return
  
    // Prevent page from scrolling
    e.preventDefault();
  
    const type = input.dataset.type;
    const step = type === "hour" ? 0.5 : type === "price" ? 0.01 : 0.1;
    const precision = step < 1 ? 2 : 1;
  
    let currentValue = parseFloat(input.value) || 0;
  
    // Adjust value based on scroll direction
    if (e.deltaY > 0 && currentValue > 0) {
      currentValue += step;
    } else if (e.deltaY < 0) {
      currentValue -= step;
    }
  
    // Prevent negative values
    currentValue = Math.max(0, currentValue);
  
    // Update input value with proper precision
    input.value = currentValue.toFixed(precision);
  }
  

// Update currency symbol dynamically
function updateCurrencySymbol(input) {
    const currencySymbol = document.getElementById("currency").value;
    input.value = `${parseFloat(input.value).toFixed(2)} ${currencySymbol}`;
}

// Change currency in all price inputs when updated
function changeCurrency() {
    const currencySymbol = document.getElementById("currency").value;
    document.querySelectorAll("input[type='number']").forEach(input => {
        if (input.parentElement.previousElementSibling && input.parentElement.previousElementSibling.textContent === "Price") {
            updateCurrencySymbol(input);
        }
    });

    const currencySelect = document.getElementById("currency");
    const selectedCurrency = currencySelect.options[currencySelect.selectedIndex].title;
    
    // Price inputs
    document.querySelectorAll('input[data-type="price"]').forEach(input => {
        input.title = `Enter price in ${selectedCurrency} (e.g., 199.99)`;
    });
    
}

// Function to collect table data and store in local storage
function saveTableData() {
    const tablesData = {};
    const selectedCurrency = document.getElementById("currency").value;

    tables.forEach(table => {
        const isNoToQuestion2 = questionnaire_response.question2.toLowerCase() === "no";
        const isReturnTable = table.name === "OEM Investment";
        
        if (isNoToQuestion2 && isReturnTable) {
            return;
        }
        const tbody = document.getElementById(`${table.name}-tbody`);
        const rows = tbody.getElementsByTagName("tr");
        const tableData = [];

        for (let row of rows) {
            const titleInput = row.cells[0].querySelector("input"); // First column (Title)
            if (!titleInput || titleInput.value.trim() === "") {
                continue; // Skip if title is empty
            }

            const rowData = { title: titleInput.value.trim() };

            table.columns.forEach((col, index) => {
                const input = row.cells[index + 1].querySelector("input"); // Adjust for title column
                if (input) {
                    rowData[col.column_title] = input.value.trim();
                }
                const select_input = row.cells[index + 1].querySelector("select"); // Adjust for title column
                if (select_input) {
                    rowData[col.column_title] = select_input.value.trim();
                }
            });

            tableData.push(rowData);
        }

        tablesData[table.name] = tableData;
    });

    // Save both table data and currency symbol
    const savedData = {
        currency: selectedCurrency,
        tables: tablesData
    };

    localStorage.setItem("tableData", JSON.stringify(savedData));
    console.log("Table data saved:", savedData);

    // Redirect to Page 4 after saving
    window.location.href = "../modified_pg3/page3.html";
}

function updateProjectName(newName) {
    const projectTitle = document.querySelector(".project-name"); // Select the project name element
    if (projectTitle) {
        projectTitle.textContent = `Project: ${newName}`; // Update the text
    }
}

document.getElementById("currency").addEventListener("change", changeCurrency);

// Function to retrieve table info from localStorage
function get_table_info(){
    table_info = JSON.parse(localStorage.getItem("tableData"));
    console.log("table info of page 3: ", table_info);
}

// Function to add a new row with predefined contents (e.g., sample data)
function addRowContents_withVal(tableName, title = "")  {
    const table = tables.find(t => t.name === tableName);
    const tbody = document.getElementById(`${tableName}-tbody`);
    const newRow = document.createElement("tr");

    const table_row_data=table_info.tables[tableName].find(t => t.title === title);
    // Create Title input field with predefined title
    const titleTd = document.createElement("td");
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.classList.add("form-control");
    titleInput.value = title;
    titleInput.readOnly = true;
    titleTd.appendChild(titleInput);
    newRow.appendChild(titleTd);
    if (!table_inputs[tableName]){
        table_inputs[tableName]=[];
    }

    // Create columns for each field in the row (based on table columns)
    table.columns.forEach(col => {
        const td = document.createElement("td");

        const input = document.createElement("input");
        // input.type = "number";
        input.type = "text";
        // input.step = col.type === "hour" ? "0.5" : col.type === "price" ? "0.01" : "0.1"; // Set step value based on column type
        //input.value = 0;
        input.value = table_row_data[col['column_title']];
        input.classList.add("form-control");
        input.style.minWidth = "80px"; // Prevents input box from being too small
        input.style.flex = "1"; // Allows resizing while keeping symbol aligned
        const currencySelect = document.getElementById("currency");
        const selectedCurrency = currencySelect.options[currencySelect.selectedIndex].title;
        input.title = col.type === "hour"
            ? "Enter time in hours (e.g., 1.5 for 1 hour 30 minutes)"
            : col.type === "price"
            ? `Enter price in ${selectedCurrency} (e.g., 199.99)`
            : col.type === "percentage"
            ? "Enter percentage value (e.g., 12.5 for 12.5%)"
            : "";

        // add custom Attribute to recognized input field
        input.dataset.type = col.type;

        // Special handling for "price" type column (currency symbol)
        if (col.type === "price") {
            td.style.display = "flex"; 
            td.style.alignItems = "center";
            td.style.gap = "5px"; // Ensures small space between input and currency symbol

            const span = document.createElement("span");
            span.className = "currency-symbol";
            span.textContent = document.getElementById("currency").value;
            span.style.marginLeft = "5px"; // Small gap between input and currency

            // Listen for changes to currency symbol and update accordingly
            document.getElementById("currency").addEventListener("change", (e) => {
                document.querySelectorAll(".currency-symbol").forEach(el => {
                    el.textContent = e.target.value;
                });
            });
            td.appendChild(input);
            td.appendChild(span);
            table_inputs[tableName].push(input);
        } 
        else if (col.type === "select") {
            td.style.display = "flex";
            td.style.alignItems = "center";
            td.style.gap = "5px";
        
            
            const select = document.createElement('select');
            select.setAttribute('class', "form-select");
            select.setAttribute('id', "ol_cl_select");
            select.setAttribute('name', "ol_cl_select");
            
            
            // Create placeholder option
            const placeholderOption = document.createElement("option");
            placeholderOption.textContent = "Select an option";
            placeholderOption.value = "";
            placeholderOption.disabled = true;
            placeholderOption.selected = true;
            placeholderOption.classList.add("light-placeholder"); 
            select.appendChild(placeholderOption);

            // for each on options: iterate each element to embed in selection widget
            
            for (const [value, label] of Object.entries(col.options)) {
                const option = document.createElement('option');
                // option.value = value;
                // option.title = label;
                // option.textContent = label;
                option.setAttribute('value', value);
                option.setAttribute('title', label);
                option.textContent = label;
                select.appendChild(option);
            }
            td.appendChild(select);
            table_inputs[tableName].push(select);
            select.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                event.preventDefault();
                const inputs = table_inputs[tableName];
                    const currentIndex = inputs.indexOf(event.target);
                    if (currentIndex > -1 && currentIndex < inputs.length - 1) {
                            inputs[currentIndex + 1].focus();
                    }
                }
            });
            select.value=table_row_data[col['column_title']];
        }
        else {
            td.appendChild(input);
            table_inputs[tableName].push(input);
            
        }

        // Add event listener for scroll to adjust input values
       // input.addEventListener("wheel", (e) => handleScroll(e, input, col.type));

        // Remove leading zeros in input field when typed
        input.addEventListener("input", () => removeLeadingZeros(input));
        input.addEventListener("blur", () => {
            let value = input.value.trim();
            console.log(`type=${typeof value}`);
        
            // 1. If empty, set to "0.00"
            if (value === "") {
                input.value = "0.00";
                return;
            }
        
            // 2. If not a valid number, skip
            if (isNaN(value)) {
                return;
            }
        
            // 3. If ends with '.', remove the dot
            if (value.endsWith('.')) {
                value = value.slice(0, -1);
            }
        
            // 4. Parse float and normalize it
            let num = parseFloat(value);
        
            // 5. Format: Remove trailing .00 or .0 or keep up to 2 decimals
            if (Number.isInteger(num)) {
                input.value = num.toString();  // No decimals
            } else {
                // Keep up to 2 decimals, remove unnecessary zeros
                input.value = parseFloat(num.toFixed(2)).toString();
            }
        });
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
            event.preventDefault();
            const inputs = table_inputs[tableName];
                const currentIndex = inputs.indexOf(event.target);
                if (currentIndex > -1 && currentIndex < inputs.length - 1) {
                        inputs[currentIndex + 1].focus();
                }
            }
        });
        // input.addEventListener("wheel", (e) => handleScroll(e, input));

        newRow.appendChild(td);
    });

    // Append new row to the table body
    const actionTd = document.createElement("td");
    actionTd.style.textAlign = "center"; // Center align the delete button
    tbody.appendChild(newRow); // Add the new row to the table body
    if(!['Standard Pricing', 'Maintenance Table', 'OEM Investment', "SiL factory Usage Information"].includes(tableName)){
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("custom-delete-btn"); 
        deleteBtn.innerHTML = ` <img src="../icon/Delete.png" alt="Delete" width="16" height="16">`; // Bootstrap trash icon
        deleteBtn.title = "Delete Row";

        // Delete Row Functionality
        deleteBtn.addEventListener("click", () => {
            newRow.remove();
        });

        actionTd.appendChild(deleteBtn);
    }
   
    newRow.appendChild(actionTd); // Append delete button at the end of the row
    // **Added this line to apply bottom border to the row**
    newRow.style.borderBottom = '2px solid #bbb';
    // **Remove all borders from the row's cells**
    Array.from(newRow.children).forEach(td => {
        td.style.border = 'none'; // Remove all borders from <td> elements
    });
}

function reload_table_info(){
    index=0;
    const tablesContainer = document.getElementById("tables-container");
    table_group.forEach(tableGroupName=>{
        if (tableGroupName in table_info.tables) {
            // Key exists
            console.log("Key exists:", tableGroupName);
            const tableGroup = document.createElement("div");
            tableGroup.classList.add("table-group");
    
            // Create title + Add button container
            const headerContainer = document.createElement("div");
            headerContainer.classList.add("header-container");
            
            const groupTitle = document.createElement("div");
            groupTitle.classList.add("group-title");
            groupTitle.textContent = tableGroupName;
            groupTitle.style.fontWeight = "bold"; // Makes text bold
            headerContainer.appendChild(groupTitle);

            if(!['Standard Pricing', 'Maintenance Table', 'OEM Investment', 'SiL factory Usage Information'].includes(tableGroupName)){
                const addRowBtn = document.createElement("button");
                addRowBtn.classList.add("btn", "btn-sm", "btn-info");
                addRowBtn.textContent = "Add +";
                addRowBtn.onclick = () => addRow(tableGroupName);
                headerContainer.appendChild(addRowBtn);
            }
            tableGroup.appendChild(headerContainer);
    
            // Create table
            const tableElement = document.createElement("table");
            tableElement.classList.add("table", "table-bordered");

            // Create table header
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");
            
            // Title column
            const titleTh = document.createElement("th");
            titleTh.textContent = "Title";
            headerRow.appendChild(titleTh);

            for(let i=0;i<tables.length;i++){
                if(tables[i]["name"]===tableGroupName){
                    tables[i].columns.forEach(col => {
                        const th = document.createElement("th");
                        th.textContent = col.column_title;
                        headerRow.appendChild(th);
                    });
                    const emptyTh = document.createElement("th");
                    emptyTh.textContent =" ";
                    headerRow.appendChild(emptyTh);
            
                    thead.appendChild(headerRow);
                    tableElement.appendChild(thead);
                    // break;
                }
            }
            // Create table body
            const tbody = document.createElement("tbody");
            tbody.id = `${tableGroupName}-tbody`;
            tableElement.appendChild(tbody);

            tableGroup.appendChild(tableElement);
            tablesContainer.appendChild(tableGroup);

            // Apply custom styles to the header cells (th) for the darker border
            Array.from(headerRow.children).forEach(th => {
                th.style.borderBottom = '2px solid #888'; // Apply bottom border with darker gray
                th.style.borderTop = '2px solid #888'; // Apply bottom border with darker gray
                th.style.padding = '8px'; // Optional: add padding to make it look cleaner
                th.style.borderLeft = 'none'; // Remove all borders from <td> elements
                th.style.borderRight = 'none'; // Remove all borders from <td> elements
                th.style.textAlign = 'center'; // Align header text to the center
                th.style.backgroundColor = '#f0f8ff';      // Light Blue background for title row
                th.style.color = '#333';                   // Dark text color for contrast
            });

            const tableRows = table_info.tables[tableGroupName];

            // If the table group is empty, perform your custom operation
            if (!tableRows || tableRows.length === 0) {
                console.log(`${tableGroupName} is empty.`);
                // Perform your operation here
                addRow(tableGroupName);
            } else {
                // Otherwise, process each row as usual
                tableRows.forEach(row => {
                    if (row) {
                        addRowContents_withVal(tableGroupName, row['title']);
                    } 
                });
            }
        }
   });      
}

function reload_tables(){
    get_table_info()
    // table_info
    //update currency value
    document.getElementById("currency").value=table_info.currency;
    changeCurrency();

    reload_table_info();
}

function update_page_status(page_name){
    localStorage.setItem('page_status',page_name);
}

// Retrieves the current value of 'page_status' from localStorage
function getPageStatus() {
    const data = JSON.parse(localStorage.getItem("status"));
    console.log("PageStatus: ", data);
    // Return the page_status if it exists, otherwise return null
    return data?.page_status || null;
}

// Updates the 'page_status' field in localStorage under the 'status' key
function updatePageStatus(newStatus) {
    // Retrieve existing status object or initialize a new one
    let data = JSON.parse(localStorage.getItem("status")) || {};
    // Update the page_status field
    data.page_status = newStatus;
    // Save the updated object back to localStorage
    localStorage.setItem("status", JSON.stringify(data));
}
// Retrieves the current value of 'uploaded_file_status' from localStorage
function getUploadedFileStatus() {
    const data = JSON.parse(localStorage.getItem("status"));
    console.log("uploaded_file_status: ", data);
    // Return the uploaded_file_status if it exists, otherwise return null
    return data?.uploaded_file_status ?? null;
}

// Retrieves the current value of 'table_info' from localStorage
function getStdTableInfo() {
    const data = JSON.parse(localStorage.getItem("table_info")) ?? null;
    console.log("uploaded_table_info: ", data);
    return data;
}
window.onload = () => {
    let status = localStorage.getItem('page_status');
    console.log(`page_status=${status}`);

    get_questionnaire_response(); 

    // fetch status of page 1
    console.log("Page status value in main:", getPageStatus());
    if(getUploadedFileStatus()){
        std_table_value = getStdTableInfo();
    }
    if (questionnaire_response && questionnaire_response.project_name) {
        updateProjectName(questionnaire_response.project_name); // Update project name
    }
    updatePageStatus("page_2");
    if (status === "page_3")
    {
        reload_tables();
    }
    else{
        // get_questionnaire_response();
        
        create_table_groups();
        create_tablesample();  
        create_table();
    }

};
