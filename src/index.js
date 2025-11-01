import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Todo } from "./todoclass.js";
import { renderProjects }  from "./updatepage.js";
import { Project } from "./project.js";


const addButton = document.getElementById('add');
const dialog = document.querySelector('#taskdialog');
const cancelForm = document.querySelector('#cancelForm');
const closeForm = document.querySelector('#closeForm');
const submitForm = document.querySelector('#submitForm');
const taskForm = document.querySelector('#taskForm');
const projectButton= document.querySelector('#projectbutton');
const projectDialog = document.querySelector('#projectdialog');
const projectForm = document.querySelector('#projectForm');
const submitProject = document.querySelector('#submitproject');

export let projectList = [];







const saved = JSON.parse(localStorage.getItem('projectList'));
if (saved && Array.isArray(saved)) {
    // Rehydrate plain objects into Project/Todo instances
    projectList = saved.map(p => {
        const proj = new Project(p.title);
        proj.tasklist = (p.tasklist || []).map(t => new Todo(t.text, t.priority, t.date));
        return proj;
    });
} else {
    const myProject = new Project("Default Project");
    projectList.push(myProject);
    localStorage.setItem('projectList', JSON.stringify(projectList));
}


projectButton.addEventListener('click', () => projectDialog.showModal());

addButton.addEventListener('click', () => {
    populateProjectSelect();
    dialog.showModal();

}
);

function populateProjectSelect() {
    const projectSelect = document.querySelector('#projectSelect');
    if (!projectSelect) return;

    projectSelect.innerHTML = '<option value="">--Select a Project --</option>';

    projectList.forEach((project, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${project.title}`;
        projectSelect.appendChild(option);

    })

    const defaultOpn = projectSelect.querySelector('option[value="0"]');
    if (defaultOpn) {
        projectSelect.value = '0';
    } 
}

closeForm.addEventListener('click', () => projectDialog.close());
cancelForm.addEventListener('click', () => dialog.close());

submitProject.addEventListener ('click', (event) => {
    event.preventDefault();
    let formData = new FormData(projectForm);
    let title = formData.get('title');

    if (projectForm.checkValidity() ) {

        const newProject = new Project(title);
        localStorage.setItem('task', JSON.stringify(newProject));
        console.log(newProject);
        projectList.push(newProject);
        localStorage.setItem('projectList', JSON.stringify(projectList));
        renderProjects(projectList)
        projectForm.reset();
        projectDialog.close();

    }  else {
        projectForm.reportValidity();
    }
})





submitForm.addEventListener('click', (event) => {
    event.preventDefault();
    let formData = new FormData(taskForm);
    let text = formData.get('text');
    let priority = formData.get('priority');
    let dueDate = formData.get('dueDate');
    let rawProjectSelect = formData.get('projectSelect');
    let projectIndex = parseInt(rawProjectSelect, 10);
    if ( isNaN(projectIndex) || projectIndex < 0 ) {
         alert('please select a valid project')
       return;
     }

    const selectedProject = projectList[projectIndex];

    
    
    
    
    if(taskForm.checkValidity()) {
    
         const newTask = new Todo (text, priority, dueDate);
        console.log(newTask)
        selectedProject.addProject(newTask);
        localStorage.setItem('projectList', JSON.stringify(projectList));
        renderProjects(projectList);
        taskForm.reset();
        dialog.close();   
     
    
    } else {
        taskForm.reportValidity();
    }
    


})

renderProjects(projectList);

 //delete button   