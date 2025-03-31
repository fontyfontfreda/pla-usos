import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dialog-add',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.css']
})


export class DialogAddComponent {
  codi: number = 0;
  descripcio: string = '';
  zonaSeleccionada: number | null = null; // Per a les àrees

  constructor(
    public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tipus: number, zones?: any[] }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.codi && this.descripcio) {
      const result: any = { codi: this.codi, descripcio: this.descripcio };

      if (this.data.tipus === 2) {
        result.zonaCodi = this.zonaSeleccionada; // Afegim la propietat zonaCodi
      }

      this.dialogRef.close(result);
    }
  }

}

