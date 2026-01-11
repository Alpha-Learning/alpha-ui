import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const ALS_API_BASE_URL = process.env.ALS_API_BASE_URL

    if (!ALS_API_BASE_URL) {
      console.error("ALS_API_BASE_URL or FRANK_API_BASE_URL environment variable is not set");
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error",
        },
        { status: 500 }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    // Handle trailing slash in base URL
    const baseUrl = ALS_API_BASE_URL.endsWith('/') ? ALS_API_BASE_URL.slice(0, -1) : ALS_API_BASE_URL;
    const loginUrl = `${baseUrl}/auth/login`;
    
    console.log("Calling ALS login API:", loginUrl);
    
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log("response after login =======", response);

    // Check content type before parsing
    const contentType = response.headers.get("content-type");
    const responseText = await response.text();
    
    console.log("ALS login response status:", response.status);
    console.log("ALS login response content-type:", contentType);
    console.log("ALS login response preview:", responseText.substring(0, 200));

    // If response is HTML (error page), return error
    if (!contentType || !contentType.includes("application/json")) {
      console.error("ALS server returned non-JSON response (likely HTML error page)");
      return NextResponse.json(
        {
          success: false,
          message: `ALS server returned an error page. Please check the endpoint URL: ${loginUrl}`,
          error: {
            status: response.status,
            contentType: contentType,
            preview: responseText.substring(0, 200),
          },
        },
        { status: response.status || 500 }
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
      console.log("data after login =======", data);
    } catch (parseError) {
      console.error("Failed to parse ALS response as JSON:", parseError);
      return NextResponse.json(
        {
          success: false,
          message: "ALS server returned invalid JSON response",
          error: {
            status: response.status,
            preview: responseText.substring(0, 200),
          },
        },
        { status: response.status || 500 }
      );
    }

    if (!response.ok || data.error) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || data.error?.message || data.error || "Invalid credentials",
        },
        { status: response.status || 401 }
      );
    }

    // Extract token from response
    // The token might be in different fields: token, access_token, authToken, etc.
    const token = data.token || data.access_token || data.authToken || data.data?.token;

    if (!token) {
      console.error("ALS login response:", data);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to get token from ALS",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      token: token,
      message: "Login successful",
      data: data,
    });
  } catch (error) {
    console.error("ALS login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to ALS server",
      },
      { status: 500 }
    );
  }
}
