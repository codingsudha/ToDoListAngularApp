import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Task } from "../models/task";


@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todoItem.component.html',
  styleUrl: './todoItem.component.css'
})
export class ItemComponent {

  editable = false;

  @Input() task!: Task;
  
  @Output() updateTask = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();

  updateDescription(newDesc: string) {
    
    if (!newDesc) return;
      this.task.description = newDesc;
    console.log("New Description:" + newDesc);  
    this.updateTask.emit(this.task); // Emit event with updated task
  }

  removeItem(){
    this.remove.emit(this.task);
  }

  onTaskChange(){
    console.log("Reached Inside Task"+ this.task.done);
    this.task.done = !this.task.done;
    this.updateTask.emit(this.task);
  }
}



