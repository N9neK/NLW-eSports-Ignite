// HTTP methods / API RESTful / HTTP Codes ----- Informações básica: 
// GET - Busca alguma informação ;
//POST - Estiver criando algo, uma entidade ou recurso, no back-end ;
//PUT - Estiver editando uma entidade praticamente por completo (ex: editar perfil);
//PATCH - Editar uma informação específica dentro de uma entidade (ex: receber notificação e opção sim/não);
//DELETE - Deletar/remover alguma entidade do back-end;

//HTTP CODES - Começados com 2 são de sucesso; 3 são de redirecionamentos; 4 de erros que aconteceram por causa de algum código bugado, erro gerado pela aplicação; 5 erros inesperados;
/** TIPOS DE PARÂMENTROS
 * Query: Persistir estado. São sempre nomeados;
 * Route: Identificação de recurso. Não nomeados;
 * Body: Enviar várias informações, envio de formulários. Não aparece na URL, fica escondido na requisição, o mais recomendado para usar para informações sensíveis.
 */

import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minute-to-hour-string';

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ['query']
});

//-----------------GAMES-----------------
app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })

  return response.json(games);
});

//-----------------ADS-----------------
app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  })

  return response.status(201).json(ad);
});

//-----------------LISTA GAMES POR ADS-----------------
//:id - Os ':' indicam que o 'id' é um parâmetro, uma informação dinâmica
app.get('/games/:id/ads', async (request, response) => {  
  const gameId = request.params.id;
  
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }
  }))
})

//-----------------DISCORD-----------------

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })
  
  return response.json({
    discord: ad.discord,
  })
});

app.listen(3333)
