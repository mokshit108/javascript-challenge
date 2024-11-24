async function fetchData(file) {
    const response = await fetch(file);
    const data = await response.json();
    return data;
}

class AnimalTable {
    constructor(containerId, data, columns, sortConfig, nameStyle) {
        this.containerId = containerId;
        this.data = data;
        this.columns = columns;
        this.sortConfig = sortConfig;
        this.nameStyle = nameStyle;
        this.render();
    }

    render() {
        const container = document.getElementById(this.containerId);
        container.innerHTML = this.generateTableHTML();
        this.addEventListeners();
    }

    generateTableHTML() {
        return `
          <div class="d-flex justify-content-start mb-3">
            <button class="btn btn-primary add-btn">Add Animal</button>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                ${this.columns
                .map((col) =>
                    this.sortConfig[col]
                        ? `<th>${col.charAt(0).toUpperCase() + col.slice(1)}
                                <button class="btn btn-link sort-btn" data-field="${col}">
                                    ${this.sortConfig[col].sortOrder === "asc"
                            ? "▲"
                            : "▼"
                        }
                                </button>
                               </th>`
                        : `<th>${col.charAt(0).toUpperCase() + col.slice(1)}</th>`
                )
                .join("")}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${this.data
                .map(
                    (item) => `
                <tr>
                  ${this.columns
                            .map((col) =>
                                col === "image"
                                    ? `<td>
                            <div class="img-hover-card">
                              <img src="${item[col]}" alt="${item.name}" />
                              <p>${item.name}</p>
                            </div>
                          </td>`
                                    : `<td class="${this.nameStyle || ""}">${item[col]}</td>`
                            )
                            .join("")}
                  <td>
                    <button class="btn btn-warning btn-sm edit-btn" data-id="${item.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">Delete</button>
                  </td>
                </tr>`
                )
                .join("")}
            </tbody>
          </table>
        `;
    }

    addEventListeners() {
        // Add Sort Event Listeners
        document.querySelectorAll(`#${this.containerId} .sort-btn`).forEach((btn) =>
            btn.addEventListener("click", (e) => {
                const field = e.target.dataset.field;
                const sortOrder = this.sortConfig[field]?.sortOrder || "asc";

                // Toggle sort order
                this.sortConfig[field].sortOrder = sortOrder === "asc" ? "desc" : "asc";

                // Handle numeric sorting for "size" field
                this.data.sort((a, b) => {
                    const aValue = field === "size" ? parseFloat(a[field]) : a[field];
                    const bValue = field === "size" ? parseFloat(b[field]) : b[field];
                    return sortOrder === "asc"
                        ? aValue > bValue
                            ? 1
                            : aValue < bValue
                                ? -1
                                : 0
                        : aValue < bValue
                            ? 1
                            : aValue > bValue
                                ? -1
                                : 0;
                });

                this.render();
            })
        );

        // Add Delete Event Listeners
        document.getElementById(this.containerId).addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-btn")) {
                const id = Number(e.target.dataset.id);
        
                // Update data and re-render
                this.data = this.data.filter((item) => item.id !== id);
                this.render();
            }
        });


        // Add Animal Event Listener
        document.querySelector(`#${this.containerId} .add-btn`).addEventListener("click", () => {
            const modalElement = document.getElementById("addAnimalModal");
            const modal = new bootstrap.Modal(modalElement);

            // Reset the form and error messages
            document.getElementById("addAnimalForm").reset();
            const errorDiv = document.getElementById("addAnimalError");
            errorDiv.style.display = "none";

            // Show the modal
            modal.show();

            document.getElementById("addAnimalSubmit").onclick = () => {
                const name = document.getElementById("animalName").value.trim();
                const size = document.getElementById("animalSize").value.trim();
                const location = document.getElementById("animalLocation").value.trim();
                const image = document.getElementById("animalImage").value.trim();

                if (!name || !size || !location) {
                    this.showError("All fields are required!", errorDiv);
                    return;
                }

                if (isNaN(size) || size <= 0) {
                    this.showError("Size must be a valid positive number!", errorDiv);
                    return;
                }

                if (this.data.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
                    this.showError("Duplicate animal name is not allowed!", errorDiv);
                    return;
                }

                this.data.push({
                    id: Date.now(),
                    name,
                    size: parseFloat(size),
                    location,
                    image,
                });

                modal.hide();
                this.render();
            };
        });

        // Edit Animal Event Listener
        document.querySelectorAll(`#${this.containerId} .edit-btn`).forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = Number(e.target.dataset.id);
                const animal = this.data.find((item) => item.id === id);

                if (animal) {
                    const modalElement = document.getElementById("editAnimalModal");
                    const modal = new bootstrap.Modal(modalElement);

                    // Reset error messages and populate fields
                    document.getElementById("editAnimalError").style.display = "none";
                    document.getElementById("editAnimalName").value = animal.name;
                    document.getElementById("editAnimalSize").value = animal.size;
                    document.getElementById("editAnimalLocation").value = animal.location;
                    document.getElementById("editAnimalImage").value = animal.image;

                    // Show modal
                    modal.show();

                    document.getElementById("editAnimalSubmit").onclick = () => {
                        const name = document.getElementById("editAnimalName").value.trim();
                        const size = document.getElementById("editAnimalSize").value.trim();
                        const location = document.getElementById("editAnimalLocation").value.trim();
                        const image = document.getElementById("editAnimalImage").value.trim();

                        const errorDiv = document.getElementById("editAnimalError");

                        if (!name || !size || !location) {
                            this.showError("All fields are required!", errorDiv);
                            return;
                        }

                        if (isNaN(size) || size <= 0) {
                            this.showError("Size must be a valid positive number!", errorDiv);
                            return;
                        }

                        if (
                            this.data.some(
                                (item) =>
                                    item.name.toLowerCase() === name.toLowerCase() &&
                                    item.id !== id
                            )
                        ) {
                            this.showError("Duplicate animal name is not allowed!", errorDiv);
                            return;
                        }

                        animal.name = name;
                        animal.size = parseFloat(size);
                        animal.location = location;
                        animal.image = image;

                        modal.hide();
                        this.render();
                    };
                }
            });
        });
    }

    // Helper function to display error messages
    showError(message, errorDiv) {
        errorDiv.style.display = "block";
        errorDiv.textContent = message;
    }

}

async function initializeTables() {
    const bigCats = await fetchData("bigCats.json");
    const dogs = await fetchData("dogs.json");
    const bigFish = await fetchData("bigFish.json");

    // Table 1: Sort on all columns except image
    const sortConfigTableOne = {
        name: { sortOrder: "asc" },
        size: { sortOrder: "asc" },
        location: { sortOrder: "asc" },
    };

    // Table 2: Sort on name and location only
    const sortConfigTableTwo = {
        name: { sortOrder: "asc" },
        location: { sortOrder: "asc" },
    };

    // Table 3: Sort on size only
    const sortConfigTableThree = {
        size: { sortOrder: "asc" },
    };

    new AnimalTable("table1-container", bigCats, ["image", "name", "size", "location"], sortConfigTableOne);
    new AnimalTable("table2-container", dogs, ["image", "name", "size", "location"], sortConfigTableTwo, "bold");
    new AnimalTable("table3-container", bigFish, ["image", "name", "size", "location"], sortConfigTableThree, "italic-blue");
}

// Initialize tables on page load
initializeTables();