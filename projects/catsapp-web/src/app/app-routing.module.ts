import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { TableComponent } from './table/table.component';
import { GifComponent } from './gif/gif.component';
import { GameComponent } from './game/game.component';


const routes: Routes = [
    { path: '', component: WellcomeComponent },
    { path: 'breeds', component: TableComponent },
    { path: 'gif', component: GifComponent },
    { path: 'game', component: GameComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
