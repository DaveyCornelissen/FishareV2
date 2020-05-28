import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { PostRoutingModule } from './post-routing.module';



@NgModule({
  declarations: [TimelineComponent],
  imports: [
    PostRoutingModule,
    CommonModule
  ]
})
export class PostModule { }
