import fs from 'fs';
import inquirer from 'inquirer';

const filePath = './example.json';

// this function will create file with json extension if not exists ---------->
const initializingFile = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]), 'utf8');
    }
};

// read the data from file and return an array of objects -->
const readFileData = () => {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
};

// rewrite the updated  file data
const writeFileData = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks), 'utf8');
};

const addNewTask = (task) => {
    const tasks = readFileData();
    const newTask = {
        id: tasks.length + 1,
        task: task,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    writeFileData(tasks);
    console.log(`Task successfully added to the list (ID: ${newTask.id})`);
};

const updateFileData = (id, updatedTask) => {
    id = parseInt(id);
    const tasks = readFileData();
    if (tasks.length >= id) {
        const filteredData = tasks.find((task) => task.id === id);
        filteredData.task = updatedTask;
        filteredData.updatedAt = new Date().toISOString();
        writeFileData(tasks);
        console.log(`Task updated successfully! (ID: ${filteredData.id})`);
    } else {
        console.log("Please enter a valid Task-ID!");
    }
};

const deleteTask = (id) => {
    id = parseInt(id);
    const tasks = readFileData();
    if (tasks.length >= id) {
        const filteredData = tasks.filter((task) => task.id !== id);
        filteredData.forEach((task, index) => {
            task.id = index + 1;
        });
        writeFileData(filteredData);
        console.log(`Task deleted successfully (ID: ${id})`);
    } else {
        console.log("Please enter a valid Task-ID!");
    }
};

const editTaskStatus = (id, status) => {
    id = parseInt(id);
    const tasks = readFileData();
    if (tasks.length >= id) {
        const filteredData = tasks.find((task) => task.id === id);
        filteredData.status = status;
        filteredData.updatedAt = new Date().toISOString();
        writeFileData(tasks);
        console.log(`Status updated successfully! (Task-ID: ${filteredData.id})`);
    } else {
        console.log("Please enter a valid Task-ID!");
    }
};

const displayTaskStatusBased = (status = "all") => {
    const tasks = readFileData();
    if (status === "all") {
        console.log(`List of Tasks: ${status}\n`, tasks);
    } else {
        const filteredData = tasks.filter((task) => task.status === status);
        console.log(`List of Tasks (${status}):\n`, filteredData);
    }
};

(async function () {
    initializingFile();

    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'Add Task',
                'Update Task',
                'Delete Task',
                'Mark Task In-Progress',
                'Mark Task Done',
                'List Tasks',
                'Exit'
            ],
        },
    ]);

    switch (action) {
        case 'Add Task': {
            const { task } = await inquirer.prompt([
                { type: 'input', name: 'task', message: 'Enter task description:' },
            ]);
            addNewTask(task);
            break;
        }
        case 'Update Task': {
            const { id, updatedTask } = await inquirer.prompt([
                { type: 'input', name: 'id', message: 'Enter Task ID to update:' },
                { type: 'input', name: 'updatedTask', message: 'Enter new description:' },
            ]);
            updateFileData(id, updatedTask);
            break;
        }
        case 'Delete Task': {
            const { id } = await inquirer.prompt([
                { type: 'input', name: 'id', message: 'Enter Task ID to delete:' },
            ]);
            deleteTask(id);
            break;
        }
        case 'Mark Task In-Progress': {
            const { id } = await inquirer.prompt([
                { type: 'input', name: 'id', message: 'Enter Task ID to mark as in-progress:' },
            ]);
            editTaskStatus(id, 'in-progress');
            break;
        }
        case 'Mark Task Done': {
            const { id } = await inquirer.prompt([
                { type: 'input', name: 'id', message: 'Enter Task ID to mark as done:' },
            ]);
            editTaskStatus(id, 'done');
            break;
        }
        case 'List Tasks': {
            const { status } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'status',
                    message: 'Select status to filter tasks:',
                    choices: ['all', 'todo', 'in-progress', 'done'],
                },
            ]);
            displayTaskStatusBased(status);
            break;
        }
        case 'Exit':
            console.log('Goodbye!');
            process.exit(0);
    }
})();
