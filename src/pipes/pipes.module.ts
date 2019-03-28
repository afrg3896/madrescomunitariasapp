import { NgModule } from '@angular/core';
import { PlaceHolderPipe } from './place-holder/place-holder';
import { SafePipe } from './safe/safe';
@NgModule({
	declarations: [PlaceHolderPipe,
    SafePipe],
	imports: [],
	exports: [PlaceHolderPipe,
    SafePipe]
})
export class PipesModule {}
