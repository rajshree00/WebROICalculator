let table_info ={};// Store additional table info like currency
let questionnaire_response = {}; // Store the questionnaire response data
let color_codes = [
   "#EF5A5A",  //Top stripe - Soft Red
    "#FBC655",  //2nd stripe - Golden Yellow
    "#9DD378",  //3rd stripe - Light Green
    "#5475CC",  //4th stripe - Periwinkle Blue
    "#F27AD2",  //5th stripe - Light Pink
    "#A764B8",  //6th stripe - Lavender Purple
    "#FF8040",  //7th stripe - Soft Orange
    "#3BA675",  //8th stripe - Teal Green
    "#7DCCE6"   // Bottom stripe - Sky Blue
];
var color_index = 0;
// Main entry point: Executes when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Check if Plotly is loaded; if not, log an error and stop execution
    // if (typeof Plotly === "undefined") {
    //     console.error("Plotly is not loaded. Make sure you include the CDN in your HTML.");
    //     return;
    // }

    // Fetch questionnaire responses and table data
    get_questionnaire_response();
    get_table_info();

    // Update the current page status (e.g., for navigation or progress tracking)
    update_page_status('page_3');

    // If a project name is available in the response, update it in the UI
    if (questionnaire_response && questionnaire_response.project_name) {
        updateProjectName(questionnaire_response.project_name); // Update project name if available
        // updateProjectName(questionnaire_response["project_name"]); // Update project name if available
    }

    // update Homw button listner
    let new_project = document.getElementById("new_project");
    new_project.onclick = () =>{
        // remove all elements form questionarie responce
        let answer = JSON.parse(localStorage.getItem('answers'));
        for (let key in answer) {
            delete answer[key];
        }
        localStorage.setItem('answers', JSON.stringify(answer));
 
        // go tto home page
        window.location.href='../index.html';
 
    };
    
    // Generate charts based on the questionnaire responses
    createCharts();

    // Store the initial device pixel ratio to detect zoom changes later
    let lastDevicePixelRatio = window.devicePixelRatio;

    
    // Function to dynamically update the chart size based on the window dimensions
    function updateChartSize() {
        // Calculate new width as 80% of the window's width
        let newWidth = window.innerWidth * 0.8; // Set new chart width
        // Calculate new height as 60% of the window's height
        let newHeight = window.innerHeight * 0.6; // Set new chart height
        
        // If the chart exists, apply the new width and height using Plotly's relayout
        let chartElement = document.getElementById("chart2");
        if (chartElement) {
            // Plotly.relayout(chartElement, { width: newWidth, height: newHeight });
            const ab=0;
        }
    }

    // Function to detect browser zoom changes and re-render charts accordingly.
    function detectZoom() {
        // Check if the device pixel ratio has changed (indicating a zoom event)
        if (window.devicePixelRatio !== lastDevicePixelRatio) {
            // Update the stored pixel ratio
            lastDevicePixelRatio = window.devicePixelRatio;

            // ✅ Force complete re-render of charts to adjust for zoom 
            let chartElement = document.getElementById("chart2");
            if (chartElement) {
                // Plotly.purge("chart2");
                const ab = 0;
            }

            // Redraw all charts with updated scaling
            // createCharts(); 
        }
    }

    updatePageStatus("page_3");
    // Adjust chart size dynamically when the window is resized
    window.addEventListener("resize", updateChartSize); 
    setInterval(detectZoom, 500); // Check zoom every 500ms
});

// Function to create and resize charts based on questionnaire responses
function createCharts(){
    // Retrieve responses and form scenario key
    let isExisting = questionnaire_response["question1"].toLowerCase();     // "yes" or "no"
    let isSponsored = questionnaire_response["question2"].toLowerCase();    // "yes" or "no"

    // Form a scenario key based on the responses (e.g., "yes_no", "no_yes")
    let key = `${isExisting}_${isSponsored}`; // e.g., "yes_no" 

    
    // Resize Chart 2 if it exists in the DOM
    let chartElement = document.getElementById("chart2");
    if (chartElement) {
        Plotly.Plots.resize('chart2');
    }

    // --- Chart 2: With SiL Factory Plot ---
    create_with_SIL_Factory(key);
}

// function to get the questionnaire_response(
function get_questionnaire_response(){
    questionnaire_response = JSON.parse(localStorage.getItem("answers"));
    console.log("questionnaire response of page 1: ", questionnaire_response);
};

// Function to retrieve table info from localStorage
function get_table_info(){
    table_info = JSON.parse(localStorage.getItem("tableData"));
    console.log("table info of page 3: ", table_info)

    // Accessing "Various Investment Products" from the saved data
    const variousInvestmentProducts = table_info.tables["Various Investment Products"];

    variousInvestmentProducts.forEach(item => {
        // Convert string to float
        const minDuration = parseFloat(item["Min duration [Hrs]"]);
        const maxDuration = parseFloat(item["Max Duration [Hrs]"]);
    
        // Check if conversion was successful
        if (!isNaN(minDuration) && !isNaN(maxDuration)) {
            console.log(`Min Duration: ${minDuration}, Max Duration: ${maxDuration}`);
    
            // Example operation: calculating duration range
            const durationRange = maxDuration - minDuration;
            console.log(`Duration Range: ${durationRange} hours`);
        } else {
            console.log(`Invalid data for ${item.title}`);
        }});
}

//NEW LOGIC*************************************

// Function to update the displayed project name in the UI
function updateProjectName(newName) {
    const projectTitle = document.querySelector(".project-name"); // Select the project name element
    if (projectTitle) {
        projectTitle.textContent = `Project: ${newName}`; // Update the text
        console.log("projectTitle:", `Project: ${newName}`);
    }
}

// Function to update the SiL Factory lot with all investment information 
function create_with_SIL_Factory(key){     
   // Initialize an empty object to store trace data for different test titles
    let Trace_collection = {}; // Example structure: { legend_1: [], legend_2: [], ... }
    let Traces = [];
    
    // Extract standard pricing values from the "Standard Pricing" table
    const Cost_ofHIL = parseFloat(table_info.tables["Standard Pricing"][2]["Rate"]); // Cost of HIL (Hardware-in-the-Loop)
    const lcl = parseFloat(table_info.tables["Standard Pricing"][1]["Rate"]); // Lower cost level
    const hcl = parseFloat(table_info.tables["Standard Pricing"][0]["Rate"]); // Higher cost level
    
    // Initialize the CE Tests data entry in the Trace_collection dictionary
    table_info.tables["CE Tests"].forEach(item => {
        const title = item.title;
        
        // Check if the item has a title
        if (title) {
            const hours = parseFloat(item["Hours"]);
            const cost = parseFloat((hours * Cost_ofHIL).toFixed(2));
            // If the title doesn't already exist in Trace_collection, initialize it as an empty array
            if (!Trace_collection[title]) {
                Trace_collection[title] = [];
            }

            // Push the calculated cost into the corresponding array in Trace_collection
            Trace_collection[title].push(cost);
        }
    });

    // Iterate through each item in the FnD Tests table to initialize and populate the Trace_collection dictionary
    table_info.tables["FnD Tests"].forEach(item => {
        const title = item.title;

        // Check if the item has a title
        if (title) {
            const hours = parseFloat(item["Hours"]);
            const cost = parseFloat((hours * Cost_ofHIL).toFixed(2));
            // If the title doesn't already exist in Trace_collection, initialize it as an empty array
            if (!Trace_collection[title]) {
                Trace_collection[title] = [];
            }

            // Push the calculated cost into the corresponding array in Trace_collection
            Trace_collection[title].push(cost);
        }
    });

    // Function to create a dataset of 50 values, each a multiple of the input value
    function create_green_bar_dataset(val) {
        let data = [];
        for (let i = 0; i < 50; i++) {
            data.push(parseFloat((val * (i + 1)).toFixed(2))); // Multiply val by 1 through 50
        }
        return data;
    }

    // Iterate over each entry in Trace_collection
    Object.entries(Trace_collection).forEach(([legendName, values]) => {
        // Use the first value in the array to generate the dataset
        const data_entries = create_green_bar_dataset(values[0]);

        // Store the generated dataset in the legends object
        Trace_collection[legendName] = data_entries;

        // Log the result to the console
        console.log(`Trace_collection[${legendName}] = ${Trace_collection[legendName]}`);
    });

    // === Step 1: Prepare X-axis values ===
    // Generate an array [1, 2, ..., N] where N is the length of the dataset created by create_dataset(2)
    const x_values = Array.from({ length: create_green_bar_dataset(2).length }, (_, i) => i + 1);

    // === Step 2: Define chart layout ===
    let layout = {
        title: "BEP - Timeline to Get Back ROI (WITH SIL)", // Chart title
        height: 700, // Set your desired height here
        
        barmode: "stack", // Stack bars on top of each other
        yaxis: {
            ticksuffix: ` ${table_info.currency}`, // Add currency symbol after each tick
            tickformat: "," // Format ticks with commas and 2 decimal places
        },
        dragmode: "zoom", // Enable zooming by dragging
        scrollZoom: true, // Enable zooming with scroll
        autosize: true, // Auto-resize chart with window
        responsive: true // Make chart responsive on different devices
    };

    // === Step 3: Create trace for SiL factory data ===
    const SIL_Factory_trace = create_SiL_Trace(); 
    color_index+=1;
    Object.entries(Trace_collection).forEach( ([legendName, values]) => {
        
        const trace = {  
            x: x_values,
            y: values, 
            type: "bar", 
            name: `${legendName} (${table_info.currency})`,
            marker: { color: color_codes[(color_index % color_codes.length)] }
        };

        Traces.push(trace);
        color_index+=1;
    });

    Traces.push(SIL_Factory_trace);

    // add investment trace 
    const investment_line_chart = create_investment_trace(key, hcl, lcl, Cost_ofHIL);
    Traces.push(investment_line_chart);

    // === Step 4: Prepare chart container ===
    const chartView = document.getElementById("chart-view-2");

    // Create a new div for the chart
    const chart2 = document.createElement("div");
    chart2.id = "chart2";
    // Optional: Add styling class
    // chart2.className = "mb-3";

    // Append the chart container to the view
    chartView.appendChild(chart2);

    // === Step 5: Plot the chart ===
    // NOTE: OL_Trace must include SIL_Factory_trace or other traces you want to show
    Plotly.newPlot('chart2', Traces, layout, { responsive: true });

}
  
// Collect SiL factory bar chart data
function create_SiL_Trace(){
    
    // init SIL Factory variables
    let Sil_factory_data=[];
    // Find the entry in the "SiL factory Usage Information" table where the title is "Total SiL Usage"
    const sil_entry = table_info.tables["SiL factory Usage Information"].find(
        item => item.title === "Total SiL Usage"
    );

    // Extract the saved effort value (in hours) and convert it to a float
    const total_sil_usage = parseFloat(
        sil_entry["Saved efforts with SiL factory to perform this task [hr]"]
    );

    const lcl = parseFloat(table_info.tables["Standard Pricing"][1]["Rate"]); // Lower cost level

    // Function to create a dataset of 50 values, each a multiple of the input value
    function create_green_bar_dataset(val) {
        let data = [];
        for (let i = 0; i < 50; i++) {
            data.push(parseFloat((val * (i + 1)).toFixed(2))); // Multiply val by 1 through 50
        }
        return data;
    }

    // Generate a dataset for the bar chart using the total SiL usage value
    Sil_factory_data = create_green_bar_dataset((total_sil_usage * lcl));
    console.log(`SiL Factory Data = ${Sil_factory_data}`);

    // Generate an array [1, 2, ..., N] where N is the length of the dataset created by create_dataset(2)
    const x_values = Array.from({ length: create_green_bar_dataset(2).length }, (_, i) => i + 1);

    // === Step 3: Create trace for SiL factory data ===
    let SIL_Factory_trace = {
        x: x_values,
        y: Sil_factory_data,
        type: "bar",
        name: `SiL factory (${table_info.currency})`,
        // Optional: Add color styling
        marker: { color: color_codes[(color_index % color_codes.length)] }
    };

    // color_index += 1;
    return SIL_Factory_trace;
}


// Collect line chart data for invested product
function create_investment_trace(key, hcl, lcl, Cost_ofHIL) {
    // Initialize an empty array to store investment data points for the chart
    let investment_data = [];

    // Placeholder for the legend name used in the chart
    let legend_name = "";

    // Variable to track the current cost in the investment calculation
    let current_cost = 0;
    let efforts_in_hrs = 0;

    // Variable to store previously calculated savings, used for comparison or accumulation
    let previous_savings = 0;

    // Extract the effort hours from the "Maintenance Table" (assumes only one row is relevant)
    const appX_effort_hrs = parseFloat(table_info.tables["Maintenance Table"][0]["Duration [Hrs]"]);

    // Calculate the estimated effort cost using the lower cost level (LCL)
    const effort_cost_est = parseFloat((lcl * appX_effort_hrs).toFixed(2));

    // Initialize OEM investment values
    let one_time_payment = 0;     // One-time payment to OEM
    let oem_per_delivery = 0;     // Recurring cost per delivery to OEM

    // Check if the user answered "yes" to question 2 in the questionnaire
    if (questionnaire_response.question2.toLowerCase() === "yes") {
        // If yes, extract OEM investment values from the table
        one_time_payment = parseFloat(table_info.tables["OEM Investment"][0]["Price"]);
        oem_per_delivery = parseFloat(table_info.tables["OEM Investment"][1]["Price"]);
    }

    // Helper function to generate a dataset of 50 values, each a multiple of the input value
    function create_green_bar_dataset(val) {
        let data = [];
        for (let i = 0; i < 50; i++) {
            data.push(val * (i + 1)); // Generate values: val * 1, val * 2, ..., val * 50
        }
        return data;
    }

    // Initialize an empty array to store combined investment-related data
    let investment_information = [];

    // Loop through each row in the "Various Investment Products" table
    table_info.tables["Various Investment Products"].forEach(row => {
        if (row) {
            // Add non-null rows to the investment_information array
            investment_information.push(row);
        }
    });

    // Loop through each row in the "FnD Tests" table
    table_info.tables["Test Automation Table"].forEach(row => {
        if (row) {
            // Add non-null rows to the investment_information array
            investment_information.push(row);
        }
    });

    console.log("investment Information list :", investment_information);    
    // Get the total number of rows combined from both "Various Investment Products" and "FnD Tests"
    const table_length = investment_information.length;
    console.log("investment Information list length :", table_length);

    // Handle different investment scenarios based on the key
    switch (key) {
        case "yes_yes": {
            console.log("[Scenario] Existing project WITH OEM sponsorship");

            // Update chart title in the UI
            document.querySelector('#chart-title-2 h3').textContent = "Existing project (WITH OEM sponsor)";

            // Loop through 50 iterations to simulate investment progression
            for (let i = 0; i < 50; i++) {
                if (i < table_length) {
                    // If within the range of available investment data
                    if (!(table_length - i == 1)) {
                        // For all but the last row in the table
                        efforts_in_hrs = parseFloat(investment_information[i]["Min duration [Hrs]"]);
                        current_cost = parseFloat(((efforts_in_hrs * lcl) + previous_savings).toFixed(2));

                        console.log(`[Iteration ${i + 1}] Investment Cost: €${current_cost}`);
                        
                        // Add the current cost to the investment_data array for plotting or further analysis
                        investment_data.push(current_cost);
                        // Update the previous_savings variable to carry this cost into the next iteration
                        previous_savings = current_cost;
                    } else {
                        // Special handling for the last row: subtract one-time OEM payment
                        efforts_in_hrs = parseFloat(investment_information[i]["Min duration [Hrs]"]);
                        current_cost = parseFloat((previous_savings + (efforts_in_hrs * lcl) - one_time_payment).toFixed(2));

                        console.log(`[Threshold Reached @ Iteration ${i + 1}] Investment Cost: €${current_cost}`);
                        // Add the current cost to the investment_data array for plotting or further analysis
                        investment_data.push(current_cost);
                        // Update the previous_savings variable to carry this cost into the next iteration
                        previous_savings = current_cost;
                    }
                } else {
                    // After all table data is used, continue estimating using average effort cost
                    current_cost = parseFloat((previous_savings + effort_cost_est - oem_per_delivery).toFixed(2));

                    console.log(`[Post-Threshold Iteration ${i + 1}] Updated Cost: €${current_cost}`);
                    // Add the current cost to the investment_data array for plotting or further analysis
                    investment_data.push(current_cost);
                    // Update the previous_savings variable to carry this cost into the next iteration
                    previous_savings = current_cost;
                }
            }

            // Set the legend name for the chart to indicate the scenario includes OEM sponsorship
            legend_name ="With OEM : Total Investment";
            break;
        }

        case "yes_no": {
            console.log("[Scenario] Existing project WITHOUT OEM sponsorship");

            // Update chart title in the UI
            document.querySelector('#chart-title-2 h3').textContent = "Existing project (WITHOUT OEM sponsor)";

            // Loop through 50 iterations to simulate investment progression
            for (let i = 0; i < 50; i++) {
                if (i < table_length){
                    // If within the range of available investment data
                    if (!(table_length - i == 1)){
                        // For all but the last row in the table
                        efforts_in_hrs = parseFloat(investment_information[i]["Min duration [Hrs]"]);
                        current_cost = parseFloat(((efforts_in_hrs * lcl) + previous_savings).toFixed(2));

                        console.log(`[Iteration ${i + 1}] Investment Cost: €${current_cost}`);
                        
                        // Add the current cost to the investment_data array for plotting or further analysis
                        investment_data.push(current_cost);
                        // Update the previous_savings variable to carry this cost into the next iteration
                        previous_savings = current_cost;
                    }
                    else{
                        // Special handling for the last row: subtract one-time OEM payment
                        efforts_in_hrs = parseFloat(investment_information[i]["Min duration [Hrs]"]);
                        current_cost = parseFloat((previous_savings + (efforts_in_hrs * lcl)).toFixed(2));

                        console.log(`[Threshold Reached @ Iteration ${i + 1}] Investment Cost: €${current_cost}`);
                        // Add the current cost to the investment_data array for plotting or further analysis
                        investment_data.push(current_cost);
                        // Update the previous_savings variable to carry this cost into the next iteration
                        previous_savings = current_cost;
                    }
                }
                else{
                    // After all table data is used, continue estimating using average effort cost
                    current_cost = parseFloat((previous_savings + effort_cost_est).toFixed(2));

                    console.log(`[Post-Threshold Iteration ${i + 1}] Updated Cost: €${current_cost}`);
                    // Add the current cost to the investment_data array for plotting or further analysis
                    investment_data.push(current_cost);
                    // Update the previous_savings variable to carry this cost into the next iteration
                    previous_savings = current_cost;
                }
            }

            // Set the legend name for the chart to indicate the scenario includes OEM sponsorship
            legend_name ="RB : Total Investment";
            break;
        }

        case "no_yes": {
            console.log("Scenario 3: New project with sponsorship");

            // Update chart title in the UI
            document.querySelector('#chart-title-2 h3').textContent = "New project (WITH OEM sponsor)";

            // Loop through 50 iterations to simulate investment progression
            for (let i = 0; i < 50; i++) {
                if (i < table_length){
                    // If within the range of available investment data
                    if (!(table_length - i == 1)){
                        // For all but the last row in the table
                        efforts_in_hrs = parseFloat(investment_information[i]["Min duration [Hrs]"]);
                        current_cost = parseFloat(((efforts_in_hrs * lcl) + previous_savings).toFixed(2));

                        console.log(`[Iteration ${i + 1}] Investment Cost: €${current_cost}`);
                        
                        // Add the current cost to the investment_data array for plotting or further analysis
                        investment_data.push(current_cost);
                        // Update the previous_savings variable to carry this cost into the next iteration
                        previous_savings = current_cost;
                    }
                    else{
                        // Special handling for the last row: subtract one-time OEM payment
                        efforts_in_hrs = parseFloat(investment_information[i]["Min duration [Hrs]"]);
                        current_cost = parseFloat((previous_savings + (efforts_in_hrs * lcl) - one_time_payment).toFixed(2));

                        console.log(`[Threshold Reached @ Iteration ${i + 1}] Investment Cost: €${current_cost}`);
                        // Add the current cost to the investment_data array for plotting or further analysis
                        investment_data.push(current_cost);
                        // Update the previous_savings variable to carry this cost into the next iteration
                        previous_savings = current_cost;
                    }
                }
                else{
                    // After all table data is used, continue estimating using average effort cost
                    current_cost = parseFloat((previous_savings + effort_cost_est - oem_per_delivery).toFixed(2));

                    console.log(`[Post-Threshold Iteration ${i + 1}] Updated Cost: €${current_cost}`);
                    // Add the current cost to the investment_data array for plotting or further analysis
                    investment_data.push(current_cost);
                    // Update the previous_savings variable to carry this cost into the next iteration
                    previous_savings = current_cost;
                }
            }

            // Set the legend name for the chart to indicate the scenario includes OEM sponsorship
            legend_name ="With OEM : Total Investment";
            break;
        }
        
        case "no_no": {
            console.log("Scenario 4: New project without sponsorship");

            // Update chart title in the UI
            document.querySelector('#chart-title-2 h3').textContent = "New project (WITHOUT OEM sponsor)";

            // Loop through 50 iterations to simulate investment progression
            for (let i = 0; i < 50; i++) {
                if (i < table_length){
                    // If within the range of available investment data
                    if (!(table_length - i == 1)){
                        // For all but the last row in the table
                        efforts_in_hrs = parseFloat(investment_information[i]["Min duration [Hrs]"]);
                        current_cost = parseFloat(((efforts_in_hrs * lcl) + previous_savings).toFixed(2));

                        console.log(`[Iteration ${i + 1}] Investment Cost: €${current_cost}`);
                        
                        // Add the current cost to the investment_data array for plotting or further analysis
                        investment_data.push(current_cost);
                        // Update the previous_savings variable to carry this cost into the next iteration
                        previous_savings = current_cost;
                    }
                    else{
                        // Special handling for the last row: subtract one-time OEM payment
                        efforts_in_hrs = parseFloat(investment_information[i]["Min duration [Hrs]"]);
                        current_cost = parseFloat((previous_savings + (efforts_in_hrs * lcl)).toFixed(2));

                        console.log(`[Threshold Reached @ Iteration ${i + 1}] Investment Cost: €${current_cost}`);
                        // Add the current cost to the investment_data array for plotting or further analysis
                        investment_data.push(current_cost);
                        // Update the previous_savings variable to carry this cost into the next iteration
                        previous_savings = current_cost;
                    }
                }
                else{
                    // After all table data is used, continue estimating using average effort cost
                    current_cost = parseFloat((previous_savings + effort_cost_est).toFixed(2));

                    console.log(`[Post-Threshold Iteration ${i + 1}] Updated Cost: €${current_cost}`);
                    // Add the current cost to the investment_data array for plotting or further analysis
                    investment_data.push(current_cost);
                    // Update the previous_savings variable to carry this cost into the next iteration
                    previous_savings = current_cost;
                }
            }

            // Set the legend name for the chart to indicate the scenario includes OEM sponsorship
            legend_name ="RB : Total Investment";
            break;
        }
    }

    // Generate x-axis values corresponding to the dataset length
    const x_values = Array.from({ length: create_green_bar_dataset(2).length }, (_, i) => i + 1);

    // Create legend label with currency
    const line_chart_legend = `${legend_name} (${table_info.currency})`;

    // Construct the investment trace object for plotting
    const investment_trace = {
        x: x_values,
        y: investment_data,
        type: "scatter",
        mode: "lines+markers",
        line: { color: "red", width: 3 },
        name: line_chart_legend,
        marker: {
            color: "white", // White fill for markers
            size: 8,        // Marker size
            line: {
                color: "red", // Red border for the markers
                width: 3      // Border thickness
            }
        }
    };

    return investment_trace;
}

// Function to store the current page status in localStorage
function update_page_status(page_name){
    // Save the page name under the key 'page_status' for later retrieval
    localStorage.setItem('page_status',page_name);
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