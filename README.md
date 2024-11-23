# Personal Notes Manager  

## Objective  
The **Personal Notes Manager** is a MERN stack application for managing personal and work-related notes. Users can perform **CRUD operations** (Create, Read, Update, Delete) on their notes while enjoying features like filtering, searching, and sorting.  

---

## Features  

### Core Functionalities  
- **Add Notes**  
  - Fields:  
    - Title (required)  
    - Description (required)  
    - Category: Dropdown (Work, Personal, Others)  
- **View Notes**  
  - Display a list of all notes, sorted by the latest.  
  - Filter and search by title or category.  
- **Edit Notes**  
  - Update title, description, or category.  
- **Delete Notes**  
  - Remove unwanted notes permanently.  
- **Optional**  
  - Toggle notes as Completed/Not Completed.  

### Validations  
- Notes must have a title and description.  
- Category must be from the predefined options.  

---

## Tech Stack  

- **Frontend:** React.js, CSS, Bootstrap/TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB or SQLite  
- **Libraries/Tools:** Axios, Joi, Mongoose/Sequelize  

---

## API Endpoints  

1. **Create Note:**  
   - `POST /notes` – Add a new note.  
2. **Read Notes:**  
   - `GET /notes` – Fetch all notes with optional filters (title, category).  
3. **Update Note:**  
   - `PUT /notes/:id` – Update a note by ID.  
4. **Delete Note:**  
   - `DELETE /notes/:id` – Delete a note by ID.  

---

## Getting Started  

### Prerequisites  
Ensure you have the following installed:  
- Node.js  
- MongoDB or SQLite  

### Installation  

1. **Clone the repository:**  
   ```bash
   git clone <repository_url>
   cd personal-notes-manager
