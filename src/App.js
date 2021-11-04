import './App.scss';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'

function App() {

  let tasklist, taskli, tasklistChild, taskChkbx,title, taskDetailBtn,nodeVal, taskVal, taskDeleteBtn, taskDesct, taskDate,taskLevel, 
  taskUpdateBtn, desNum=0;
  const [number, setNumber] = useState(0);

  function addTask(){

    document.getElementById("tasks").style.display = "block"
    tasklist = document.getElementById("tasks");
    tasklistChild = tasklist.children;
    setNumber(number+1);
    desNum+=1;

    //Tạo checkbox
    taskChkbx = document.createElement("input");
    taskChkbx.setAttribute("type", "checkbox");
    taskChkbx.setAttribute("class", "checkbox");

    //Tạo nút Detail
    taskDetailBtn = document.createElement("button");
    taskDetailBtn.innerHTML = "Detail";
    taskDetailBtn.setAttribute("class", "detail-btn");
    taskDetailBtn.onclick = function() {
      taskDate.style.display="block";
      taskDesct.style.display="block";
      taskLevel.style.display = "block";
      taskUpdateBtn.style.display = "block"
  }; 
    taskDetailBtn.style.backgroundColor = "#00bcd4";
    taskDetailBtn.style.color = "white";
    taskDetailBtn.style.marginLeft = "45%";
    taskDetailBtn.style.marginRight = "5%";

    //Tạo tiêu đề task
    title = document.getElementById("input-task").value;
    if(title == ""){
      alert("Bạn vừa tạo task rỗng");
    }
    nodeVal = document.createElement("span");
    taskVal = document.createTextNode(title);
    nodeVal.appendChild(taskVal);

    //Tạo nút xóa
    taskDeleteBtn = document.createElement("button");
    taskDeleteBtn.innerHTML = "Remove";
    taskDeleteBtn.onclick = function(){
      taskli.remove()
    }
    taskDeleteBtn.style.backgroundColor = "#d9534f";
    taskDeleteBtn.style.color = "white";

    //Tạo phần mô tả task
    
    taskDesct = document.createElement("input");
    taskDesct.setAttribute("class","des");
    taskDesct.setAttribute("value",document.getElementById("task-des").value);
    taskDesct.setAttribute("id", desNum);
    taskDesct.style.border = "solid 1px black"
    taskDesct.style.display = "none";
    taskDesct.style.width = " 90%";
    taskDesct.style.marginTop = "20px";

    //Tạo Due date
    taskDate = document.createElement("input");
    taskDate.setAttribute("type", "date");
    taskDate.setAttribute("class", "date");
    taskDate.setAttribute("id", number);
    taskDate.setAttribute("value", document.getElementById("datefield").value);
    taskDate.style.display = "none";
    taskDate.style.marginTop = "5%"

    //Tạo level
    taskLevel = document.createElement("select");
    var option = document.createElement("option");
    option.value = document.getElementById("select").value;
    option.text = document.getElementById("select").value;    
    taskLevel.appendChild(option);
    taskLevel.style.display = "none";

    //Tạo nút Cập nhật
    taskUpdateBtn = document.createElement("button");
    taskUpdateBtn.innerHTML = "Update";
    taskUpdateBtn.onclick = function(){
      alert("Đã cập nhật mô tả"+taskDesct.value)
    }
    taskUpdateBtn.style.background = '#38af5b';
    taskUpdateBtn.style.color = 'white';
    taskUpdateBtn.style.display = "none";
    taskUpdateBtn.style.width = "90%";
    taskUpdateBtn.style.marginTop = "5%";
    taskUpdateBtn.style.marginLeft = "5%";

    //Gắn các phần tử vào danh sách hiển thị
    taskli = document.createElement("div");
    taskli.style.border = "solid 1px";
    taskli.style.paddingTop = "15px";
    taskli.style.paddingBottom = "30px";
    taskli.style.paddingLeft = "5%";
    taskli.style.textAlign = "left";
    taskli.appendChild(taskChkbx);
    taskli.appendChild(nodeVal);
    taskli.appendChild(taskDetailBtn); 
    taskli.appendChild(taskDeleteBtn);
    taskli.appendChild(taskDesct);
    taskli.appendChild(taskDate);
    taskli.appendChild(taskLevel);
    taskli.appendChild(taskUpdateBtn);
    tasklist.appendChild(taskli);

    //Hiển thị Bull Action
    let i, chkBox;
      for (i = 0; i < tasklistChild.length; i += 1) {
        chkBox = tasklistChild[i].getElementsByTagName("input")[0];
        chkBox.onclick = function(){
          document.getElementById("bull").style.display = "block";
        }
       
 }
 
  }
  useEffect(() => {
    tasklist = document.getElementById("tasks");
    tasklistChild = tasklist.children;
    let j, detailBtn;
    for (j = 0; j < tasklistChild.length; j += 1) {
      detailBtn = tasklistChild[j].getElementsByTagName("button")[0];
      detailBtn.onClick = function(){
        document.getElementsByClassName("date")[j].style.display = "block"
      }
    }
  }, [number])

  //Hàm remove các task checked
  function removeall(){
    tasklist = document.getElementById("tasks");
    tasklistChild = tasklist.children;
    let count = 0, chkBox;
    for (var i = 0; i < tasklistChild.length; i++){
      chkBox = tasklistChild[i].getElementsByTagName("input")[0];
      if (chkBox.checked === true){
          tasklistChild[i].remove();
          removeall();
      }
  }
  console.log(count)
  }

  //Hàm tìm kiếm task
  function test(e){
    tasklist = document.getElementById("tasks");
    tasklistChild = tasklist.children;
    for (var i = 0; i < tasklistChild.length; i++){
    let search_tit= e.target.value;
    let b = tasklistChild[i].getElementsByTagName("span")[0].innerHTML;
    if(b.indexOf(search_tit)!=-1){
      document.getElementById("search_rel").innerHTML = b;
    } 

    console.log(b);
    }
  }
  return (
    <div className="App">
      <Helmet>
          <title>SORATEKTEST</title>
        </Helmet>
      <div id="tasker" class="tasker">
        <div id="error" class="error"></div>
        <div id="tasker-header" class="tasker-header">
          <strong>New Task </strong> <br /><br /><br />
          <input type="text" id="input-task" placeholder="Add new task..."/><br /><br />
          <strong id="des">Description</strong> 
          <div><textarea id="task-des"></textarea></div><br />
          <div id="infor">
            <div id="date">
              <strong>Due Date</strong>
              <input id="datefield" type='date'></input>
            </div>
            <div>
              <strong>Piority</strong>       
              <select id="select">
                <option>Low</option>
                <option selected>Normal</option>
                <option>High</option>
              </select>
            </div>           
          </div>
          <br />
          <button id="add-task-btn" onClick={addTask}>Add
          </button>
        </div>
        <div class="tasker-body">
          <strong>To Do List</strong> <br /><br /><br />
          <div><input placeholder="Search..." id="search" onChange={test}/></div>  
          <div id="search_rel"></div>    
          <div id="tasks"></div>
          <div id='bull'>
            Bull Action
            <button id="done-btn">Done</button>
            <button id="remove-btn" onClick={removeall}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
