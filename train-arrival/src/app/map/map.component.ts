import {
  AfterViewInit,
  Component, EventEmitter, Output,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {ApiService} from "../services/api.service";
import {SelectButtonComponent} from "../select-button/select-button.component";

declare var ymaps: any;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {

  private map: any;
  private userPlacemark: any;

  @ViewChild('balloonContainer', { read: ViewContainerRef }) balloonContainer!: ViewContainerRef;
  @Output() stationSelected = new EventEmitter<string>();

  constructor(private apiService: ApiService) {}

  ngAfterViewInit() {
    this.loadMap();
  }

  private loadMap(): void {
    ymaps.ready(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [position.coords.latitude, position.coords.longitude];
          this.initMap(userCoords);
        },
        (error) => {
          console.error('Ошибка определения местоположения', error);
          this.initMap([53.2001, 50.15]);
        }
      );
    });
  }

  private initMap(coords: number[]): void {
    this.map = new ymaps.Map('map', {
      center: coords,
      zoom: 12,
      controls: ['zoomControl', 'geolocationControl']
    });

    this.addUserPlacemark(coords);
    this.loadNearbyStations(coords);

    this.map.events.add('click', (event: any) => {
      const newCoords = event.get('coords');
      this.updateLocation(newCoords);
    });
  }

  private addUserPlacemark(coords: number[]): void {
    if (this.userPlacemark) {
      this.map.geoObjects.remove(this.userPlacemark);
    }

    this.userPlacemark = new ymaps.Placemark(
      coords,
      { hintContent: 'Вы здесь', balloonContent: 'Ваше местоположение' },
      { preset: 'islands#redDotIcon' }
    );

    this.map.geoObjects.add(this.userPlacemark);
  }

  private updateLocation(coords: number[]): void {
    this.map.setCenter(coords, 12);
    this.addUserPlacemark(coords);
    this.loadNearbyStations(coords);
  }

  private loadNearbyStations(coords: number[], distance: number = 50): void {
    this.apiService.getNearestStations(coords[0], coords[1], distance).subscribe(
      (response) => {
        let stations = response?.stations || [];

        stations = stations.filter((station: { lat: number; lng: number; title: string, transport_type: string }) =>
          station.transport_type === 'train' || station.transport_type === 'suburban'
        );

        this.map.geoObjects.removeAll();
        this.addUserPlacemark(coords);

        stations.forEach((station: { lat: number; lng: number; title: string, code: string }) => {
          const placemark = new ymaps.Placemark(
            [station.lat, station.lng],
            { hintContent: station.title },
            { preset: 'islands#blueDotIcon' }
          );

          placemark.events.add('click', () => this.showBalloonWithComponent(placemark, station.title, station.code));
          this.map.geoObjects.add(placemark);
        });
      },
      (error) => {
        console.error('Ошибка загрузки ближайших станций', error);
      }
    );
  }

  private showBalloonWithComponent(placemark: any, title: string, stationCode: string): void {
    if (!this.balloonContainer) {
      console.error("balloonContainer не инициализирован");
      return;
    }

    this.balloonContainer.clear();
    const componentRef = this.balloonContainer.createComponent(SelectButtonComponent);
    componentRef.instance.code = stationCode;
    componentRef.instance.stationSelected.subscribe((selectedCode: string) => {
      this.stationSelected.emit(selectedCode);
    });

    const container = document.createElement('div');
    container.innerHTML = `<h3>${title}</h3>`;
    container.appendChild(componentRef.location.nativeElement);

    placemark.balloon.open();
    setTimeout(() => {
      const balloonElement = document.querySelector('.ymaps-2-1-79-balloon__content');
      if (balloonElement) {
        balloonElement.innerHTML = '';
        balloonElement.appendChild(container);
      }
    }, 100);
  }
}
