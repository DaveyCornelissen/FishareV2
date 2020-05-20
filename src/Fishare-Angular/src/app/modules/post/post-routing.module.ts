import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';

const routes: Routes = [
  {
      path: '',
      redirectTo: '/posts/timeline',
      pathMatch: 'full'
  },
  {
      path: '',
      children: [
          { path: 'timeline', component: TimelineComponent }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
