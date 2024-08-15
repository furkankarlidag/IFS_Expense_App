import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'unauthorized-dialog',
  template: `<h1 mat-dialog-title>Unauthorized</h1>
  `,
})
export class UnauthorizedDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
