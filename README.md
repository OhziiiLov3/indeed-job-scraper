# Job Scraper and API Backend

This repository contains a **Job Scraper** script built using Playwright and JavaScript to extract job postings from a popular job listing site and store the transformed data in a MongoDB database. Additionally, a **RESTful API** was designed with Express, adhering to the Model-View-Controller (MVC) pattern for accessing and managing the scraped job data.

---

## 🚀 Features

- **Web Scraping**: Extracts job title, company, location, description, and links from job listings.
- **Data Transformation**: Converts scraped data into structured objects.
- **Database Integration**: Stores data in MongoDB, avoiding duplicates with intelligent checks.
- **RESTful API**: Enables access to job data through endpoints using MVS design.
- **Error Handling and Logging**: Robust logging and graceful handling of scraping and database errors.

## 🛠️ Technologies Used

- **Playwright**: For web scraping.
- **Node.js**: For script execution and backend development.
- **Express**: For building RESTful API endpoints.
- **MongoDB**: For persistent job data storage.
- **Mongoose**: For database interaction.
- **Dotenv**: For environment variable management.
- **JavaScript (ES6)**: Core language.

---

## 📜 How It Works

### Scraping Jobs
- Uses **Playwright** to navigate to a job listing site.  
- Extracts job details like **title**, **company**, **location**, and **link**.  
- Saves the scraped data as a **JSON file** and uploads it to **MongoDB**.  

### API Design
- Implements **RESTful routes** using **Express**.  
- Follows **MVC design** to separate models, views, and controllers for maintainable code.  

### Duplicate Check
- Compares new job entries against existing records in **MongoDB** to prevent duplication.  


## 📂 Project Structure

```plaintext
├── controllers/
│   └── JobController.js  
├── models/
│   └── JobModel.js     # MongoDB schema and model for jobs
├──  index.js    # Playwright script for web scraping
├── routes/
│   └── jobRoutes.js         # API route for job data
├── server.js              # Express server entry point
├── .env                # Environment variables (MongoDB URI, CDP URL)
└── README.md           # Project documentation


