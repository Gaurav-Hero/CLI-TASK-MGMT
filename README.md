# Task Management CLI Application

Welcome to the **Task Management CLI Application**! 


## Features
- Add new tasks.
- Update existing tasks.
- Delete tasks.
- Mark tasks as **In Progress** or **Done**.
- List all tasks or filter tasks by status (**To Do**, **In Progress**, **Done**).

---

## Requirements
- **Node.js** (version 14 or higher)

---

## Installation
Follow these steps to get started with the application:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/task-mgmt-cli.git
   cd task-mgmt-cli
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

---

## Usage
Run the app using the following command structure:

```bash
node app.js <command> <arg1> <arg2> ...
```

### Available Commands

| Command                | Description                                               | Example                                                  |
|------------------------|-----------------------------------------------------------|----------------------------------------------------------|
| `add <description>`    | Adds a new task with the given description.               | `node app.js add "Buy groceries"`                       |
| `update <id> <desc>`   | Updates the task with the specified ID and new description. | `node app.js update 1 "Buy groceries and cook dinner"`  |
| `delete <id>`          | Deletes the task with the specified ID.                   | `node app.js delete 1`                                   |
| `mark-in-progress <id>`| Marks the task with the specified ID as **In Progress**.   | `node app.js mark-in-progress 1`                        |
| `mark-done <id>`       | Marks the task with the specified ID as **Done**.         | `node app.js mark-done 1`                                |
| `list`                 | Lists all tasks.                                          | `node app.js list`                                       |
| `list <status>`        | Lists tasks filtered by status (**todo**, **in-progress**, **done**). | `node app.js list done`                        |

---

## Task Properties
Each task has the following properties:

| Property      | Description                               |
|---------------|-------------------------------------------|
| **id**        | A unique identifier for the task.        |
| **description** | The task description provided by the user. |
| **status**    | The current status (**todo**, **in-progress**, or **done**). |
| **createdAt** | The date and time when the task was created. |
| **updatedAt** | The date and time when the task was last updated. |

---

## Example Workflow
1. **Add a new task**:
   ```bash
   node app.js add "Learn Node.js"
   ```
   **Output**:  
   `Task added successfully (ID: 1)`

2. **Mark the task as In Progress**:
   ```bash
   node app.js mark-in-progress 1
   ```
   **Output**:  
   `Task marked as in-progress (ID: 1)`

3. **List all tasks**:
   ```bash
   node app.js list
   ```
   **Output**:
   ```
   [in-progress] ID: 1, Description: Learn Node.js
   ```

4. **Update the task description**:
   ```bash
   node app.js update 1 "Learn Node.js and Build a CLI App"
   ```
   **Output**:  
   `Task updated successfully (ID: 1)`

5. **Mark the task as Done**:
   ```bash
   node app.js mark-done 1
   ```
   **Output**:  
   `Task marked as done (ID: 1)`

6. **Delete the task**:
   ```bash
   node app.js delete 1
   ```
   **Output**:  
   `Task deleted successfully (ID: 1)`

---

## Error Handling
The application gracefully handles the following errors:
- Task not found (invalid ID).
- Missing required arguments.
- Invalid command usage.

---
Learn More
✨ Check out the [Official Task Tracker Roadmap](https://roadmap.sh/projects/task-tracker)
 for detailed insights and guidance on building this project!
---
## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## License
This project is licensed under the **MIT License**.


