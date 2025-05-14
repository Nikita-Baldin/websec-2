import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {map, Observable, switchMap} from "rxjs";
import {StationService} from "../services/station-code.service";
import {ApiService, StationSchedule} from "../services/api.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-station-schedule',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './station-schedule.component.html',
  styleUrl: './station-schedule.component.css'
})
export class StationScheduleComponent implements OnInit{
  // schedule$: Observable<StationSchedule[]> | null = null;
  //
  // constructor(
  //   private apiService: ApiService,
  //   private stationService: StationService
  // ) {}
  //
  // ngOnInit() {
  //   console.log("Отображаем расписание");
  //
  //   this.schedule$ = this.stationService.selectedStations$.pipe(
  //     switchMap(([from, to]) => {
  //       if (from && to) {
  //         console.log(`Ищем расписание между ${from} и ${to}`);
  //         return this.apiService.searchRoutes(from, to);
  //       } else if (from) {
  //         console.log(`Ищем расписание для станции ${from}`);
  //         return this.apiService.getSchedule(from);
  //       }
  //       return [];
  //     }),
  //     map(schedule => schedule && schedule.length ? this.filterUniqueDepartures(schedule) : [])
  //   );
  // }
  //
  // private filterUniqueDepartures(schedule: StationSchedule[]): StationSchedule[] {
  //   const uniqueDepartures = new Set<string>();
  //   return schedule.filter(item => {
  //     if (!uniqueDepartures.has(item.departure)) {
  //       uniqueDepartures.add(item.departure);
  //       return true;
  //     }
  //     return false;
  //   });
  // }
  schedule: StationSchedule[] | null = null;
  loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private stationService: StationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log("Отображаем расписание");

    this.stationService.selectedStations$.subscribe(([from, to]) => {
      if (from) {
        this.loading = true;
        console.log(`Ищем расписание для станции ${from}`);

        const request$ = to
          ? this.apiService.searchRoutes(from, to)
          : this.apiService.getSchedule(from);

        request$.subscribe(
          data => {
            this.schedule = this.filterUniqueDepartures(data);
            this.loading = false;
            this.cdr.detectChanges();
          },
          error => {
            console.error("Ошибка загрузки расписания:", error);
            this.schedule = [];
            this.loading = false;
            this.cdr.detectChanges();
          }
        );
      } else {
        this.schedule = null;
      }
    });
  }

  private filterUniqueDepartures(schedule: StationSchedule[]): StationSchedule[] {
    const uniqueDepartures = new Set<string>();
    return schedule.filter(item => {
      if (!uniqueDepartures.has(item.departure)) {
        uniqueDepartures.add(item.departure);
        return true;
      }
      return false;
    });
  }
}
