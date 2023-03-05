import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Moment from 'App/Models/Moment';

export default class MomentsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body();
    const moment = await Moment.create(body);
    response.status(201);
    return {
      message: 'ok',
      data: moment,
    };
  }
}

// https://www.youtube.com/watch?v=y8XfJJYhXPE
// PAREI NO TEMPO: 38:39

/**
 * GET|HEAD   /api/moments ────────────── moments.index ›   MomentsController.index
 * POST       /api/moments ────────────── moments.store ›   MomentsController.store
 * GET|HEAD   /api/moments/:id ────────── moments.show ›    MomentsController.show
 * PUT|PATCH  /api/moments/:id ────────── moments.update ›  MomentsController.update
 * DELETE     /api/moments/:id ────────── moments.destroy › MomentsController.destroy
 */
