import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { digitalMarketingValidationSchema } from 'validationSchema/digital-marketings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.digital_marketing
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDigitalMarketingById();
    case 'PUT':
      return updateDigitalMarketingById();
    case 'DELETE':
      return deleteDigitalMarketingById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDigitalMarketingById() {
    const data = await prisma.digital_marketing.findFirst(convertQueryToPrismaUtil(req.query, 'digital_marketing'));
    return res.status(200).json(data);
  }

  async function updateDigitalMarketingById() {
    await digitalMarketingValidationSchema.validate(req.body);
    const data = await prisma.digital_marketing.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDigitalMarketingById() {
    const data = await prisma.digital_marketing.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
