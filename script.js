document.addEventListener("DOMContentLoaded", function () {
  const generateResumeButton = document.getElementById("generateResume");
  const editResumeButton = document.getElementById("editResume");
  const saveResumeButton = document.getElementById("saveResume");
  const downloadResumeButton = document.getElementById("downloadResume"); // For PDF download
  const shareResumeButton = document.getElementById("shareResume"); // For sharing resume
  const resumeForm = document.getElementById("resumeForm");

  // Disable form fields function
  function toggleFormFields(state) {
    const fields = [
      "firstName", "lastName", "email", "phone", "skills", 
      "experience", "education", "address", "courses", "summary"
    ];
    fields.forEach(id => {
      document.getElementById(id).disabled = state;
    });
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

    // Display information
    document.getElementById("displayName").innerText = `${firstName} ${lastName}`;
    document.getElementById("displayEmail").innerText = email;
    document.getElementById("displayPhone").innerText = phone;
    document.getElementById("displayExperience").innerText = experience;
    document.getElementById("displayEducation").innerText = education;
    document.getElementById("displayAddress").innerText = address;
    document.getElementById("displayCourses").innerText = courses;
    document.getElementById("displaySummary").innerText = summary;

    // Process skills
    const skillsList = document.getElementById("displaySkills");
    skillsList.innerHTML = "";
    const skillsArray = skillsInput.split(",").map(skill => skill.trim());
    skillsArray.forEach(skill => {
      if (skill) {
        const li = document.createElement("li");
        li.innerText = skill;
        skillsList.appendChild(li);
      }
    });

    // Disable form fields
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
    resumeForm.dispatchEvent(new Event('submit'));
  });

  // Download Resume as PDF
  downloadResumeButton.addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const name = document.getElementById("displayName").innerText;
    const email = document.getElementById("displayEmail").innerText;
    const phone = document.getElementById("displayPhone").innerText;
    const experience = document.getElementById("displayExperience").innerText;
    const education = document.getElementById("displayEducation").innerText;
    const address = document.getElementById("displayAddress").innerText;
    const summary = document.getElementById("displaySummary").innerText;
    const courses = document.getElementById("displayCourses").innerText;
    const skillsList = Array.from(document.getElementById("displaySkills").children).map(li => li.innerText).join(', ');

    // Add content to PDF
    doc.text("Resume", 10, 10);
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

  // Share Resume using a query parameter link
  shareResumeButton.addEventListener("click", function () {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const skills = document.getElementById("skills").value;
    const experience = document.getElementById("experience").value;
    const education = document.getElementById("education").value;
    const address = document.getElementById("address").value;
    const courses = document.getElementById("courses").value;
    const summary = document.getElementById("summary").value;

    // Create a shareable URL with query parameters
    const params = new URLSearchParams({
      firstName, lastName, email, phone, skills, experience, education, address, courses, summary
    }).toString();
    
    const shareableURL = `${window.location.origin}/resume-viewer.html?${params}`;

    if (navigator.share) {
      navigator.share({
        title: "My Resume",
        text: `Check out my resume: ${firstName} ${lastName}`,
        url: shareableURL
      }).then(() => {
        console.log("Resume shared successfully");
      }).catch(err => {
        console.error("Error sharing resume:", err);
      });
    } else {
      prompt("Copy this link to share your resume:", shareableURL);
    }
  });

  // Populate the resume viewer page if data exists in URL query params
  const queryParams = new URLSearchParams(window.location.search);
  if (queryParams.has('firstName')) {
    document.getElementById("displayName").innerText = `${queryParams.get('firstName')} ${queryParams.get('lastName')}`;
    document.getElementById("displayEmail").innerText = queryParams.get('email');
    document.getElementById("displayPhone").innerText = queryParams.get('phone');
    document.getElementById("displayExperience").innerText = queryParams.get('experience');
    document.getElementById("displayEducation").innerText = queryParams.get('education');
    document.getElementById("displayAddress").innerText = queryParams.get('address');
    document.getElementById("displayCourses").innerText = queryParams.get('courses');
    document.getElementById("displaySummary").innerText = queryParams.get('summary');

    const skillsList = document.getElementById("displaySkills");
    skillsList.innerHTML = "";
    queryParams.get('skills').split(",").forEach(skill => {
      const li = document.createElement("li");
      li.innerText = skill.trim();
      skillsList.appendChild(li);
    });
  }
});
