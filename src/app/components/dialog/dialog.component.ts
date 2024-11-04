import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogContent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  prev:number[] = []

  ngOnInit(){
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  explanation(a:number, b:number, index:number):string {
    if (a == 0 && b == 0) {
      this.prev = [a,b]
      return "Initial state"
    }
    
    if (a > this.prev[0] && b < this.prev[1]) {
      this.prev = [a,b]
      return "Transfer from jug y to jug x"
    }
    
    if (b > this.prev[1] && a < this.prev[0]) {
      this.prev = [a,b]
      return "Transfer from jug x to jug y"
    }
    
    if (a == this.data.values.x) {
      this.prev = [a,b]
      return "Fill jug x"
    }
    
    if (b == this.data.values.y) {
      this.prev = [a,b]
      return "Fill jug y"
    }
    
    return ""
  }
}
