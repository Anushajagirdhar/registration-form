document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const termsAccepted = document.getElementById("terms").checked;
  
    // Validate age (18 to 55 years)
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const ageAdjustment = today < new Date(today.getFullYear(), dobDate.getMonth(), dobDate.getDate()) ? 1 : 0;
    const actualAge = age - ageAdjustment;
  
    if (actualAge < 18 || actualAge > 55) {
      alert("Age must be between 18 and 55 years.");
      return;
    }
  
    // Add data to the table
    const tableBody = document.getElementById("tableBody");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
      <td>${password}</td>
      <td>${dob}</td>
      <td>${termsAccepted}</td>
    `;
    tableBody.appendChild(row);
  
    // Save to local storage
    const savedData = JSON.parse(localStorage.getItem("formData")) || [];
    savedData.push({ name, email, password, dob, termsAccepted });
    localStorage.setItem("formData", JSON.stringify(savedData));
  
    // Clear the form
    document.getElementById("registrationForm").reset();
  });
  
  // Load saved data on page load
  document.addEventListener("DOMContentLoaded", () => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      const tableBody = document.getElementById("tableBody");
      savedData.forEach((entry) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.name}</td>
          <td>${entry.email}</td>
          <td>${entry.password}</td>
          <td>${entry.dob}</td>
          <td>${entry.termsAccepted}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  });
  
