import { Component, OnInit, Input } from '@angular/core';
import { GameKey } from 'src/app/models/Gamekey.model';
import { CreateGamekeyComponent } from '../create-gamekey/create-gamekey.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gamekey-list',
  templateUrl: './gamekey-list.component.html',
  styleUrls: ['./gamekey-list.component.scss']
})
export class GamekeyListComponent implements OnInit {

  @Input() gamekeys: GameKey[];
  displayedColumns: string[] = ['id', 'gamekey', 'name', 'email', 'delete'];

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onOpenEditDialog(rowData) {
    // open dialog for edit
    this.dialog.open(CreateGamekeyComponent, {
      width: '50%',
      data: rowData
    });

  }
}
