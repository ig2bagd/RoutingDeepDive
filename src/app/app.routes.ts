import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { NotFoundComponent } from './not-found/not-found.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { resolveTitle, resolveUserName, UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { routes as userRoutes } from './users/users.routes';
import { resolveUserTasks, TasksComponent } from './tasks/tasks.component';
import { canLeaveEditPage, NewTaskComponent } from './tasks/new-task/new-task.component';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if(shouldGetAccess < 0.5) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    // redirectTo: 'tasks',
    // pathMatch: 'full',
    title: 'No task selected'
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    // canMatch: [dummyCanMatch],
    data: {
      message: 'Hello!'
    },
    resolve: {
      userName: resolveUserName  
    },
    title: resolveTitle
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
