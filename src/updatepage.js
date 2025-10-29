
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
        projectDiv.classList.add('border', 'border-2', 'rounded-end', 'text-start')
        projectDiv.setAttribute('data-project-id', index);

        //project header with title and tsk count

        const header = document.createElement('h3');
        header.classList.add('fs-2', 'text-center')
        header.textContent = `${project.title} (${project.tasklist.length} tasks)`;
        projectDiv.appendChild(header);

        //if no tasks, show placeholder
        if (project.tasklist.length === 0) {
            const emptymsg = document.createElement('p');
            emptymsg.textContent = 'No tasks yet';
            emptymsg.classList.add('text-start');
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
            const listDiv = document.createElement('div');
            listDiv.classList.add('px-5', 'py-2','border', 'border-bottom', 'bg-dark-subtle', 'text-dangeremphasis');
            taskLi.className = `task priority-${task.priority}` //for css syling

            //Task details
            listDiv.innerHTML = `
            <strong>${task.text}</strong>
            <small style="display: block; color: #666;">
            Priority: ${task.priority} | due: ${task.date}
            </small> 
            `;

            //complete button 
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Complete';

            completeBtn.className = 'complete-Btn';
            completeBtn.classList.add('btn', 'btn-success');
            completeBtn.addEventListener('click', () => {
                taskLi.style.textDecoration = 'line-through';
                taskLi.style.opacity = '0.5';
                completeBtn.textContent = 'Completed';
                completeBtn.disabled = true;
            })
            listDiv.appendChild(completeBtn);
            taskLi.appendChild(listDiv);
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