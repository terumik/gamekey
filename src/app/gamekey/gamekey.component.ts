import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { GamekeyService } from '../services/gamekey.service';
import { GameKey } from '../models/Gamekey.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateGamekeyComponent } from './create-gamekey/create-gamekey.component';

@Component({
  selector: 'app-gamekey',
  templateUrl: './gamekey.component.html',
  styleUrls: ['./gamekey.component.scss']
})
export class GamekeyComponent implements OnInit, OnDestroy {

  @ViewChild('nameInput', { static: true }) nameInput: ElementRef;
  @ViewChild('emailInput', { static: true }) emailInput: ElementRef;

  gamekeys: GameKey[];
  gamekeySub: Subscription;

  storedName = '';
  storedEmail = '';

  constructor(
    private gamekeyService: GamekeyService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.gamekeySub = this.gamekeyService.loadGameKeys$().subscribe(
      res => this.gamekeys = res
    );
  }

  ngOnDestroy(): void {
    this.gamekeySub.unsubscribe();
  }

  openDialog() {
    this.dialog.open(CreateGamekeyComponent, {
      width: '50%',
    });
  }

}
