// Import the Express framework.
const express = require("express");
const fs = require("node:fs/promises");
const path = require("node:path");
require("dotenv").config();

// Create the Express application.
const app = express();
const port = 3000;
const contactsPath = path.join(__dirname, "data", "contacts.json");

async function saveContact(values) {
  let contacts = [];
  try {
    contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  contacts.push({ ...values, createdAt: new Date().toISOString() });
  await fs.mkdir(path.dirname(contactsPath), { recursive: true });
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
}

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

// Save contact form data and display a success message.
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await saveContact({ name, email, message });
  } catch (error) {
    console.error("Unable to save contact form submission:", error.message);
    return res.status(500).render("contact", {
      title: "Contact | Express EJS Lab",
      successMessage: "Sorry, your message could not be saved. Please try again."
    });
  }

  res.render("contact", {
    title: "Contact | Express EJS Lab",
    successMessage: `Thank you, ${name || "there"}! Your message was received.`
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log("Contact submissions are saved locally");
});