
export  function renderProjects(projectList) {
    const container = document.querySelector('#projectContainer');
    if (!container) {
        console.error('no projectscontainer found')
        return;
    }
    //clear existing content
    container.innerHTML = '';

    //loop over each project
    projectList.forEach((project,index) => {
        //create project wrapper div
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project';
        projectDiv.setAttribute('data-project-id', index);

        //project header with title and tsk count

        const header = document.createElement('h3');
        header.textContent = `${project.title} (${project.tasklist.length} tasks)`;
        projectDiv.appendChild(header);

        //if no tasks, show placeholder
        if (project.tasklist.length === 0) {
            const emptymsg = document.createElement('p');
            emptymsg.textContent = 'No tasks yet';
            emptymsg.style.fontStyle = 'italic';
            emptymsg.style.color = '#888546';
            projectDiv.appendChild(emptymsg);
            container.appendChild(projectDiv);
            return;
        }

        //create task list
        const taskUl = document.createElement('ul');
        taskUl.className = 'task-list';

        //loop over tasks in current project
        project.tasklist.forEach((task) => {
            const taskLi = document.createElement('li');
            taskLi.className = `task priority-${task.priority}` //for css syling

            //Task details
            taskLi.innerHTML = `
            <strong>${task.text}</strong>
            <small style="display: block; color: #666;">
            Priority: ${task.priority} | due: ${task.date}
            </small> 
            `;

            //complete button 
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Complete';
            completeBtn.className = 'complete-Btn';
            completeBtn.addEventListener('click', () => {
                taskLi.style.textDecoration = 'line-through';
                taskLi.style.opacity = '0.5';
                completeBtn.textContent = 'Completed';
                completeBtn.disabled = true;
            })
            taskLi.appendChild(completeBtn);
            taskUl.appendChild(taskLi);
        });
        projectDiv.appendChild(taskUl);
        container.appendChild(projectDiv);
    });

    //if no projects
    if (projectList.length === 0) {
        const noProjects = document.createElement('p');
        noProjects.textContent = 'no projects yet, create one to get started';
        noProjects.style.textAlign = 'center';
        noProjects.style.color = '#888';
        container.appendChild(noProjects);
    }

                            

    console.log('rendered projects:', projectList)
}