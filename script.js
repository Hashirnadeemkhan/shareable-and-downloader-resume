document.addEventListener("DOMContentLoaded", function () {
  const generateResumeButton = document.getElementById("generateResume");
  const editResumeButton = document.getElementById("editResume");
  const saveResumeButton = document.getElementById("saveResume");
  const downloadResumeButton = document.getElementById("downloadResume"); // For PDF download
  const shareResumeButton = document.getElementById("shareResume"); // For sharing resume
  const resumeForm = document.getElementById("resumeForm");

  // Disable form fields function
  function toggleFormFields(state) {
      document.getElementById("firstName").disabled = state;
      document.getElementById("lastName").disabled = state;
      document.getElementById("email").disabled = state;
      document.getElementById("phone").disabled = state;
      document.getElementById("skills").disabled = state;
      document.getElementById("experience").disabled = state;
      document.getElementById("education").disabled = state;
      document.getElementById("address").disabled = state;
      document.getElementById("courses").disabled = state;
      document.getElementById("summary").disabled = state;
  }

  // Generate Resume
  resumeForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const skillsInput = document.getElementById("skills").value;
      const experience = document.getElementById("experience").value;
      const education = document.getElementById("education").value;
      const address = document.getElementById("address").value;
      const courses = document.getElementById("courses").value;
      const summary = document.getElementById("summary").value;

      // Display the text information
      document.getElementById("displayName").innerText = firstName + " " + lastName;
      document.getElementById("displayEmail").innerText = email;
      document.getElementById("displayPhone").innerText = phone;
      document.getElementById("displayExperience").innerText = experience;
      document.getElementById("displayEducation").innerText = education;
      document.getElementById("displayAddress").innerText = address;
      document.getElementById("displayCourses").innerText = courses;
      document.getElementById("displaySummary").innerText = summary;

      // Process and display skills
      const skillsList = document.getElementById("displaySkills");
      skillsList.innerHTML = ""; // Clear any previous entries
      const skillsArray = skillsInput.split(",").map(skill => skill.trim());
      skillsArray.forEach(skill => {
          if (skill) {
              const li = document.createElement("li");
              li.innerText = skill;
              skillsList.appendChild(li);
          }
      });

      // Disable the form after generating the resume
      toggleFormFields(true);

      // Hide Save button and show Edit button
      saveResumeButton.style.display = "none";
      editResumeButton.style.display = "block";
  });

  // Edit Resume
  editResumeButton.addEventListener("click", function () {
      toggleFormFields(false);
      saveResumeButton.style.display = "block";
      editResumeButton.style.display = "none";
  });

  // Save Resume
  saveResumeButton.addEventListener("click", function () {
      generateResumeButton.click();
  });

// Download Resume as PDF
downloadResumeButton.addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get resume content
    const name = document.getElementById("displayName").innerText;
    const email = document.getElementById("displayEmail").innerText;
    const phone = document.getElementById("displayPhone").innerText;
    const experience = document.getElementById("displayExperience").innerText;
    const education = document.getElementById("displayEducation").innerText;
    const address = document.getElementById("displayAddress").innerText;
    const summary = document.getElementById("displaySummary").innerText;
    const courses = document.getElementById("displayCourses").innerText;
    const skillsList = document.getElementById("displaySkills").innerText;

    // Add content to the PDF
    doc.text(`Resume`, 10, 10);
    doc.text(`Name: ${name}`, 10, 20);
    doc.text(`Email: ${email}`, 10, 30);
    doc.text(`Phone: ${phone}`, 10, 40);
    doc.text(`Experience: ${experience}`, 10, 50);
    doc.text(`Skills: ${skillsList}`, 10, 60);
    doc.text(`Education: ${education}`, 10, 70);
    doc.text(`Address: ${address}`, 10, 80);
    doc.text(`Summary: ${summary}`, 10, 90);
    doc.text(`Courses: ${courses}`, 10, 100);

    // Save the PDF
    doc.save(`${name}-Resume.pdf`);
});

// Share Resume
shareResumeButton.addEventListener("click", function () {
    const name = document.getElementById("displayName").innerText;
    const email = document.getElementById("displayEmail").innerText;
    const phone = document.getElementById("displayPhone").innerText;
    const experience = document.getElementById("displayExperience").innerText;

    if (navigator.share) {
        navigator.share({
            title: 'My Resume',
            text: `Name: ${name}, Email: ${email}, Phone: ${phone}, Experience: ${experience}`,
            url: window.location.href // Share the current page URL
        }).then(() => {
            console.log('Resume shared successfully');
        }).catch(err => {
            console.error('Error sharing resume:', err);
        });
    } else {
        alert("Your browser doesn't support the Share API.");
    }
});
})