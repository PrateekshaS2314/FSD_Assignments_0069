// Import the Express framework.
const express = require("express");

// Create the Express application.
const app = express();
const port = 3000;

// Configure EJS as the template engine for this application.
app.set("view engine", "ejs");

// Parse form data sent in POST requests.
app.use(express.urlencoded({ extended: true }));

// Serve CSS and other static files from the public folder.
app.use(express.static("public"));

// Display the home page with data passed to the EJS template.
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home | Express EJS Lab",
    websiteTitle: "Student Portfolio",
    welcomeMessage: "Welcome to my simple Express and EJS website!"
  });
});

// Display the profile page with student information.
app.get("/profile", (req, res) => {
  res.render("profile", {
    title: "Profile | Express EJS Lab",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    course: "Bachelor of Computer Applications",
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js"]
  });
});

// Display the contact page.
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact | Express EJS Lab",
    successMessage: null
  });
});

// Receive contact form data and display a success message.
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // In a real application, the submitted values could be saved in a database.
  console.log("Contact form submission:", { name, email, message });

  res.render("contact", {
    title: "Contact | Express EJS Lab",
    successMessage: `Thank you, ${name || "there"}! Your message was received.`
  });
});

// Start the server and listen for browser requests.
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});