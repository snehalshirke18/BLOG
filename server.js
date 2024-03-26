const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

app.post("/submit-form", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "Gmail", // Change to your email service
        auth: {
            user: "snehalshirke.openinfotech@gmail.com", // Your email address
            pass: "Openinfotech@18", // Your email password
        },
    });

    // Define email options
    const mailOptions = {
        from: "snehalshirke.openinfotech@gmail.com",
        to: "recipient@example.com", // Recipient email address
        subject: "Form Submission",
        text: `Name: ${name}\nEmail: ${email}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending email:", error);
            res.status(500).json({
                message: "Error submitting form. Please try again later.",
            });
        } else {
            console.log("Email sent:", info.response);
            res.status(200).json({
                message: "Form submitted successfully! Email sent.",
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// submitForm.js

document
    .getElementById("sampleForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        var formData = new FormData(this);

        fetch("/submit-form", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("response").innerText = data.message;
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
