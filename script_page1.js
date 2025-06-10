// List of questions (can be dynamically extended or modified)
const questions = [
    {
        question: "What is your project name?*",
        type: "text",
        id: "project_name",
        error_msg: "Please enter valid project name."
    },
    {
        question: "Does this project already exist?",
        type: "select",
        id: "question1",
        options: ["Yes", "No"]
    },
    {
        question: "Is this project OEM sponsored?",
        type: "select",
        id: "question2",
        options: ["Yes", "No"]
    },
    {
        question: "Choose SIL type:*",
        type: "select",
        id: "question3",
        options: ["", "SiL from scratch (L)", "SiL for Successive pVer (M)", "SiL For successive series pVers (S)"],
        error_msg: "Please select valid SiL Type"
    },
    {
        question: "Select valid loop type for SiL Project:*",
        type: "select",
        id: "question4",
        options: ["", "Open Loop", "Closed Loop"],
        error_msg: "Please select valid loop type for SiL Project"
    },
     {
        question: "Upload Project file (Optional):",
        type: "upload",
        id: "question5",
        options: ["Yes", "No"]
    }
];
let questionnaire_response = {};
let sw_name = "SIL ROI Calculator";
// Function to dynamically create form questions
function createForm() {
    const form = document.getElementById('survey-form');
    
    questions.forEach(question => {
        const div = document.createElement('div');
        div.classList.add('mb-3');
        
        const label = document.createElement('label');
        label.setAttribute('for', question.id);
        label.classList.add('form-label');
        // label.textContent = question.question;
        label.innerHTML = question.question.replace(/\*/g, '<span style="color: red;">*</span>');
        div.appendChild(label);

        
        
        
        if (question.type === 'text') {
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('id', question.id);
            input.setAttribute('name', question.id);
            input.setAttribute('placeholder', "Enter Project Name");
            input.classList.add('form-control');
            input.required = true;
            div.appendChild(input);
        } else if (question.type === 'select') {
            const select = document.createElement('select');
            select.setAttribute('id', question.id);
            select.setAttribute('name', question.id);
            select.classList.add('form-select');
            select.required = true;

            question.options.forEach(option => {
                if(option == ""){
                    // Create placeholder option
                    const placeholderOption = document.createElement("option");
                    placeholderOption.textContent = "Select an option";
                    placeholderOption.value = "";
                    placeholderOption.disabled = true;
                    placeholderOption.selected = true;
                    placeholderOption.classList.add("light-placeholder"); 
                    select.appendChild(placeholderOption);
                }
                else{
                    const optionElement = document.createElement('option');
                    optionElement.setAttribute('value', option);
                    optionElement.textContent = option;
                    select.appendChild(optionElement);
                }
            });
            div.appendChild(select);
        }
        else if(question.type === "upload"){
            // Create a container div for the file upload input group
            const uploadContainer = document.createElement("div");
            uploadContainer.setAttribute("class", "input-group flex-grow-1");

            // Create the label that acts as a styled button for file selection
            const fileLabel = document.createElement("label");
            fileLabel.setAttribute("class", "btn btn-primary");
            fileLabel.innerText = "Choose File";

            // Create the hidden file input element
            const fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");
            fileInput.setAttribute("id", "import_button");
            fileInput.setAttribute("class", "btn btn-outline-secondary");
            fileInput.setAttribute("accept", ".json");
            fileInput.setAttribute("hidden", "");

            // Append the file input to the label so clicking the label opens the file dialog
            fileLabel.appendChild(fileInput);

            // Create the read-only text input to display the selected file name
            const fileNameDisplay = document.createElement("input");
            fileNameDisplay.setAttribute("type", "text");
            fileNameDisplay.setAttribute("id", question.id);
            fileNameDisplay.setAttribute("name", question.id);
            fileNameDisplay.setAttribute("placeholder", "No file selected");
            fileNameDisplay.setAttribute("readonly", true);
            fileNameDisplay.classList.add("form-control");

            // Add event listener to update the text input when a file is selected
            fileInput.addEventListener("change", (e) => import_prefilled_file(e, fileNameDisplay.id));

            // Append the file name display and file label to the container
            uploadContainer.appendChild(fileNameDisplay);
            uploadContainer.appendChild(fileLabel);

            // Finally, append the upload container to the parent div
            div.appendChild(uploadContainer);

            const error_div = document.createElement("div");
            error_div.id = "errorDisplay";
            error_div.setAttribute("style", "color: red; font-weight: bold; margin-top: 5px;");
            div.appendChild(error_div);

        }
        form.appendChild(div);

        if (question.question.includes('*')) {
            // Do something if '*' is in the string
            console.log("Asterisk found!");

            const error_block = document.createElement("div");
            error_block.id = `error_${question.id}`;
            error_block.style = "color: red; font-weight: bold; margin-top: 5px;";
            div.appendChild(error_block);
        } 
        // else {
        //     // Do something else if '*' is not in the string
        //     console.log("No asterisk found.");
        // }
    });
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('id', 'submit-btn');
    submitButton.setAttribute('class','btn btn-primary');
    submitButton.innerText = "Submit";
    submitButton.addEventListener("click",SubmitbuttonClicked);
    form.appendChild(submitButton);
}

// Function to dynamically create form questions and refill with existing values
function refill_Form() {
    const form = document.getElementById('survey-form');
    
    questions.forEach(question => {
        const div = document.createElement('div');
        div.classList.add('mb-3');
        
        const label = document.createElement('label');
        label.setAttribute('for', question.id);
        label.classList.add('form-label');
        // label.textContent = question.question;
        label.innerHTML = question.question.replace(/\*/g, '<span style="color: red;">*</span>');
        div.appendChild(label);
        
        if (question.type === 'text') {
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('id', question.id);
            input.setAttribute('name', question.id);
            input.setAttribute('placeholder', "Enter Project Name");
            input.classList.add('form-control');
            input.required = true;
            input.value = questionnaire_response[question.id];
            div.appendChild(input);
        } else if (question.type === 'select') {
            const select = document.createElement('select');
            select.setAttribute('id', question.id);
            select.setAttribute('name', question.id);
            select.classList.add('form-select');
            select.required = true;

            question.options.forEach(option => {
                if(option == ""){
                    // Create placeholder option
                    const placeholderOption = document.createElement("option");
                    placeholderOption.textContent = "Select an option";
                    placeholderOption.value = "";
                    placeholderOption.disabled = true;
                    placeholderOption.selected = true;
                    placeholderOption.classList.add("light-placeholder"); 
                    select.appendChild(placeholderOption);
                }
                else{
                    const optionElement = document.createElement('option');
                    optionElement.setAttribute('value', option);
                    optionElement.textContent = option;
                    select.appendChild(optionElement);
                }
            });

            select.value = questionnaire_response[question.id];
            div.appendChild(select);
        }
        else if(question.type === "upload"){
            // Create a container div for the file upload input group
            const uploadContainer = document.createElement("div");
            uploadContainer.setAttribute("class", "input-group flex-grow-1");

            // Create the label that acts as a styled button for file selection
            const fileLabel = document.createElement("label");
            fileLabel.setAttribute("class", "btn btn-primary");
            fileLabel.innerText = "Choose File";

            // Create the hidden file input element
            const fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");
            fileInput.setAttribute("id", "import_button");
            fileInput.setAttribute("class", "btn btn-outline-secondary");
            fileInput.setAttribute("accept", ".json");
            fileInput.setAttribute("hidden", "");

            // Append the file input to the label so clicking the label opens the file dialog
            fileLabel.appendChild(fileInput);

            // Create the read-only text input to display the selected file name
            const fileNameDisplay = document.createElement("input");
            fileNameDisplay.setAttribute("type", "text");
            fileNameDisplay.setAttribute("id", question.id);
            fileNameDisplay.setAttribute("name", question.id);
            fileNameDisplay.setAttribute("placeholder", "No file selected");
            fileNameDisplay.setAttribute("readonly", true);
            fileNameDisplay.classList.add("form-control");

            // Add event listener to update the text input when a file is selected
            fileInput.addEventListener("change", (eve) => import_prefilled_file(eve, fileNameDisplay.id));

            // Append the file name display and file label to the container
            uploadContainer.appendChild(fileNameDisplay);
            uploadContainer.appendChild(fileLabel);

            const error_div = document.createElement("div");
            error_div.id = "errorDisplay";
            error_div.setAttribute("style", "color: red; font-weight: bold; margin-top: 5px;");

            // Finally, append the upload container to the parent div
            div.appendChild(uploadContainer);
            div.appendChild(error_div);

        }
        form.appendChild(div);

        if (question.question.includes('*')) {
            // Do something if '*' is in the string
            console.log("Asterisk found!");

            const error_block = document.createElement("div");
            error_block.id = `error_${question.id}`;
            error_block.style = "color: red; font-weight: bold; margin-top: 5px;";
            div.appendChild(error_block);
        } 
    });
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('id', 'submit-btn');
    submitButton.setAttribute('class','btn btn-primary');
    submitButton.innerText = "Submit";
    submitButton.addEventListener("click",SubmitbuttonClicked);
    form.appendChild(submitButton);
}

// Handles importing and processing a prefilled JSON file
function import_prefilled_file(event, input_id) {
    // Get the first selected file from the input event
    const file = event.target.files[0];
    let jsonData = null;

    // Proceed only if a file was selected
    if (file) {
        const reader = new FileReader();

        // Define what happens when the file is successfully read
        reader.onload = function(e) {
            try {
                // Get the raw file content
                const raw = e.target.result;

                // Remove single-line (//...) and multi-line (/*...*/) comments from the JSON
                const cleaned = raw
                    .replace(/\/\/.*$/gm, '')               // Remove single-line comments
                    .replace(/\/\*[\s\S]*?\*\//g, '');      // Remove multi-line comments

                // Parse the cleaned JSON string into an object
                jsonData = JSON.parse(cleaned);

                // Log the parsed data for debugging
                console.log("Extracted.info: ", jsonData);

                // Call a function to verify the structure or content of the JSON
                verify_file(jsonData);

                // Set the input field's value to the file name (for display)
                document.getElementById(input_id).value = file.name;

                // Optional: You could display the JSON content instead of the file name
                // document.getElementById(input_id).value = JSON.stringify(jsonData, null, 2);
                // Store the extracted info in local storage
                updateUploadedFileStatus(true);
                updateStdTableInfo(jsonData.table_info);
                const error_div = document.getElementById("errorDisplay");
                error_div.textContent  = "";
                
            } catch (err) {
                // Handle JSON parsing errors
                console.error('Error parsing JSON:', err);
                // document.getElementById(input_id).value = 'Invalid JSON. Check console for details.';

                const error_div = document.getElementById("errorDisplay");
                // error_div.textContent  = "❌ Invalid JSON. Check console for details.";
                // error_div.innerHTML = "❌ <i>Invalid JSON. Check console for details.</i>";
                error_div.innerHTML = '<span style="font-style: italic; font-weight: normal;">❌ Invalid JSON. Check console for details.</span>';
                document.getElementById(input_id).value = "";
            }
        };

        // Read the file as plain text
        reader.readAsText(file);
    }
}

// Stores the entire table data under the 'table_info' key in localStorage
function updateStdTableInfo(table_data) {
    localStorage.setItem("table_info", JSON.stringify(table_data));
}

// Retrieves the current value of 'table_info' from localStorage
function getStdTableInfo() {
    return JSON.parse(localStorage.getItem("table_info")) ?? null;
}

function SubmitbuttonClicked(e){
    e.preventDefault();
    
    const formData = {};
    let formIsValid = true;
    
    questions.forEach(question => {
        const element = document.getElementById(question.id);
        let value = element.value;

        formData[question.id] = value;
        
        // Check if the input value is empty and replace with 'NA' if type is text
        // if (question.type === 'text' && element.value.trim() === '') {
        //     element.value = 'NA';
        //     formIsValid = false;
        // }

        if(question.question.includes("*")){
            const error_block = document.getElementById(`error_${question.id}`);
            // Check if the input value is empty
            if(element.value.trim() === ""){
                
                error_block.textContent = question.error_msg;
                error_block.innerHTML = `<span style="font-style: italic; font-weight: normal;">⚠️ ${question.error_msg}</span>`;
                formIsValid = false;
            }
            else {
                error_block.innerHTML = "";
            }
            
        }
    });
    if (!formIsValid) {
        alert("Please fill out all fields before submitting.");
        return; // Don't submit if the form is invalid
    }

    // Save form data in localStorage
    localStorage.setItem('answers', JSON.stringify(formData));
    const myModal = new bootstrap.Modal(document.getElementById('responseModal'));
    myModal.show();

    update_page_status('page_1');
    updatePageStatus('page_1');
    
    // Redirect to page 2
   setTimeout(() => {
        window.location.href = 'modified_pg2/page2.html'; // Redirect to another page
    }, 2000);
}

function update_page_status(page_name){
    localStorage.setItem('page_status',page_name);
}

// Define a custom error class for file verification failures
class FileVerificationError extends Error {
    constructor(message) {
        super(message); // Call the parent class (Error) constructor with the message
        this.name = "FileVerificationError"; // Set a custom error name
    }
}

// Function to verify if the uploaded file belongs to the correct application
function verify_file(data) {
    
    const errors = [];

    // Check if app_id exists and matches the expected software name
    if (!data.app_id || data.app_id !== sw_name)  {
        errors.push("Invalid or missing 'app_id'.");
    }
    if (!data.table_info || Object.keys(data.table_info).length === 0)  {
        errors.push("Invalid or missing 'table_info'.");
    }

    // If any errors were collected, throw them as a single error message
    if (errors.length > 0) {
        // If verification fails, throw a custom error
        throw new FileVerificationError("File verification failed:\n" + errors.join("\n"));
    }

    return true; // All checks passed
}

/*{
    status : {
        "page_status" : "page1";
        uploaded_file_status: true
    }
}*/
// Updates the 'page_status' field in localStorage under the 'status' key
function updatePageStatus(newStatus) {
    // Retrieve existing status object or initialize a new one
    let data = JSON.parse(localStorage.getItem("status")) || {};
    // Update the page_status field
    data.page_status = newStatus;
    // Save the updated object back to localStorage
    localStorage.setItem("status", JSON.stringify(data));
}

// Updates the 'uploaded_file_status' field in localStorage under the 'status' key
function updateUploadedFileStatus(isUploaded) {
    // Retrieve existing status object or initialize a new one
    let data = JSON.parse(localStorage.getItem("status")) || {};
    // Update the uploaded_file_status field
    data.uploaded_file_status = isUploaded;
    // Save the updated object back to localStorage
    localStorage.setItem("status", JSON.stringify(data));
}

// Retrieves the current value of 'page_status' from localStorage
function getPageStatus() {
    const data = JSON.parse(localStorage.getItem("status"));
    // Return the page_status if it exists, otherwise return null
    return data?.page_status || null;
}

// Retrieves the current value of 'uploaded_file_status' from localStorage
function getUploadedFileStatus() {
    const data = JSON.parse(localStorage.getItem("status"));
    // Return the uploaded_file_status if it exists, otherwise return null
    return data?.uploaded_file_status ?? null;
}

function get_questionnaire_response(){
    // Retrieve answers from localStorage using the new variable name
    questionnaire_response = JSON.parse(localStorage.getItem("answers"));
    console.log("questionnaire response of page 1: ", questionnaire_response);
}

window.onload = () =>{
    const page_status = getPageStatus();

    
    if(page_status && (page_status === "page_2")){
        get_questionnaire_response();
        // questionnaire_response["question5"] = "";
        refill_Form();
        
        
        const fileNameDisplay = document.getElementById("question5");

        if (fileNameDisplay) {
            fileNameDisplay.value = questionnaire_response["question5"];
        }

        updatePageStatus("");
    }
    else{      
        updateUploadedFileStatus(false);  
        createForm();
    }
}
// updateUploadedFileStatus(false);
// createForm();



