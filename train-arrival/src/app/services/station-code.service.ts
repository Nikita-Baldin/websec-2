import { Injectable } from '@angular/core';
import {BehaviorSubject, combineLatest} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private fromStationCode = new BehaviorSubject<string | null>(null);
  private toStationCode = new BehaviorSubject<string | null>(null);

  fromStationCode$ = this.fromStationCode.asObservable();
  toStationCode$ = this.toStationCode.asObservable();

  selectedStations$ = combineLatest([this.fromStationCode$, this.toStationCode$]);

  setFromStation(code: string) {
    this.fromStationCode.next(code);
    console.log("Выбрана отправная станция:", code);
    console.log("Текущее состояние fromStationCode:", this.fromStationCode.value);
  }

  setToStation(code: string | null) {
    this.toStationCode.next(code);
    console.log(code ? `Выбрана станция назначения: ${code}` : "Станция назначения сброшена");
  }

  resetStations() {
    this.toStationCode.next(null);
    this.fromStationCode.next(null);
  }
}
