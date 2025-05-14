import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Station {
  title: string;
  code: string;
  transport_type: string;
}

export interface StationSchedule {
  title: string;
  departure: string;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';
  private stationsCache: any[] | null = null;

  constructor(private http: HttpClient) {
    this.getAllStations();
  }

  getAllStations(): Observable<any> {
    if (this.stationsCache) {
      return of({ stations: this.stationsCache });
    }
    return this.http.get<{ stations: any[] }>(`${this.apiUrl}/allStations`).pipe(
      tap(data => this.stationsCache = data.stations)
    );
  }

  getSchedule(stationCode: string): Observable<StationSchedule[]> {
    console.log("Получаем расписание");
    return this.http.get<{ schedule: any[] }>(`${this.apiUrl}/schedule`, { params: { station: stationCode } }).pipe(
      map(response => response.schedule.map(item => ({
        title: item.thread.title,
        departure: item.departure
      })))
    );
  }

  getNearestStations(lat: number, lng: number, distance: number = 50): Observable<any> {
    return this.http.get(`${this.apiUrl}/nearestStations`, { params: { lat, lng, distance } });
  }

  searchRoutes(from: string, to: string): Observable<StationSchedule[]> {
    console.log("Получаем расписание между станциями");
    return this.http.get<{ segments: any[] }>(`${this.apiUrl}/searchRoutes`, { params: { from, to } }).pipe(
      map(response => response.segments ? response.segments.map(segment => ({
        title: segment.thread.title,
        departure: segment.departure
      })) : [])
    );
  }



}
