import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const auth = req.headers.get('authorization');
    if (!auth?.startsWith('Bearer ')) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    const token = auth.slice(7);
    const user = verifyToken(token);
    if (!user || user.role !== 'admin') return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });

    const id = params.id;
    const app = await prisma.application.findUnique({ where: { id } });
    if (!app) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: app });
  } catch (e) {
    console.error('Admin get app detail error:', e);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}


