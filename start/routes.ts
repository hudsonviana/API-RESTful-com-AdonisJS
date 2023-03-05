import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('/', async () => {
    return { ola: 'Mundo' };
  });

  Route.post('/moments', 'MomentsController.store');
}).prefix('api');
