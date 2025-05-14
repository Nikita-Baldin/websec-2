import { Component } from '@angular/core';
import {FavoriteService} from "../../services/favorite.service";
import {Station} from "../../services/api.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
  favorites$ = this.favoriteService.favorites$;

  constructor(private favoriteService: FavoriteService) {}

  removeFavorite(station: Station) {
    this.favoriteService.toggleFavorite(station);
  }
}
