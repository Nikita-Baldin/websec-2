import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Station } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: Station[] = [];
  private favoritesSubject = new BehaviorSubject<Station[]>(this.favorites);
  favorites$ = this.favoritesSubject.asObservable();

  toggleFavorite(station: Station) {
    const index = this.favorites.findIndex(s => s.code === station.code);
    if (index === -1) {
      this.favorites.push(station);
    } else {
      this.favorites.splice(index, 1);
    }
    this.favoritesSubject.next([...this.favorites]);
  }

  isFavorite(code: string): boolean {
    return this.favorites.some(s => s.code === code);
  }

  getFavorites(): Station[] {
    return this.favorites;
  }
}
