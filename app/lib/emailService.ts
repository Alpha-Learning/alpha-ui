import nodemailer from 'nodemailer';

// Email configuration - you'll need to set these environment variables
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

export interface PaymentEmailData {
  parentName: string;
  parentEmail: string;
  childName: string;
  paymentAmount: number;
  paymentDate: string;
  applicationId: string;
  walkthroughDate?: string;
  assessmentDate?: string;
  callerName?: string;
  screeningDate?: string;
}

export async function sendPaymentEmail(data: PaymentEmailData): Promise<boolean> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error('NEXT_PUBLIC_BASE_URL is not set. Email links will not work correctly.');
      throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
    }
    const paymentLink = `${baseUrl}/dashboard/user/requests?payment=true&applicationId=${data.applicationId}`;
    
    const mailOptions = {
      from: `"Alphera Academy" <${emailConfig.auth.user}>`,
      to: data.parentEmail,
      subject: `Payment Required - Alphera Academy Application for ${data.childName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Required - Alphera Academy</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8EC0C2, #142954); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .payment-box { background: white; border: 2px solid #8EC0C2; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .payment-button { 
              display: inline-block; 
              background: linear-gradient(135deg, #8EC0C2, #142954); 
              color: white; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              font-weight: bold; 
              margin: 10px 0;
            }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table td { padding: 10px; border-bottom: 1px solid #eee; }
            .details-table td:first-child { font-weight: bold; width: 40%; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Alphera Academy</h1>
              <h2>Payment Required</h2>
            </div>
            
            <div class="content">
              <p>Dear ${data.parentName},</p>
              
              <p>Thank you for completing the screening call for your child <strong>${data.childName}</strong>. We are pleased to inform you that your application has progressed to the next stage.</p>
              
              ${data.callerName ? `<p><strong>Screening Call Details:</strong><br>
              Caller: ${data.callerName}<br>
              ${data.screeningDate ? `Date: ${new Date(data.screeningDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}` : ''}</p>` : ''}
              
              <div class="payment-box">
                <h3>💰 Payment Details</h3>
                <table class="details-table">
                  <tr>
                    <td>Amount Due:</td>
                    <td><strong>$${data.paymentAmount}</strong></td>
                  </tr>
                  <tr>
                    <td>Due Date:</td>
                    <td><strong>${new Date(data.paymentDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</strong></td>
                  </tr>
                  <tr>
                    <td>Application ID:</td>
                    <td>${data.applicationId}</td>
                  </tr>
                </table>
                
                <div style="text-align: center; margin: 20px 0;">
                  <a href="${paymentLink}" class="payment-button" style="color: white !important;">💳 Make Payment Now</a>
                </div>
              </div>
              
              <h3>📅 Next Steps</h3>
              <ul>
                <li><strong>Payment:</strong> Please complete your payment using the link above</li>
                ${data.walkthroughDate ? `<li><strong>Facility Walkthrough:</strong> ${new Date(data.walkthroughDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</li>` : ''}
                ${data.assessmentDate ? `<li><strong>Assessment Day:</strong> ${new Date(data.assessmentDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</li>` : ''}
                <li><strong>Comprehensive Questionnaires:</strong> You will receive 3 questionnaires to complete</li>
                <li><strong>Guidebook:</strong> Additional information will be provided</li>
              </ul>
              
              <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
              
              <p>Best regards,<br>
              The Alphera Academy Team</p>
            </div>
            
            <div class="footer">
              <p>This email was sent regarding your application for Alphera Academy.</p>
              <p>If you did not expect this email, please contact us immediately.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Dear ${data.parentName},
        
        Thank you for completing the screening call for your child ${data.childName}. 
        We are pleased to inform you that your application has progressed to the next stage.
        
        PAYMENT DETAILS:
        Amount Due: $${data.paymentAmount}
        Due Date: ${new Date(data.paymentDate).toLocaleDateString()}
        Application ID: ${data.applicationId}
        
        Payment Link: ${paymentLink}
        
        NEXT STEPS:
        - Please complete your payment using the link above
        ${data.walkthroughDate ? `- Facility Walkthrough: ${new Date(data.walkthroughDate).toLocaleDateString()}` : ''}
        ${data.assessmentDate ? `- Assessment Day: ${new Date(data.assessmentDate).toLocaleDateString()}` : ''}
        - Comprehensive Questionnaires: You will receive 3 questionnaires to complete
        - Guidebook: Additional information will be provided
        
        If you have any questions or need assistance, please don't hesitate to contact us.
        
        Best regards,
        The Alphera Academy Team
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending payment email:', error);
    return false;
  }
}

export async function sendWelcomeEmail(userEmail: string, password?: string, userName?: string, userPhone?: string): Promise<boolean> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error('NEXT_PUBLIC_BASE_URL is not set. Email links will not work correctly.');
      throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
    }
    const dashboardUrl = `${baseUrl}/dashboard/user`;
    
    const mailOptions = {
      from: `"Alphera Academy" <${emailConfig.auth.user}>`,
      to: userEmail,
      subject: `Welcome to Alphera Academy`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Alphera Academy</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #004AAD; margin: 0; padding: 0; background-color: #E1D2BA; }
    .container { max-width: 100%; margin: 0 auto; background-color: #E1D2BA; }
    .header { background-image: url('https://alpheraacademy.edu.bh/homecrop2.jpg'); background-size: cover; background-position: center; width: 100%; min-height: 610px; position: relative; padding: 0; }
    .header-logo { max-width: 50px; height: auto; display: block; margin: 20px auto 0; }
    .content { background-color: #E1D2BA; padding: 30px 200px; }
    .welcome-title { color: #004AAD; font-size: 32px; font-weight: normal; text-align: center; margin: 20px 0; }
    .greeting { color: #004AAD; font-size: 16px; margin: 20px 0; }
    .info-box { background-color: #FBF3E8; border-radius: 40px; padding: 0px; margin: 20px 0; display: flex; }
    .info-box-left { background-color: #EFE4D2; border-radius: 40px; padding: 15px; margin-right: 20px; min-width: 120px; }
    .info-box-right { flex: 1; margin-top: 15px; }
    .info-row { margin: 12px 0; color: #004AAD; font-size: 14px; display: block; }
    .info-label { font-weight: 500; margin-right: 10px; }
    /* .waiting-list-box { border: 2px solid #FFC107; border-radius: 8px; padding: 20px; margin: 20px 0; background-color: #FBF3E8; } */
    .waiting-list-text { color: #004AAD; font-size: 14px; margin: 10px 0; }
    .button { 
      display: inline-block; 
      background-color: #004AAD; 
      color: white !important; 
      padding: 15px 40px; 
      text-decoration: none; 
      border-radius: 40px; 
      font-weight: bold; 
      margin: 20px auto;
      text-align: center;
    }
    .button-container { text-align: center; margin: 30px 0; }
    /* Footer with flex-wrap */
    .footer { background-color: #0A3E84; color: #82B3B4; padding: 30px 200px; display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 15px; width: 100%; max-width: 100%; box-sizing: border-box; }
    .footer .footer-contact { color: #82B3B4; font-size: 16px; display: flex; align-items: center; gap: 2px; flex-wrap: nowrap; white-space: nowrap; }
    .footer .footer-contact span { white-space: nowrap; }
    .footer .footer-separator { color: #82B3B4; margin: 0 10px; }
    .footer .footer-divider { width: 1px; height: 70px; background-color: #1D68CB !important; margin: 0 20px; flex-shrink: 0; }
    .footer .footer-social { display: flex; align-items: center; gap: 15px; flex-wrap: nowrap; white-space: nowrap; }
    .footer .footer-social img { display: block; width: 40.67px; height: 40.67px; border-radius: 8px; }
    .content-container { padding: 0 30px; }
    
    /* Responsive Styles */
    @media only screen and (max-width: 960px) {
      .footer { flex-direction: column !important; padding: 20px 15px !important; align-items: center !important; }
      .footer .footer-contact { justify-content: center !important; }
      .footer .footer-divider { width: 100% !important; height: 1px !important; margin: 10px 0 !important; }
      .footer .footer-social { justify-content: center !important; }
    }
    
    @media only screen and (max-width: 768px) {
      .container { max-width: 100% !important; }
      .header { min-height: 300px !important; }
      .header-logo { max-width: 50px !important; margin: 15px auto 0 !important; }
      .content { padding: 20px 15px !important; }
      .welcome-title { font-size: 24px !important; margin: 15px 0 !important; }
      .greeting { font-size: 14px !important; margin: 15px 0 !important; }
      .info-box { flex-direction: row !important; border-radius: 20px !important; padding: 0px !important; }
      .info-box-left { margin-right: 10px !important; margin-bottom: 0 !important; border-radius: 20px !important; min-width: 90px !important; padding: 10px !important; }
      .info-box-right { margin-top: 10px !important; display: block !important; }
      .info-row { margin: 6px 0 !important; font-size: 12px !important; display: block !important; width: 100% !important; }
      .button { padding: 10px 40px !important; font-size: 16px !important; font-weight: 700 !important; }
      .content-container { padding: 0 0px !important; }
    }
    
    @media only screen and (max-width: 480px) {
      .header { min-height: 250px !important; }
      .header-logo { max-width: 50px !important; margin: 10px auto 0 !important; }
      .content { padding: 15px 10px !important; }
      .welcome-title { font-size: 20px !important; }
      .greeting { font-size: 13px !important; }
      .info-box { flex-direction: row !important; padding: 0px !important; border-radius: 15px !important; }
      .info-box-left { margin-right: 8px !important; padding: 8px !important; min-width: 90px !important; border-radius: 15px !important; }
      .info-box-right { margin-top: 10px !important; display: block !important; }
      .info-row { font-size: 11px !important; margin: 4px 0 !important; display: block !important; width: 100% !important; }
      .button { padding: 8px 25px !important; font-size: 14px !important; font-weight: 700 !important; }
      .footer-social div { width: 20px !important; height: 20px !important; }
      .footer-social svg { width: 18px !important; height: 18px !important; }
    }
    
    @media only screen and (min-width: 769px) and (max-width: 1024px) {
      .content { padding: 30px 100px !important; }
      .footer { padding: 30px 200px !important; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header" style="text-align: center; padding-top: 20px;">
      <img src="https://alpheraacademy.edu.bh/Group.png" alt="Alphera Logo" class="header-logo" style="max-width: 80px; height: auto; display: block; margin: 0px auto 0;" />
    </div>
    
    <div class="content">
      <h1 class="welcome-title">Welcome to Alphera</h1>
      
      <p class="greeting">Dear ${userName || 'User'},</p>
      <div class="content-container">

          <p class="greeting">Welcome Message</p>
          <p class="greeting">Info shared</p>
          
        </div>
          <div class="info-box">
              <div class="info-box-left">
                  <div class="info-row"><span class="info-label">Name :</span></div>
                  <div class="info-row"><span class="info-label">Email :</span></div>
                  <div class="info-row"><span class="info-label">Mobile :</span></div>
                </div>
                <div class="info-box-right">
                    <div class="info-row">${userName || '-'}</div>
                    <div class="info-row">${userEmail}</div>
                    <div class="info-row">${userPhone || '-'}</div>
                </div>
            </div>
            
            <div class="waiting-list-box">
                <p class="waiting-list-text">You're on the waiting list, we will contact you with further details</p>
                <p class="waiting-list-text">Heres a link to access your profile:</p>
            </div>
            
             <div class="button-container">
                 <a href="${dashboardUrl}" class="button" style="color: #82B3B4 !important; padding: 10px 70px; font-weight: 800; background-color: #0A3E84 !important;"><span style="font-size: 24px;">Go To Dashboard</span></a>
             </div>
    </div>
    
    <!-- Footer with flex-wrap -->
    <div class="footer">
      <div class="footer-contact">
        <span style="white-space: nowrap; color: #82B3B4 !important;">+973&nbsp;88&nbsp;88&nbsp;88&nbsp;88</span>
        <span class="footer-separator">|</span>
        <a href="mailto:info@alphera.edu" style="white-space: nowrap; color: #82B3B4 !important; text-decoration: none !important;">info@alphera.edu</a>
        <span class="footer-separator">|</span>
        <a href="http://www.alphera.edu" style="white-space: nowrap; color: #82B3B4 !important; text-decoration: none !important;">www.alphera.edu</a>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-social">
        <img src="http://alpheraacademy.edu.bh/instagram.png" alt="Instagram">
        <img src="http://alpheraacademy.edu.bh/linkedin.png" alt="LinkedIn">
        <img src="http://alpheraacademy.edu.bh/youtube.png" alt="YouTube">
      </div>
    </div>
  </div>
</body>
</html>
      `,
      text: `
        Welcome to Alphera Academy!
        
        Dear ${userName || 'User'},
        
        Welcome Message
        Info shared
        
        USER INFORMATION:
        Name: ${userName || 'N/A'}
        Email: ${userEmail}
        Mobile: ${userPhone || 'N/A'}
        
        You're on the waiting list, we will contact you with further details
        Here's a link to access your profile: ${dashboardUrl}
        
        Go To Dashboard: ${dashboardUrl}
        
        Contact Information:
        +973 88 88 88 88 | info@alphera.edu | www.alphera.edu
        
        Best regards,
        The Alphera Academy Team
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully to:', userEmail);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}

export async function sendWaitingListNotification(userEmail: string): Promise<boolean> {
  try {
    const recipientEmails = ['latifa.belal@staff.alpheraacademy.edu.bh','info@alpheraacademy.edu.bh','anurag@syinnovation.co','helena@syinnovation.co','santhosh@syinnovation.co'];
    // const recipientEmails = ["anurag@syinnovation.co"];
    
    const mailOptions = {
      from: `"Alphera Academy" <${emailConfig.auth.user}>`,
      to: recipientEmails.join(','),
      subject: `New User Started Application Process - ${userEmail}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New User Started Application</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8EC0C2, #142954); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; border: 2px solid #8EC0C2; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Alphera Academy</h1>
              <h2>New User Started Application Process</h2>
            </div>
            
            <div class="content">
              <p>A new user has submitted their email and started the application process:</p>
              
              <div class="info-box">
                <h3>📧 User Information</h3>
                <p><strong>Email:</strong> ${userEmail}</p>
                <p style="margin-top: 15px; color: #666; font-size: 14px;">
                  Submitted on: ${new Date().toLocaleString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
             
              
            
              <p>Best regards,<br>
              Alphera Academy System</p>
            </div>
            
            <div class="footer">
              <p>This is an automated notification from the Alphera Academy system.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New User Started Application Process
        
        A new user has submitted their email and started the application process:
        
        Email: ${userEmail}
        Submitted on: ${new Date().toLocaleString()}
        
        Next Steps:
        - The user has received a welcome email with login instructions
        - They will be redirected to complete the pre-assessment form
        - You will receive another notification when they complete the form and set their password
        
        Please monitor this application and be ready to follow up if needed.
        
        Best regards,
        Alphera Academy System
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Waiting list notification email sent successfully to:', recipientEmails.join(', '));
    return true;
  } catch (error) {
    console.error('Error sending waiting list notification email:', error);
    return false;
  }
}

export async function sendPasswordCreatedNotification(
  userEmail: string, 
  userName: string, 
  applicationData?: {
    parentFullName?: string;
    parentPhone?: string;
    parentOccupation?: string;
    parentCity?: string;
    relationToChild?: string;
    childFullName?: string;
    childAge?: number;
    childGender?: string;
    childSchoolYear?: string;
    childCurrentSchool?: string;
    childSchoolType?: string;
  }
): Promise<boolean> {
  try {
    const recipientEmails = ['latifa.belal@staff.alpheraacademy.edu.bh','info@alpheraacademy.edu.bh','anurag@syinnovation.co','helena@syinnovation.co','santhosh@syinnovation.co'];
    // const recipientEmails = ["anurag@syinnovation.co"];
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error('NEXT_PUBLIC_BASE_URL is not set. Email links will not work correctly.');
      throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
    }
    const adminDashboardUrl = `${baseUrl}/auth/admin`;
    
    // Format relation to child
    const relationMap: Record<string, string> = {
      '1': 'Mother',
      '2': 'Father',
      '3': 'Guardian'
    };
    const relationText = applicationData?.relationToChild ? relationMap[applicationData.relationToChild] || applicationData.relationToChild : 'N/A';
    
    const mailOptions = {
      from: `"Alphera Academy" <${emailConfig.auth.user}>`,
      to: recipientEmails.join(','),
      subject: `New Submission - ${userEmail}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New User Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8EC0C2, #142954); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; border: 2px solid #8EC0C2; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .info-row { margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
            .info-row:last-child { border-bottom: none; }
            .label { font-weight: bold; color: #142954; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #8EC0C2, #142954); color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; text-align: center; }
            .button:hover { opacity: 0.9; }
            .button-container { text-align: center; margin: 30px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Alphera Academy</h1>
              <h2>New User Submission</h2>
            </div>
            
            <div class="content">
              <p>A new user has completed their application</p>
              
              <div class="info-box">
                <h3>👤 Parent/Guardian Information</h3>
                <div class="info-row"><span class="label">Name:</span> ${userName || applicationData?.parentFullName || 'N/A'}</div>
                <div class="info-row"><span class="label">Email:</span> ${userEmail}</div>
                ${applicationData?.parentPhone ? `<div class="info-row"><span class="label">Phone:</span> ${applicationData.parentPhone}</div>` : ''}
                ${applicationData?.parentOccupation ? `<div class="info-row"><span class="label">Occupation:</span> ${applicationData.parentOccupation}</div>` : ''}
                ${applicationData?.parentCity ? `<div class="info-row"><span class="label">City:</span> ${applicationData.parentCity}</div>` : ''}
                ${applicationData?.relationToChild ? `<div class="info-row"><span class="label">Relation to Child:</span> ${relationText}</div>` : ''}
                <div class="info-row" style="margin-top: 15px; color: #666; font-size: 14px;">
                  <span class="label">Account created on:</span> ${new Date().toLocaleString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              
              ${applicationData?.childFullName ? `
              <div class="info-box">
                <h3>👶 Child Information</h3>
                <div class="info-row"><span class="label">Full Name:</span> ${applicationData.childFullName}</div>
                ${applicationData?.childAge ? `<div class="info-row"><span class="label">Age:</span> ${applicationData.childAge} years old</div>` : ''}
                ${applicationData?.childGender ? `<div class="info-row"><span class="label">Gender:</span> ${applicationData.childGender === 'M' ? 'Male' : applicationData.childGender === 'F' ? 'Female' : applicationData.childGender}</div>` : ''}
                ${applicationData?.childSchoolYear ? `<div class="info-row"><span class="label">School Year:</span> ${applicationData.childSchoolYear}</div>` : ''}
                ${applicationData?.childCurrentSchool ? `<div class="info-row"><span class="label">Current School:</span> ${applicationData.childCurrentSchool}</div>` : ''}
                ${applicationData?.childSchoolType ? `<div class="info-row"><span class="label">School Type:</span> ${applicationData.childSchoolType}</div>` : ''}
              </div>
              ` : ''}
              
              <div class="button-container">
                <a href="${adminDashboardUrl}" class="button" style="color: white !important;">View in Admin Dashboard</a>
              </div>
              
              <p>The user has successfully completed their application and can now log in to their dashboard.</p>
              
              <p>Best regards,<br>
              Alphera Academy System</p>
            </div>
            
            <div class="footer">
              <p>This is an automated notification from the Alphera Academy system.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New User Submission
        
        A new user has completed their application:
        
        Parent/Guardian Information:
        Name: ${userName || applicationData?.parentFullName || 'N/A'}
        Email: ${userEmail}
        ${applicationData?.parentPhone ? `Phone: ${applicationData.parentPhone}\n` : ''}
        ${applicationData?.parentOccupation ? `Occupation: ${applicationData.parentOccupation}\n` : ''}
        ${applicationData?.parentCity ? `City: ${applicationData.parentCity}\n` : ''}
        ${applicationData?.relationToChild ? `Relation to Child: ${relationText}\n` : ''}
        Account created on: ${new Date().toLocaleString()}
        
        ${applicationData?.childFullName ? `
        Child Information:
        Full Name: ${applicationData.childFullName}
        ${applicationData?.childAge ? `Age: ${applicationData.childAge} years old\n` : ''}
        ${applicationData?.childGender ? `Gender: ${applicationData.childGender}\n` : ''}
        ${applicationData?.childSchoolYear ? `School Year: ${applicationData.childSchoolYear}\n` : ''}
        ${applicationData?.childCurrentSchool ? `Current School: ${applicationData.childCurrentSchool}\n` : ''}
        ${applicationData?.childSchoolType ? `School Type: ${applicationData.childSchoolType}\n` : ''}
        ` : ''}
        
        View in Admin Dashboard: ${adminDashboardUrl}
        
        The user has successfully completed their application and can now log in to their dashboard.
        
        Best regards,
        Alphera Academy System
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Password created notification email sent successfully to:', recipientEmails.join(', '));
    return true;
  } catch (error) {
    console.error('Error sending password created notification email:', error);
    return false;
  }
}

export async function sendPasswordResetEmail(
  userEmail: string,
  userName: string,
  resetToken: string
): Promise<boolean> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error('NEXT_PUBLIC_BASE_URL is not set. Email links will not work correctly.');
      throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
    }
    const resetUrl = `${baseUrl}/auth/reset-password?token=${encodeURIComponent(resetToken)}`;
    
    const mailOptions = {
      from: `"Alphera Academy" <${emailConfig.auth.user}>`,
      to: userEmail,
      subject: 'Reset Your Password - Alphera Academy',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8EC0C2, #142954); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; border: 2px solid #8EC0C2; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #8EC0C2, #142954); 
              color: white !important; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              font-weight: bold; 
              margin: 10px 0;
            }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .warning { background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 15px; margin: 20px 0; color: #856404; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Alphera Academy</h1>
              <h2>Password Reset Request</h2>
            </div>
            
            <div class="content">
              <p>Dear ${userName || 'User'},</p>
              
              <p>We received a request to reset your password for your Alphera Academy account.</p>
              
              <div class="info-box">
                <p>Click the button below to reset your password:</p>
                <div style="text-align: center; margin: 20px 0;">
                  <a href="${resetUrl}" class="button" style="color: white !important;">Reset Password</a>
                </div>
                <p style="font-size: 12px; color: #666; margin-top: 15px;">
                  Or copy and paste this link into your browser:<br>
                  <a href="${resetUrl}" style="color: #004AAD; word-break: break-all;">${resetUrl}</a>
                </p>
              </div>
              
              <div class="warning">
                <p><strong>⚠️ Important:</strong></p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>This link will expire in 1 hour</li>
                  <li>If you didn't request this password reset, please ignore this email</li>
                  <li>Your password will remain unchanged until you click the link above</li>
                </ul>
              </div>
              
              <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
              
              <p>Best regards,<br>
              The Alphera Academy Team</p>
            </div>
            
            <div class="footer">
              <p>This email was sent to ${userEmail} regarding your Alphera Academy account.</p>
              <p>If you did not request a password reset, please contact us immediately.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Password Reset Request - Alphera Academy
        
        Dear ${userName || 'User'},
        
        We received a request to reset your password for your Alphera Academy account.
        
        Click the link below to reset your password:
        ${resetUrl}
        
        ⚠️ Important:
        - This link will expire in 1 hour
        - If you didn't request this password reset, please ignore this email
        - Your password will remain unchanged until you click the link above
        
        If you have any questions or need assistance, please don't hesitate to contact us.
        
        Best regards,
        The Alphera Academy Team
        
        ---
        This email was sent to ${userEmail} regarding your Alphera Academy account.
        If you did not request a password reset, please contact us immediately.
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully to:', userEmail);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
}

export interface OdooSyncEmailData {
  parentName: string;
  parentEmail: string;
  childName: string;
  applicationId: string;
}

export async function sendOdooSyncSuccessEmail(data: OdooSyncEmailData): Promise<boolean> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error('NEXT_PUBLIC_BASE_URL is not set. Email links will not work correctly.');
      throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
    }
    const dashboardUrl = `${baseUrl}/dashboard/user`;
    
    const mailOptions = {
      from: `"Alphera Academy" <${emailConfig.auth.user}>`,
      to: data.parentEmail,
      subject: `🎉 Application Approved - Welcome to Alphera Academy!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Approved - Alphera Academy</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8EC0C2, #142954); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .success-box { background: #d4edda; border: 2px solid #28a745; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
            .success-box h2 { color: #155724; margin: 0 0 10px 0; }
            .info-box { background: white; border: 2px solid #8EC0C2; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table td { padding: 10px; border-bottom: 1px solid #eee; }
            .details-table td:first-child { font-weight: bold; width: 40%; color: #142954; }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #8EC0C2, #142954); 
              color: white !important; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              font-weight: bold; 
              margin: 10px 0;
            }
            .button-container { text-align: center; margin: 30px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .celebration { font-size: 48px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Alphera Academy</h1>
              <h2>Application Approved!</h2>
            </div>
            
            <div class="content">
              <div class="success-box">
                <div class="celebration">🎉</div>
                <h2>Congratulations!</h2>
                <p style="color: #155724; font-size: 18px; margin: 10px 0;">Your application has been approved!</p>
              </div>
              
              <p>Dear ${data.parentName},</p>
              
              <p>We are thrilled to inform you that your application for <strong>${data.childName}</strong> has been reviewed and <strong>approved</strong>! Your child's admission has been successfully processed and synced to our student management system.</p>
              
              <div class="info-box">
                <h3>📋 Application Details</h3>
                <table class="details-table">
                  <tr>
                    <td>Child's Name:</td>
                    <td><strong>${data.childName}</strong></td>
                  </tr>
                  <tr>
                    <td>Application ID:</td>
                    <td>${data.applicationId}</td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td><strong style="color: #28a745;">✅ Approved</strong></td>
                  </tr>
                  <tr>
                    <td>Date Approved:</td>
                    <td>${new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</td>
                  </tr>
                </table>
              </div>
              
              <h3>🎯 What's Next?</h3>
              <ul style="line-height: 2;">
                <li>Your child's information has been successfully added to our student management system</li>
                <li>You will receive further communication regarding enrollment procedures</li>
                <li>Our team will be in touch with you shortly to discuss the next steps</li>
                <li>You can access your dashboard to view your application status and updates</li>
              </ul>
              
              <div class="button-container">
                <a href="${dashboardUrl}" class="button" style="color: white !important;">View Your Dashboard</a>
              </div>
              
              <p>We are excited to welcome <strong>${data.childName}</strong> to the Alphera Academy family! Our team is committed to providing an exceptional learning experience.</p>
              
              <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
              
              <p>Best regards,<br>
              <strong>The Alphera Academy Team</strong></p>
            </div>
            
            <div class="footer">
              <p>This email was sent regarding your application for Alphera Academy.</p>
              <p>If you have any questions, please contact us at info@alpheraacademy.edu.bh</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Application Approved - Alphera Academy
        
        Dear ${data.parentName},
        
        Congratulations! We are thrilled to inform you that your application for ${data.childName} has been reviewed and APPROVED!
        
        APPLICATION DETAILS:
        Child's Name: ${data.childName}
        Application ID: ${data.applicationId}
        Status: ✅ Approved
        Date Approved: ${new Date().toLocaleDateString()}
        
        WHAT'S NEXT?
        - Your child's information has been successfully added to our student management system
        - You will receive further communication regarding enrollment procedures
        - Our team will be in touch with you shortly to discuss the next steps
        - You can access your dashboard to view your application status and updates
        
        View Your Dashboard: ${dashboardUrl}
        
        We are excited to welcome ${data.childName} to the Alphera Academy family!
        
        If you have any questions or need assistance, please don't hesitate to contact us.
        
        Best regards,
        The Alphera Academy Team
        
        ---
        This email was sent regarding your application for Alphera Academy.
        If you have any questions, please contact us at info@alpheraacademy.edu.bh
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Odoo sync success email sent successfully to:', data.parentEmail);
    return true;
  } catch (error) {
    console.error('Error sending Odoo sync success email:', error);
    return false;
  }
}

export interface ApplicationRejectionEmailData {
  parentName: string;
  parentEmail: string;
  childName: string;
  applicationId: string;
  adminComment?: string;
}

export async function sendApplicationRejectionEmail(data: ApplicationRejectionEmailData): Promise<boolean> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error('NEXT_PUBLIC_BASE_URL is not set. Email links will not work correctly.');
      throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
    }
    const dashboardUrl = `${baseUrl}/dashboard/user`;
    
    const mailOptions = {
      from: `"Alphera Academy" <${emailConfig.auth.user}>`,
      to: data.parentEmail,
      subject: `Application Update - Alphera Academy`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Update - Alphera Academy</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8EC0C2, #142954); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; border: 2px solid #8EC0C2; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table td { padding: 10px; border-bottom: 1px solid #eee; }
            .details-table td:first-child { font-weight: bold; width: 40%; color: #142954; }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #8EC0C2, #142954); 
              color: white !important; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              font-weight: bold; 
              margin: 10px 0;
            }
            .button-container { text-align: center; margin: 30px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .apology-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Alphera Academy</h1>
              <h2>Application Update</h2>
            </div>
            
            <div class="content">
              <p>Dear ${data.parentName},</p>
              
              <p>Thank you for your interest in Alphera Academy and for taking the time to complete the application process for <strong>${data.childName}</strong>.</p>
              
              <div class="apology-box">
                <p style="margin: 0; color: #856404;"><strong>We regret to inform you</strong> that after careful review, we are unable to proceed with your application at this time.</p>
              </div>
              
              <p>We understand that this news may be disappointing, and we sincerely apologize for any inconvenience this may cause. Please know that this decision was made after thorough consideration of all applications received.</p>
              
              <div class="info-box">
                <h3>📋 Application Details</h3>
                <table class="details-table">
                  <tr>
                    <td>Child's Name:</td>
                    <td><strong>${data.childName}</strong></td>
                  </tr>
                  <tr>
                    <td>Application ID:</td>
                    <td>${data.applicationId}</td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td>Not Accepted</td>
                  </tr>
                  <tr>
                    <td>Date:</td>
                    <td>${new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</td>
                  </tr>
                </table>
              </div>
              
              ${data.adminComment ? `
              <div class="info-box">
                <h3>📝 Additional Information</h3>
                <p style="color: #666;">${data.adminComment}</p>
              </div>
              ` : ''}
              
              <h3>💡 Future Opportunities</h3>
              <p>We encourage you to consider applying again in the future. Our admissions process is ongoing, and we welcome new applications for upcoming enrollment periods.</p>
              
              <p>If you have any questions about this decision or would like to discuss your application further, please feel free to reach out to us. We are here to assist you.</p>
              
              <div class="button-container">
                <a href="${dashboardUrl}" class="button" style="color: white !important;">View Your Dashboard</a>
              </div>
              
              <p>Thank you again for your interest in Alphera Academy. We wish you and ${data.childName} all the best in your educational journey.</p>
              
              <p>Best regards,<br>
              <strong>The Alphera Academy Team</strong></p>
            </div>
            
            <div class="footer">
              <p>This email was sent regarding your application for Alphera Academy.</p>
              <p>If you have any questions, please contact us at info@alpheraacademy.edu.bh</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Application Update - Alphera Academy
        
        Dear ${data.parentName},
        
        Thank you for your interest in Alphera Academy and for taking the time to complete the application process for ${data.childName}.
        
        We regret to inform you that after careful review, we are unable to proceed with your application at this time.
        
        We understand that this news may be disappointing, and we sincerely apologize for any inconvenience this may cause. Please know that this decision was made after thorough consideration of all applications received.
        
        APPLICATION DETAILS:
        Child's Name: ${data.childName}
        Application ID: ${data.applicationId}
        Status: Not Accepted
        Date: ${new Date().toLocaleDateString()}
        
        ${data.adminComment ? `Additional Information: ${data.adminComment}\n` : ''}
        
        FUTURE OPPORTUNITIES:
        We encourage you to consider applying again in the future. Our admissions process is ongoing, and we welcome new applications for upcoming enrollment periods.
        
        If you have any questions about this decision or would like to discuss your application further, please feel free to reach out to us. We are here to assist you.
        
        View Your Dashboard: ${dashboardUrl}
        
        Thank you again for your interest in Alphera Academy. We wish you and ${data.childName} all the best in your educational journey.
        
        Best regards,
        The Alphera Academy Team
        
        ---
        This email was sent regarding your application for Alphera Academy.
        If you have any questions, please contact us at info@alpheraacademy.edu.bh
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Application rejection email sent successfully to:', data.parentEmail);
    return true;
  } catch (error) {
    console.error('Error sending application rejection email:', error);
    return false;
  }
}

// Test email configuration
export async function testEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('Email server connection verified');
    return true;
  } catch (error) {
    console.error('Email server connection failed:', error);
    return false;
  }
}


// Add this new interface after line 24
export interface PaymentReminderEmailData {
  parentName: string;
  parentEmail: string;
  childName: string;
  applicationId: string;
  paymentAmount: number;
}


export async function sendPaymentReminderEmail(data: PaymentReminderEmailData): Promise<boolean> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error('NEXT_PUBLIC_BASE_URL is not set. Email links will not work correctly.');
      throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
    }
    const paymentLink = `${baseUrl}/dashboard/user/requests?payment=true&applicationId=${data.applicationId}`;
    
    const mailOptions = {
      from: `"Alphera Academy" <${emailConfig.auth.user}>`,
      to: data.parentEmail,
      subject: `Payment Reminder - Alphera Academy Application for ${data.childName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Reminder - Alphera Academy</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8EC0C2, #142954); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .reminder-box { background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .payment-box { background: white; border: 2px solid #8EC0C2; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .payment-button { 
              display: inline-block; 
              background: linear-gradient(135deg, #8EC0C2, #142954); 
              color: white; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              font-weight: bold; 
              margin: 10px 0;
            }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table td { padding: 10px; border-bottom: 1px solid #eee; }
            .details-table td:first-child { font-weight: bold; width: 40%; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Alphera Academy</h1>
              <h2>Payment Reminder</h2>
            </div>
            
            <div class="content">
              <p>Dear ${data.parentName},</p>
              
              <div class="reminder-box">
                <p style="margin: 0; color: #856404;"><strong>⏰ Friendly Reminder:</strong> Your payment for the assessment is still pending.</p>
              </div>
              
              <p>This is a reminder that payment is required to proceed with the comprehensive questionnaires for your child <strong>${data.childName}</strong>.</p>
              
              <div class="payment-box">
                <h3>💰 Payment Details</h3>
                <table class="details-table">
                  <tr>
                    <td>Amount Due:</td>
                    <td><strong>$${data.paymentAmount}</strong></td>
                  </tr>
                  <tr>
                    <td>Application ID:</td>
                    <td>${data.applicationId}</td>
                  </tr>
                </table>
                
                <div style="text-align: center; margin: 20px 0;">
                  <a href="${paymentLink}" class="payment-button" style="color: white !important;">💳 Make Payment Now</a>
                </div>
              </div>
              
              <h3>📋 Important Note</h3>
              <p>Once payment is confirmed, you will be able to access the Parent/Guardian, Caregiver, and Outsider questionnaires to complete the assessment process.</p>
              
              <p>If you have already made the payment, please allow some time for it to be processed and confirmed by our team.</p>
              
              <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
              
              <p>Best regards,<br>
              The Alphera Academy Team</p>
            </div>
            
            <div class="footer">
              <p>This email was sent regarding your application for Alphera Academy.</p>
              <p>If you have any questions, please contact us at info@alpheraacademy.edu.bh</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Payment Reminder - Alphera Academy
        
        Dear ${data.parentName},
        
        ⏰ Friendly Reminder: Your payment for the assessment is still pending.
        
        This is a reminder that payment is required to proceed with the comprehensive questionnaires for your child ${data.childName}.
        
        PAYMENT DETAILS:
        Amount Due: $${data.paymentAmount}
        Application ID: ${data.applicationId}
        
        Payment Link: ${paymentLink}
        
        IMPORTANT NOTE:
        Once payment is confirmed, you will be able to access the Parent/Guardian, Caregiver, and Outsider questionnaires to complete the assessment process.
        
        If you have already made the payment, please allow some time for it to be processed and confirmed by our team.
        
        If you have any questions or need assistance, please don't hesitate to contact us.
        
        Best regards,
        The Alphera Academy Team
        
        ---
        This email was sent regarding your application for Alphera Academy.
        If you have any questions, please contact us at info@alpheraacademy.edu.bh
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Payment reminder email sent successfully to:', data.parentEmail);
    return true;
  } catch (error) {
    console.error('Error sending payment reminder email:', error);
    return false;
  }
}

export interface LearnerReportEmailData {
  parentName: string;
  parentEmail: string;
  childName: string;
  applicationId: string;
}

export async function sendLearnerReportNotificationEmail(data: LearnerReportEmailData): Promise<boolean> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error('NEXT_PUBLIC_BASE_URL is not set. Email links will not work correctly.');
      throw new Error('NEXT_PUBLIC_BASE_URL environment variable is required');
    }
    const reportUrl = `${baseUrl}/dashboard/user/learner-report/${data.applicationId}`;
    
    const mailOptions = {
      from: `"Alphera Academy" <${emailConfig.auth.user}>`,
      to: data.parentEmail,
      subject: `📊 AI-Generated Learner Report Ready - ${data.childName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AI-Generated Learner Report Ready - Alphera Academy</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8EC0C2, #142954); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .success-box { background: #e3f2fd; border: 2px solid #2196F3; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
            .success-box h2 { color: #1565C0; margin: 0 0 10px 0; }
            .info-box { background: white; border: 2px solid #8EC0C2; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .details-table td { padding: 10px; border-bottom: 1px solid #eee; }
            .details-table td:first-child { font-weight: bold; width: 40%; color: #142954; }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #8EC0C2, #142954); 
              color: white !important; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              font-weight: bold; 
              margin: 10px 0;
            }
            .button-container { text-align: center; margin: 30px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .report-icon { font-size: 48px; margin: 20px 0; }
            .highlight-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Alphera Academy</h1>
              <h2>AI-Generated Learner Report Ready</h2>
            </div>
            
            <div class="content">
              <div class="success-box">
                <div class="report-icon">📊</div>
                <h2>Your Learner Report is Ready!</h2>
                <p style="color: #1565C0; font-size: 16px; margin: 10px 0;">The comprehensive AI-generated assessment report for ${data.childName} has been completed.</p>
              </div>
              
              <p>Dear ${data.parentName},</p>
              
              <p>We are pleased to inform you that the AI-generated learner assessment report for <strong>${data.childName}</strong> has been successfully generated and is now available for your review.</p>
              
              <div class="info-box">
                <h3>📋 Report Details</h3>
                <table class="details-table">
                  <tr>
                    <td>Child's Name:</td>
                    <td><strong>${data.childName}</strong></td>
                  </tr>
                  <tr>
                    <td>Application ID:</td>
                    <td>${data.applicationId}</td>
                  </tr>
                  <tr>
                    <td>Report Status:</td>
                    <td><strong style="color: #28a745;">✅ Available</strong></td>
                  </tr>
                  <tr>
                    <td>Generated On:</td>
                    <td>${new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</td>
                  </tr>
                </table>
              </div>
              
              <div class="highlight-box">
                <p style="margin: 0; color: #856404;"><strong>📖 What's in the Report?</strong></p>
                <p style="margin: 10px 0 0 0; color: #856404;">The comprehensive learner report includes:</p>
                <ul style="margin: 10px 0 0 20px; color: #856404;">
                  <li>Executive Summary & Overall Readiness Assessment</li>
                  <li>Learning Style Analysis</li>
                  <li>Dominant Intelligences Profile</li>
                  <li>Cognitive Profile (Attention, Memory, Processing, Executive Function)</li>
                  <li>Meta-Learning Pillars Assessment</li>
                  <li>Academic Readiness Evaluation</li>
                  <li>Emotional & Social Profiles</li>
                  <li>Strengths, Challenges & Recommendations</li>
                  <li>Key Stage Level Placement</li>
                </ul>
              </div>
              
              <div class="button-container">
                <a href="${reportUrl}" class="button" style="color: white !important;">📊 View Learner Report</a>
              </div>
              
              <p style="margin-top: 20px;"><strong>Note:</strong> The report is available in read-only mode in your parent dashboard. You can access it anytime by logging into your account.</p>
              
              <p>If you have any questions about the report or need assistance understanding the findings, please don't hesitate to contact our assessment team.</p>
              
              <p>Best regards,<br>
              <strong>The Alphera Academy Assessment Team</strong></p>
            </div>
            
            <div class="footer">
              <p>This email was sent regarding your application for Alphera Academy.</p>
              <p>If you have any questions, please contact us at info@alpheraacademy.edu.bh</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        AI-Generated Learner Report Ready - Alphera Academy
        
        Dear ${data.parentName},
        
        We are pleased to inform you that the AI-generated learner assessment report for ${data.childName} has been successfully generated and is now available for your review.
        
        REPORT DETAILS:
        Child's Name: ${data.childName}
        Application ID: ${data.applicationId}
        Report Status: ✅ Available
        Generated On: ${new Date().toLocaleDateString()}
        
        WHAT'S IN THE REPORT?
        The comprehensive learner report includes:
        - Executive Summary & Overall Readiness Assessment
        - Learning Style Analysis
        - Dominant Intelligences Profile
        - Cognitive Profile (Attention, Memory, Processing, Executive Function)
        - Meta-Learning Pillars Assessment
        - Academic Readiness Evaluation
        - Emotional & Social Profiles
        - Strengths, Challenges & Recommendations
        - Key Stage Level Placement
        
        View Learner Report: ${reportUrl}
        
        Note: The report is available in read-only mode in your parent dashboard. You can access it anytime by logging into your account.
        
        If you have any questions about the report or need assistance understanding the findings, please don't hesitate to contact our assessment team.
        
        Best regards,
        The Alphera Academy Assessment Team
        
        ---
        This email was sent regarding your application for Alphera Academy.
        If you have any questions, please contact us at info@alpheraacademy.edu.bh
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Learner report notification email sent successfully to:', data.parentEmail);
    return true;
  } catch (error) {
    console.error('Error sending learner report notification email:', error);
    return false;
  }
}