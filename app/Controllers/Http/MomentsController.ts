import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Application from '@ioc:Adonis/Core/Application';
import { v4 as uuidv4 } from 'uuid';
import Moment from 'App/Models/Moment';

export default class MomentsController {
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  };

  public async store({ request, response }: HttpContextContract) {
    const body = request.body();
    const image = request.file('image', this.validationOptions);

    if (image) {
      const imageName = `${uuidv4()}.${image.extname}`;
      await image.move(Application.tmpPath('uploads'), {
        name: imageName,
      });
      body.image = imageName;
    }

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
