document.getElementById("applicationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent actual form submission

    // Collect form data
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        // Check if the key is for multiple values (e.g., equipmentType[])
        if (key.endsWith("[]")) {
            // Strip off the brackets for cleaner data keys
            const cleanKey = key.slice(0, -2);
            if (!data[cleanKey]) data[cleanKey] = [];
            data[cleanKey].push(value);
        } else {
            data[key] = value;
        }
    });

    // Display the submitted data in a new container
    const resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container");
    resultContainer.innerHTML = `
        <h2>Application Preview</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Date of Birth:</strong> ${data.dob}</p>
        <p><strong>Expected Rate of Pay:</strong> ${data.rateOfPay} (${data.payType})</p>
        <p><strong>Phone Number:</strong> ${data.phone}</p>
        <p><strong>Experience:</strong> ${data.experience || "No experience listed"}</p>
        <p><strong>Driver's License Class:</strong> ${data.license}</p>
        <h3>Equipment Operating Experience</h3>
    `;

    // Add Equipment Experience Data
    if (data.equipmentType && data.yearsExperience) {
        for (let i = 0; i < data.equipmentType.length; i++) {
            resultContainer.innerHTML += `<p><strong>Equipment:</strong> ${data.equipmentType[i]} - ${data.yearsExperience[i]} years</p>`;
        }
    }

    document.body.appendChild(resultContainer); // Append result to body
});

document.addEventListener("DOMContentLoaded", function() {
    // Display the current date
    const currentDate = new Date().toLocaleDateString();
    document.getElementById("currentDate").innerText = currentDate;
});

// Function to add equipment fields
function addEquipmentField() {
    const equipmentContainer = document.getElementById("equipmentContainer");

    // Create a new equipment select and year input pair
    const equipmentDiv = document.createElement("div");
    equipmentDiv.classList.add("equipment-item");

    // Equipment type dropdown
    const equipmentSelect = document.createElement("select");
    equipmentSelect.name = "equipmentType[]";
    equipmentSelect.innerHTML = `
        <option value="" disabled selected>Select Equipment</option>
        <option value="Excavator">Excavator</option>
        <option value="Bulldozer">Bulldozer</option>
        <option value="Backhoe">Backhoe</option>
        <option value="Loader">Loader</option>
        <option value="Crane">Crane</option>
        <option value="Forklift">Forklift</option>
        <!-- Add more equipment options as needed -->
    `;
    
    // Years of experience input
    const yearsInput = document.createElement("input");
    yearsInput.type = "number";
    yearsInput.name = "yearsExperience[]";
    yearsInput.placeholder = "Years of experience";
    yearsInput.min = "0";

    // Append to container
    equipmentDiv.appendChild(equipmentSelect);
    equipmentDiv.appendChild(yearsInput);
    equipmentContainer.appendChild(equipmentDiv);
}


document.addEventListener("DOMContentLoaded", function() {
    // Display the current date
    const currentDate = new Date().toLocaleDateString();
    document.getElementById("currentDate").innerText = currentDate;
});

// Function to add equipment fields
function addEquipmentField() {
    const equipmentContainer = document.getElementById("equipmentContainer");

    // Create a new equipment select and year input pair
    const equipmentDiv = document.createElement("div");
    equipmentDiv.classList.add("equipment-item");

    // Equipment type dropdown
    const equipmentSelect = document.createElement("select");
    equipmentSelect.name = "equipmentType[]";
    equipmentSelect.innerHTML = `
        <option value="" disabled selected>Select Equipment</option>
        <option value="Excavator">Excavator</option>
        <option value="Bulldozer">Bulldozer</option>
        <option value="Backhoe">Backhoe</option>
        <option value="Loader">Loader</option>
        <option value="Crane">Crane</option>
        <option value="Forklift">Forklift</option>
        <!-- Add more equipment options as needed -->
    `;
    
    // Years of experience input
    const yearsInput = document.createElement("input");
    yearsInput.type = "number";
    yearsInput.name = "yearsExperience[]";
    yearsInput.placeholder = "Years of experience";
    yearsInput.min = "0";

    // Append to container
    equipmentDiv.appendChild(equipmentSelect);
    equipmentDiv.appendChild(yearsInput);
    equipmentContainer.appendChild(equipmentDiv);
}
