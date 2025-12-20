import { NextResponse } from "next/server";

const ODOO_BASE_URL = process.env.ODOO_BASE_URL || "https://smslive.alpheraacademy.edu.bh";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionSid, parent, student } = body;

    if (!sessionSid) {
      return NextResponse.json(
        {
          success: false,
          message: "Session SID is required. Please login to Odoo first.",
        },
        { status: 401 }
      );
    }

    if (!parent || !student) {
      return NextResponse.json(
        {
          success: false,
          message: "Parent and student data are required",
        },
        { status: 400 }
      );
    }

    // Format payload according to Odoo's expected structure
    const payload = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        parent: {
          full_name: parent.full_name,
          email: parent.email,
          phone: parent.phone || "",
          relation_to_child_id: parent.relation_to_child_id || 1,
        },
        student: {
          full_name: student.full_name,
          date_of_birth: student.date_of_birth,
          age: student.age,
          gender: student.gender,
          school_year: student.school_year || null,
          current_school: student.current_school || null,
          school_type: student.school_type || null,
        },
      },
      id: Math.floor(Math.random() * 100000),
    };

    // Call Odoo admission API with session_sid as cookie
    const response = await fetch(`${ODOO_BASE_URL}/api/admission/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `session_id=${sessionSid}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.error || !data.result) {
      return NextResponse.json(
        {
          success: false,
          message: data.error?.message || data.error?.data?.message || "Failed to create admission",
        },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admission created successfully",
      data: data.result,
    });
  } catch (error) {
    console.error("Odoo admission create error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to Odoo server",
      },
      { status: 500 }
    );
  }
}

