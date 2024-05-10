import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './oapdis/login/guard/auth.guard';
import { RoleGuard } from './oapdis/login/guard/role.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                component: AppLayoutComponent,
                canActivate: [AuthGuard, RoleGuard],
                data: { roles: ["Kullanıcı", "Akademisyen"] },
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./oapdis/oapdis.module').then(m => m.OapdisModule),
                        canActivate: [AuthGuard, RoleGuard],
                        data: { roles: ["Kullanıcı", "Akademisyen"] },
                    },
                    {
                        path: 'home',
                        loadChildren: () => import('./oapdis/oapdis.module').then(m => m.OapdisModule),
                        canActivate: [AuthGuard, RoleGuard],
                        data: { roles: ["Kullanıcı", "Akademisyen"] },
                    },
                    {
                        path: 'faculty',
                        data: { roles: ["Kullanıcı"] },
                        canActivate: [AuthGuard, RoleGuard],
                        children: [
                            {
                                path: '',
                                loadChildren: () => import('./oapdis/faculty/faculty.module').then(m => m.FacultyModule),
                            },
                            {
                                path: 'form',
                                loadChildren: () => import('./oapdis/faculty/faculty.module').then(m => m.FacultyModule)
                            },
                            {
                                path: 'form/:id',
                                loadChildren: () => import('./oapdis/faculty/faculty.module').then(m => m.FacultyModule)
                            }
                        ]
                    },
                    {
                        path: 'department',
                        data: { roles: ["Kullanıcı"] },
                        canActivate: [AuthGuard, RoleGuard],
                        children: [
                            {
                                path: '',
                                loadChildren: () => import('./oapdis/department/department.module').then(m => m.DepartmentModule),
                            },
                            {
                                path: 'form',
                                loadChildren: () => import('./oapdis/department/department.module').then(m => m.DepartmentModule)
                            },
                            {
                                path: 'form/:id',
                                loadChildren: () => import('./oapdis/department/department.module').then(m => m.DepartmentModule)
                            }
                        ]
                    },
                    {
                        path: 'teacher',
                        data: { roles: ["Kullanıcı"] },
                        canActivate: [AuthGuard, RoleGuard],
                        children: [
                            {
                                path: '',
                                loadChildren: () => import('./oapdis/teacher/teacher.module').then(m => m.TeacherModule),
                            },
                            {
                                path: 'form',
                                loadChildren: () => import('./oapdis/teacher/teacher.module').then(m => m.TeacherModule)
                            },
                            {
                                path: 'form/:id',
                                loadChildren: () => import('./oapdis/teacher/teacher.module').then(m => m.TeacherModule)
                            }
                        ]
                    },
                    {
                        path: 'user',
                        data: { roles: ["Kullanıcı"] },
                        canActivate: [AuthGuard, RoleGuard],
                        children: [
                            {
                                path: '',
                                loadChildren: () => import('./oapdis/user/user.module').then(m => m.UserModule),
                            },
                            {
                                path: 'form',
                                loadChildren: () => import('./oapdis/user/user.module').then(m => m.UserModule)
                            },
                            {
                                path: 'form/:id',
                                loadChildren: () => import('./oapdis/user/user.module').then(m => m.UserModule)
                            }
                        ]
                    },
                    {
                        path: 'teacher-project',
                        data: { roles: ["Akademisyen"] },
                        canActivate: [AuthGuard, RoleGuard],
                        children: [
                            {
                                path: '',
                                loadChildren: () => import('./oapdis/teacher-project/teacher-project.module').then(m => m.TeacherProjectModule),
                            },
                            {
                                path: 'form',
                                loadChildren: () => import('./oapdis/teacher-project/teacher-project.module').then(m => m.TeacherProjectModule)
                            },
                            {
                                path: 'form/:id',
                                loadChildren: () => import('./oapdis/teacher-project/teacher-project.module').then(m => m.TeacherProjectModule)
                            }
                        ]
                    },
                    {
                        path: 'teacher-meeting',
                        data: { roles: ["Akademisyen"] },
                        canActivate: [AuthGuard, RoleGuard],
                        children: [
                            {
                                path: '',
                                loadChildren: () => import('./oapdis/teacher-meeting/teacher-meeting.module').then(m => m.TeacherMeetingModule),
                            },
                            {
                                path: 'form',
                                loadChildren: () => import('./oapdis/teacher-meeting/teacher-meeting.module').then(m => m.TeacherMeetingModule)
                            },
                            {
                                path: 'form/:id',
                                loadChildren: () => import('./oapdis/teacher-meeting/teacher-meeting.module').then(m => m.TeacherMeetingModule)
                            }
                        ]
                    },
                    {
                        path: 'teacher-article',
                        data: { roles: ["Akademisyen"] },
                        canActivate: [AuthGuard, RoleGuard],
                        children: [
                            {
                                path: '',
                                loadChildren: () => import('./oapdis/teacher-article/teacher-article.module').then(m => m.TeacherArticleModule),
                            },
                            {
                                path: 'form',
                                loadChildren: () => import('./oapdis/teacher-article/teacher-article.module').then(m => m.TeacherArticleModule)
                            },
                            {
                                path: 'form/:id',
                                loadChildren: () => import('./oapdis/teacher-article/teacher-article.module').then(m => m.TeacherArticleModule)
                            }
                        ]
                    },
                    {
                        path: 'profile',
                        data: { roles: ["Kullanıcı", "Akademisyen"] },
                        canActivate: [AuthGuard, RoleGuard],
                        children: [
                            {
                                path: '',
                                loadChildren: () => import('./oapdis/profile/profile.module').then(m => m.ProfileModule),
                            }
                        ]
                    },
                    {
                        path: 'teacher-activity',
                        data: { roles: ["Kullanıcı"] },
                        canActivate: [AuthGuard, RoleGuard],
                        children: [
                            {
                                path: '',
                                loadChildren: () => import('./oapdis/teacher-activity/teacher-activity.module').then(m => m.TeacherActivityModule),
                            }
                        ]
                    }
                ],
            },
            {
                path: 'login',
                loadChildren: () => import('./oapdis/login/login.module').then(m => m.LoginModule)
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
