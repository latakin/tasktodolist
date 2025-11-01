

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
        projectDiv.classList.add('border', 'border-2', 'rounded-end', 'text-start');
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
            const editDiv = document.createElement('div');
           
            listDiv.classList.add('px-5', 'py-2','border', 'border-bottom', 'bg-dark-subtle', 'text-dangeremphasis');
            taskLi.className = `task priority-${task.priority}` //for css syling

            //Task details
            listDiv.innerHTML = `
            <strong>${task.text}</strong>
            <small style="display: block; color: #666;">
            Priority: ${task.priority} | due: ${task.date}
            </small>
            <svg  style="cursor: pointer; pointer-events: auto;" 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" height="20" fill="currentColor" 
                class="bi bi-trash-fill delButton" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg> 
            <svg  style="cursor: pointer; pointer-events: auto;" 
                xmlns="http://www.w3.org/2000/svg" width="20" 
                height="20" fill="currentColor" class="bi bi-pencil-square editBtn" 
                viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg>
            `;

            //delete button
            const delButton = listDiv.querySelector('.delButton');
            delButton.classList.add('d-inline-block','me-3');

             
            delButton.addEventListener('click', () => {
                const projectIndex = index; // from the forEach
                const taskIndex = project.tasklist.indexOf(task);

                if (taskIndex > -1) {
                projectList[projectIndex].tasklist.splice(taskIndex, 1);
                
                } else {
                console.error('Task not found');
                }
                localStorage.setItem('projectList', JSON.stringify(projectList));
                renderProjects(projectList); // re-render updated list
            });

            

             //editbtn
             const editBtn = listDiv.querySelector('.editBtn');
             editBtn.classList.add('d-inline-block', 'me-3')
                editBtn.addEventListener('click', () => {
                const newText = prompt('Edit task:', task.text);
                if (newText) {
                    task.text = newText;
                    renderProjects(projectList);
                    }
                });

             

            //complete button 
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Complete';

            completeBtn.className = 'complete-Btn';
            completeBtn.classList.add('btn', 'btn-success', 'me-5');
            completeBtn.addEventListener('click', () => {
                taskLi.style.textDecoration = 'line-through';
                taskLi.style.opacity = '0.5';
                completeBtn.textContent = 'Completed';
                completeBtn.disabled = true;
            })
            editDiv.appendChild(completeBtn);
            //editDiv.appendChild(editBtn);
            //editDiv.appendChild(delButton);

            listDiv.appendChild(editDiv);
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