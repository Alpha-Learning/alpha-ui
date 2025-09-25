import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";
import { z } from "zod";

const schema = z.object({
  id: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const auth = req.headers.get('authorization');
    if (!auth?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    const token = auth.slice(7);
    const user = verifyToken(token);
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Validation failed', errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const app = await prisma.application.findUnique({ where: { id: parsed.data.id } });
    if (!app || app.userId !== user.id) {
      return NextResponse.json({ success: false, message: 'Application not found' }, { status: 404 });
    }
    if (app.status !== 'completed') {
      return NextResponse.json({ success: false, message: 'Payment allowed only for completed applications' }, { status: 400 });
    }

    const updated = await prisma.application.update({
      where: { id: app.id },
      data: { isPaid: true, paymentAmount: 150, paidAt: new Date() },
      select: { id: true, isPaid: true, paymentAmount: true, paidAt: true }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    console.error('Pay error:', e);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}


