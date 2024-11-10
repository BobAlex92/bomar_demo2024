
document.addEventListener("DOMContentLoaded", function() {
    const currentDate = new Date().toLocaleDateString();
    document.getElementById("currentDate").innerText = currentDate;
});
document.addEventListener("DOMContentLoaded", function() {
    const currentDate = new Date().toLocaleDateString();
    document.getElementById("currentDate").innerText = currentDate;

    // Handle form submission
    document.getElementById("applicationForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            if (key.endsWith("[]")) {
                const cleanKey = key.slice(0, -2);
                if (!data[cleanKey]) data[cleanKey] = [];
                data[cleanKey].push(value);
            } else {
                data[key] = value;
            }
        });

        // Send data to apply.php as JSON
        fetch("scripts/php/apply.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            if (result.status === "success") {
                alert("Application submitted successfully!");
                window.location.href = "index.html"; // Redirect to homepage
            } else {
                alert("There was an error submitting the application: " + result.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while submitting the form. Check the console for details.");
        });
    });
});

// Function to dynamically add equipment fields
function addEquipmentField() {
    const equipmentContainer = document.getElementById("equipmentContainer");

    const equipmentDiv = document.createElement("div");
    equipmentDiv.classList.add("equipment-item");

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
    `;
    
    const yearsInput = document.createElement("input");
    yearsInput.type = "number";
    yearsInput.name = "yearsExperience[]";
    yearsInput.placeholder = "Years of experience";
    yearsInput.min = "0";

    equipmentDiv.appendChild(equipmentSelect);
    equipmentDiv.appendChild(yearsInput);
    equipmentContainer.appendChild(equipmentDiv);
}

function addEquipmentField() {
    const equipmentContainer = document.getElementById("equipmentContainer");

    const equipmentDiv = document.createElement("div");
    equipmentDiv.classList.add("equipment-item");

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
    `;
    
    const yearsInput = document.createElement("input");
    yearsInput.type = "number";
    yearsInput.name = "yearsExperience[]";
    yearsInput.placeholder = "Years of experience";
    yearsInput.min = "0";

    equipmentDiv.appendChild(equipmentSelect);
    equipmentDiv.appendChild(yearsInput);
    equipmentContainer.appendChild(equipmentDiv);
}
