import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importar el guard

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'olvido-contrasena',
    loadChildren: () => import('./pages/olvido-contrasena/olvido-contrasena.module').then(m => m.OlvidoContrasenaPageModule)
  },
  {
    path: 'inicio-profesor',
    loadChildren: () => import('./pages/inicio-profesor/inicio-profesor.module').then(m => m.InicioProfesorPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'inicio-alumno',
    loadChildren: () => import('./pages/inicio-alumno/inicio-alumno.module').then(m => m.InicioAlumnoPageModule),
    canActivate: [AuthGuard] 
  },
  // {
  //   path: 'generar-qr',
  //   loadChildren: () => import('./pages/generar-qr/generar-qr.module').then(m => m.GenerarQRPageModule)
  // },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: 'mis-cursos',
    loadChildren: () => import('./pages/mis-cursos/mis-cursos.module').then( m => m.MisCursosPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'crear-curso',
    loadChildren: () => import('./pages/crear-curso/crear-curso.module').then( m => m.CrearCursoPageModule)
  },
  {
    path: 'detalles-curso',
    loadChildren: () => import('./pages/detalles-curso/detalles-curso.module').then( m => m.DetallesCursoPageModule)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },

 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
