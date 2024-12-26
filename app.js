import fs from 'fs';


const filePath = './example.json';

const initializingFile = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]), 'utf8');
        // console.log('File initialized');
      } else {
        // console.log('File already exists');
      }
}

const readFileData = () => {
    const fileData = fs.readFileSync(filePath , 'utf-8');
    return JSON.parse(fileData);
}

const writeFileData = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks), 'utf8');
}

const addNewTask= (task) => {
    const tasks = readFileData();
    const newTask = {
        id : tasks.length + 1,
        task : task,
        status : "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
    tasks.push(newTask);
    writeFileData(tasks)
    console.log(`Task is successfully added to the list (ID : ${newTask.id})`)
}


const updateFileData = (id , updatedTask) => {
    id = parseInt(id);
    const tasks = readFileData();
    if(tasks.length >= id){
        const filteredData = tasks.find((task) => task.id === id);
        filteredData.task = updatedTask;
        filteredData.updatedAt = new Date().toISOString();
        tasks.forEach((task , idx) => {
            if(id === idx) task = filteredData;
        })

        writeFileData(tasks);
        console.log(`task updated successfully ! (ID  :${filteredData.id})`)
    }else{
        console.log("Please Enter Valid Task-ID !")
    }

}

const deleteTask = (id) => {
    id = parseInt(id);
    const tasks = readFileData();
    if(tasks.length >= id){
        const filteredData = tasks.filter((task) => {
            if(task.id !== id) return task
        })
        // console.log(filteredData)
    
        filteredData.forEach((task , index) => {
            task.id = index + 1;
        })
        // console.log(filteredData);
    
        writeFileData(filteredData);
        console.log(`task is deleted Successfully (ID : ${id})`)
    }else{
        console.log("Please Enter Valid Task-ID !")
    }
    
}

// deleteTask(2);
// addNewTask("task 1");
// addNewTask("task 2");
// addNewTask("task 3");
// addNewTask("task 4");

const editTaskStatus = (id , status) => {
    id = parseInt(id);
    const tasks = readFileData();

    if(tasks.length >= id){
        const filteredData = tasks.find((task) => task.id === id);
        filteredData.status = status;
        filteredData.updatedAt = new Date().toISOString();
        tasks.forEach((task , idx) => {
            if(id === idx) task = filteredData;
        })

        writeFileData(tasks);
        console.log(`status updated successfully ! (task-ID  :${filteredData.id})`)
    }else{
        console.log("Please Enter Valid Task-ID !")
    }

    

}

// editTaskStatus(2 , "in-progress")

const displayTaskStatusBased = (status = "all") => {
    const tasks = readFileData();
    if (status === "all"){
        console.log(`List Task : ${status} \n`,tasks);
        return
    }else{
        const filteredData = tasks.find((task) => task.status === status)
        console.log(`List Task : ${status} \n`,filteredData);
    }
    
}

// displayTaskStatusBased("in-progress");


(function () {
    initializingFile();  // create example.json file in the current directory

    const [cmd , ...args] = process.argv.slice(2);
    switch (cmd) {
        case "add":
            addNewTask(args[0]);
            break;
        case "update":
            updateFileData(args[0] , args[1]);
            break;
        case "delete":
            deleteTask(args[0])
            break;
        case "mark-in-progress":
            editTaskStatus(args[0] , "in-progress");
            break;
        case "mark-done":
            editTaskStatus(args[0] , "done");
            break;
        case "list":
            displayTaskStatusBased(args[0]);
            break;
        default:
            console.log('Unknown command!');
            console.log('Usage:');
            console.log('  add <description>');
            console.log('  update <id> <new_description>');
            console.log('  delete <id>');
            console.log('  mark-in-progress <id>');
            console.log('  mark-done <id>');
            console.log('  list [done|todo|in-progress]');
            break;
    }

})();








