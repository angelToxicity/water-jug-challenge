import { Component, inject  } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { NumberRestricDirective } from "./directives/only-number.directive";
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from "../environments/environment.development";
import { CryptoService } from "./services/crypto/crypto.service";
import { DialogComponent } from "./components/dialog/dialog.component";
import Swal from 'sweetalert2'

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

const api_url = environment.url;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatCardModule, MatInputModule,MatFormFieldModule, ReactiveFormsModule, NumberRestricDirective, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'water-jug-challenge';
  readonly dialog = inject(MatDialog);
  form = new FormGroup({
    x: new FormControl('', [Validators.min(1), Validators.required]),
    y: new FormControl('', [Validators.min(1), Validators.required]),
    z: new FormControl('', [Validators.min(1), Validators.required])
  });

  constructor(private crypto:CryptoService, private http:HttpClient){}

  get x () {
    return this.form.get("x")
  }
  
  get y () {
    return this.form.get("y")
  }
  
  get z () {
    return this.form.get("z")
  }

  ngOnInit(){
    this.fireInfo()
  }
  
  fireInfo(){
    Swal.fire({
      title: "Water Jug Challenge",
      text: `Welcome to the Water Jug Challenge!. The challenge involves using two jugs with
            different capacities (X gallons and Y gallons) to measure exactly Z gallons of water.
            Please provide capacity of each jug.`,
      icon: "info",
      heightAuto: false
    })
  }
  
  submitForm(){
    let obj_req = {
      x: this.x?.value,
      y: this.y?.value,
      z: this.z?.value
    }
    
    let req = this.crypto.encryptData(JSON.stringify(obj_req))
    
    this.http.post<Object>(api_url+'/calculate', {data: req}).subscribe({
      next: (res:any) => {
        let response = JSON.parse(this.crypto.decryptData(res.data))
        const dialogRef = this.dialog.open(DialogComponent, {
          data: {steps: response, values: obj_req},
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.form.reset()
          this.fireInfo()
        });
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
