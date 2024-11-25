Animal Tables Project
Overview
This project is a dynamic web application designed to manage animal data in categorized tables. It provides features for adding, editing, deleting, and displaying animal information in an interactive and user-friendly manner. The project utilizes HTML, CSS, JavaScript (ES6+), and Bootstrap for responsive and modern UI design.

Features
Dynamic Tables:

Categorized tables for different animal groups: Big Cats, Dogs, and Big Fish.
Supports sorting functionality for columns.
Includes action buttons for editing and deleting individual entries.
Modal Dialogs:

Modal for adding new animal entries with fields for name, size, location, and image URL.
Modal for editing existing animal entries.
Responsive Design:

Designed using Bootstrap for responsiveness across devices.
Dynamic image hover effects for enhanced user interaction.
Interactive Buttons:

Buttons for adding animals, editing data, and deleting rows with distinct color codes for clarity.
Design Approach and Choices
1. Separation of Concerns
HTML: Provides the structure and layout for the application.
CSS: Enhances the visual appearance and provides hover effects, button styling, and table formatting.
JavaScript: Handles dynamic content generation, event handling, and sorting logic.
2. UI Design Principles
Readability: Used a clean and professional table design with borders, hover effects, and center-aligned data for better readability.
Accessibility: Implemented modals for forms to make the UI more accessible and intuitive.
Consistency: Ensured consistent styling across buttons, modals, and tables using Bootstrap and custom CSS.
3. Styling Choices
Bootstrap Framework: Used for rapid development and responsive design.
Custom CSS: Added personalized styles for:
Image hover effects (scale transitions for better interactivity).
Table headers and rows with light gray backgrounds and hover states.
Action buttons with distinct colors for clarity (Edit and Delete).
4. Reusable Components
The generateTableHTML function dynamically generates table structures, enabling scalability for future categories or datasets.
Modal forms (addAnimalModal and editAnimalModal) are reusable for various animal categories.
5. JavaScript Modularity
The code separates data handling logic from the DOM manipulation to ensure maintainability and scalability.
Sorting logic is tied to columns dynamically through the sortConfig object.
How to Run the Project
Clone the repository:
bash
Copy code
git clone <repository-url>
Open the index.html file in any modern web browser.
Future Enhancements
Add validation for form fields.
Implement local storage or a backend to persist animal data across sessions.
Add pagination for tables to handle larger datasets.
Enhance sorting to include multi-column sorting.