showTask();
let addTaskInput = document.getElementById('addtaskinput');
let addTaskBtn = document.getElementById('addtaskbtn');

addTaskBtn.addEventListener("click", function(){
    addTaskInputVal = addTaskInput.value;
    let webTask = localStorage.getItem('localTask');
    if(addTaskInputVal.trim() != 0){
        if(webTask == null){
            taskObj = [];
        }else{
            taskObj = JSON.parse(webTask);
        }
        taskObj.push(addTaskInputVal);
        localStorage.setItem('localTask', JSON.stringify(taskObj));
        showTask();
    }
});

function showTask(){
    let webTask = localStorage.getItem('localTask');
    if(webTask == null){
        taskObj = [];
    }else{
        taskObj = JSON.parse(webTask);
    }
    let html = '';
    let addedtasklist = document.getElementById('addedtasklist');
    taskObj.forEach((item, index)=>{
        html += `<tr>
        <th scope="row">${index+1}</th>
        <td>${item}</td>
        <td><button type="button" onclick="edittask(${index})" class="text-primary"><i class="fa fa-edit"></i> Edit</button></td>
        <td><button type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i> Delete</button></td>
    </tr>`;
    });

    addedtasklist.innerHTML = html;
}

function edittask(index){
    let saveindex = document.getElementById('saveindex');
    let addtaskbtn = document.getElementById('addtaskbtn');
    let savetaskbtn = document.getElementById('savetaskbtn');
    let webTask = localStorage.getItem('localTask');
    let taskObj = JSON.parse(webTask);
    addTaskInput.value = taskObj[index];
    saveindex.value = index;

    addtaskbtn.style.display = 'none';
    savetaskbtn.style.display = 'block';
}

let savetaskbtn = document.getElementById('savetaskbtn');
savetaskbtn.addEventListener("click", function(){
    let webTask = localStorage.getItem('localTask');
    let taskObj = JSON.parse(webTask);
    let saveindex = document.getElementById('saveindex');
    let id = saveindex.value;
    taskObj[id] = addTaskInput.value;
    localStorage.setItem('localTask', JSON.stringify(taskObj));
    addtaskbtn.style.display = 'block';
    savetaskbtn.style.display = 'none';
    showTask();
});

function deleteitem(index){
    let webTask = localStorage.getItem('localTask');
    let taskObj = JSON.parse(webTask);
    taskObj.splice(index, 1);
    localStorage.setItem('localTask', JSON.stringify(taskObj));
    showTask();
}

let deleteallbtn = document.getElementById('deleteallbtn');

deleteallbtn.addEventListener("click", function(){
    let webTask = localStorage.getItem('localTask');
    if(webTask == null){
        taskObj = [];
    }else{
        taskObj = JSON.parse(webTask);
        taskObj = [];
    }
    localStorage.setItem('localTask', JSON.stringify(taskObj));
    addtaskbtn.style.display = 'block';
    savetaskbtn.style.display = 'none';
    showTask();
});

let searchtextbox = document.getElementById('searchtextbox');
searchtextbox.addEventListener('input', function(){
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item){
        let searchedText = item.getElementsByTagName("td")[0].innerText;

        let searchtextval = searchtextbox.value;

        let re = new RegExp(searchtextval, 'gi');
        if(searchedText.match(re)){
            item.style.display = "table-row";
        }else{
            item.style.display = "none"; 
        }

    });
});
