import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Application from '@ioc:Adonis/Core/Application';
import { v4 as uuidv4 } from 'uuid';
import Moment from 'App/Models/Moment';

export default class MomentsController {
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  };

  public async index() {
    const moments = await Moment.all();
    return {
      data: moments,
    };
  }

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

    const moments = await Moment.create(body);
    response.status(201);
    return {
      message: 'ok',
      data: moments,
    };
  }

  public async show({ params }: HttpContextContract) {
    const moment = await Moment.findOrFail(params.id);

    return {
      data: moment,
    };
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body();
    const moment = await Moment.findOrFail(params.id);

    moment.title = body.title;
    moment.description = body.description;

    if (!moment.image || moment.image !== body.image) {
      const image = request.file('image', this.validationOptions);

      if (image) {
        const imageName = `${uuidv4()}.${image.extname}`;
        await image.move(Application.tmpPath('uploads'), {
          name: imageName,
        });
        moment.image = imageName;
      }
    }

    await moment.save();

    return {
      message: 'Dados atualizados com sucesso',
      data: moment,
    };
  }

  public async destroy({ params }: HttpContextContract) {
    const moment = await Moment.findOrFail(params.id);

    await moment.delete();

    return {
      message: 'Registro excluído com sucesso',
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
