import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { visualValidationSchema } from 'validationSchema/visuals';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.visual
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getVisualById();
    case 'PUT':
      return updateVisualById();
    case 'DELETE':
      return deleteVisualById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVisualById() {
    const data = await prisma.visual.findFirst(convertQueryToPrismaUtil(req.query, 'visual'));
    return res.status(200).json(data);
  }

  async function updateVisualById() {
    await visualValidationSchema.validate(req.body);
    const data = await prisma.visual.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteVisualById() {
    const data = await prisma.visual.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
