import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('/', async () => {
    return { ola: 'Mundo' };
  });

  Route.resource('/moments', 'MomentsController').apiOnly();
  /**
   * GET|HEAD   /api/moments ────────────── moments.index › MomentsController.index
   * POST       /api/moments ────────────── moments.store › MomentsController.store
   * GET|HEAD   /api/moments/:id ────────── moments.show › MomentsController.show
   * PUT|PATCH  /api/moments/:id ────────── moments.update › MomentsController.update
   * DELETE     /api/moments/:id ────────── moments.destroy › MomentsController.destroy
   */
}).prefix('api');
