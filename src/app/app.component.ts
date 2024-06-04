import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Task } from "./models/task";
import { ItemComponent } from "./todoItem/todoItem.component";
import{ FormsModule} from "@angular/forms"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,ItemComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  componentTitle = "To Do List";

  allTaks: Task[] = []

  ngOnInit(): void {
    this.allTaks = this.getAll();
  }

  addItem(desc: string) {

    console.log("reached here");
    if (desc != null && desc != "") {
      let obj: Task = {
        id: new Date().getTime(),
        description: desc,
        done: false
      };
      console.log(obj);
      this.allTaks.push(obj);
      this.save(this.allTaks);
  }
}

  remove(task: Task) {
    console.log("Reached remove:")
    this.allTaks.splice(this.allTaks.indexOf(task), 1);
    let newList: Task[] = this.getAll();
    let index = newList.indexOf(task);
    if (index != null && newList.length > index) {
      newList.splice(index, 1);
      this.save(newList);
    }
  }
  
  save(allTaks: Task[]) {
    localStorage.setItem("todo", JSON.stringify(this.allTaks));
  }
  
  getAll() {
    let value = localStorage.getItem("todo");
    if (value != '' && value != null && typeof value != "undefined") {
      return JSON.parse(value!);
    }
    return [];
  }

  updateTask(task: Task) {
    console.log("why it is not reaching here");
    const taskIndex = this.allTaks.findIndex(t => t.id === task.id);
    console.log("Reached inside update task" + taskIndex);
    if (taskIndex !== -1) {
      this.allTaks[taskIndex] = task;
      this.updateLocalStorage(); // Call a separate function to update localStorage
    }
  }

  updateLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(this.allTaks));
  }
}

