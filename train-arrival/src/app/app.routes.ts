import { Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {RoutesComponent} from "./pages/routes/routes.component";
import {OnmapComponent} from "./pages/onmap/onmap.component";
import {FavoriteComponent} from "./pages/favorite/favorite.component";


export const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "routes", component: RoutesComponent },
  { path: "map", component: OnmapComponent },
  { path: "favorites", component: FavoriteComponent}
];
