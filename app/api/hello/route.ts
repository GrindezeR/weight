import { NextResponse } from 'next/server';
import { prisma } from '../../../prisma/db';

export async function GET() {
  const weight = await prisma.weight.findMany({
    orderBy: [
      {
        date: 'desc',
      },
    ],
  });
  return NextResponse.json(weight);
}

type PostData = {
  weight?: number;
  date?: Date;
  id?: number;
};

export async function POST(request: Request) {
  const data: PostData = await request.json();
  console.log({ DATAPOST: data });
  const query = await prisma.weight.create({
    data: {
      weight: data.weight,
    },
  });
  return NextResponse.json(query);
}

export async function PUT(request: Request) {
  const data: PostData = await request.json();
  console.log({ DATAPUT: data });
  const query = await prisma.weight.update({
    data: {
      weight: data.weight,
      // date: data.date,
    },
    where: {
      id: data.id,
    },
  });
  return NextResponse.json(query);
}
