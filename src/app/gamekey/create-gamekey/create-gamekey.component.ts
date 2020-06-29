import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import * as shortid from 'shortid';
import { GamekeyService } from 'src/app/services/gamekey.service';
import { GameKey } from 'src/app/models/Gamekey.model';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-gamekey',
  templateUrl: './create-gamekey.component.html',
  styleUrls: ['./create-gamekey.component.scss']
})
export class CreateGamekeyComponent implements OnInit, OnDestroy {

  gameKey: GameKey;
  isEmailRequired: boolean;
  userForm: FormGroup;
  outputMsg: string;
  gamekeySub: Subscription;

  constructor(
    private gamekeyService: GamekeyService,
    public dialogRef: MatDialogRef<CreateGamekeyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GameKey // data coming from row -> dialog
  ) { }

  ngOnInit(): void {
    if (this.data) {
      // Update
      this.gameKey = new GameKey();
      this.gameKey = { ...this.data };
      this.userForm = this._initForm(this.data);
    } else {
      // Create
      this._generateGameKey();
      this.userForm = this._initForm();
    }
  }

  ngOnDestroy(): void {
    if (this.gamekeySub) {
      this.gamekeySub.unsubscribe();
    }
  }

  onToggleEmailOption() {
    this.isEmailRequired = !this.isEmailRequired;
  }

  onSubmit() {
    if (this.gameKey && this.userForm.valid) {

      if (this.data) {
        // Update
        this.gameKey = { ...this.gameKey, ...this.userForm.value };
        this.gamekeySub = this.gamekeyService.updateGameKey$(this.gameKey).subscribe();
      } else {
        // Create
        this.gameKey = { ...this.gameKey, ...this.userForm.value, timestamp: Date.now() };
        this.gamekeySub = this.gamekeyService.saveGameKey$(this.gameKey).subscribe();
      }

      this.dialogRef.close();
    } else {
      this.outputMsg = 'Invalid submission.';
    }
  }

  onDelete(id: string) {
    this.gamekeyService.deleteGameKey$(id).subscribe(
      () => this.dialogRef.close()
    );
  }

  onCancel() {
    this.dialogRef.close();
  }

  _initForm(val?: GameKey) {
    return new FormGroup(
      {
        name: new FormControl(val ? val.name : null),
        sendEmail: new FormControl(),
        email: new FormControl(val ? val.email : null)
      }, [this._validateIfChecked()]
    );
  }

  _validateIfChecked(): ValidatorFn {
    return (userForm: FormGroup): ValidationErrors | null => {
      const email = userForm.get('email').value;
      const checked = userForm.get('sendEmail').value;
      if (checked && !email) {
        return {
          error: true
        };
      }
      return null;
    };
  }

  _generateGameKey() {
    this.gameKey = new GameKey();
    this.gameKey.gameKey = shortid.generate();
  }

}
