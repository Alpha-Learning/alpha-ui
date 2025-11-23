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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4035';
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
    .header { background-image: url('http://alpheraacademy.edu.bh/homecrop2.jpg'); background-size: cover; background-position: center; width: 100%; min-height: 610px; position: relative; padding: 0; }
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
    .footer { background-color: #004AAD; color: #82B3B4; padding: 30px 400px; display: flex; justify-content: space-between; align-items: center; }
    .footer-contact { color: #82B3B4; font-size: 14px; display: flex; align-items: center; gap: 2px; flex-wrap: nowrap; white-space: nowrap; }
    .footer-contact span { white-space: nowrap; }
    .footer-separator { color: #82B3B4; margin: 0 10px; }
    .footer-divider { width: 1px; height: 40px; background-color: #82B3B4; margin: 0 20px; }
    .footer-social { display: flex; align-items: center; gap: 15px; }
    .footer-social a { color: #82B3B4; text-decoration: none; font-size: 20px; display: flex; gap: 16px;}
    .content-container { padding: 0 30px; }
    
    /* Responsive Styles */
    @media only screen and (max-width: 768px) {
      .container { max-width: 100%; }
      .header { min-height: 300px; }
      .header-logo { max-width: 50px; margin: 15px auto 0; }
      .content { padding: 20px 15px; }
      .welcome-title { font-size: 24px; margin: 15px 0; }
      .greeting { font-size: 14px; margin: 15px 0; }
      .info-box { flex-direction: row; border-radius: 20px; padding: 0px; }
      .info-box-left { margin-right: 10px; margin-bottom: 0; border-radius: 20px; min-width: 90px; padding: 10px; }
      .info-box-right { margin-top: 10px; display: block; }
      .info-row { margin: 6px 0; font-size: 12px; display: block; width: 100%; }
      .button { padding: 10px 40px !important; font-size: 16px !important; font-weight: 700 !important; }
      .footer { padding: 20px 15px; flex-direction: column; gap: 15px; }
      .footer-contact { flex-wrap: nowrap; justify-content: center; gap: 5px; font-size: 12px; white-space: nowrap; }
      .footer-separator { margin: 0 5px; }
      .footer-divider { width: 100%; height: 1px; margin: 10px 0; }
      .footer-social { justify-content: center; gap: 10px; }
      .content-container { padding: 0 0px; }
    }
    
    @media only screen and (max-width: 480px) {
      .header { min-height: 250px; }
      .header-logo { max-width: 50px; margin: 10px auto 0; }
      .content { padding: 15px 10px; }
      .welcome-title { font-size: 20px; }
      .greeting { font-size: 13px; }
      .info-box { flex-direction: row; padding: 0px; border-radius: 15px; }
      .info-box-left { margin-right: 8px; padding: 8px; min-width: 70px; border-radius: 15px; }
      .info-box-right { margin-top: 10px; display: block; }
      .info-row { font-size: 11px; margin: 4px 0; display: block; width: 100%; }
      .button { padding: 8px 25px !important; font-size: 14px !important; font-weight: 700 !important; }
      .footer { padding: 15px 10px; }
      .footer-contact { font-size: 11px; flex-wrap: nowrap; white-space: nowrap; }
      .footer-social div { width: 20px !important; height: 20px !important; }
      .footer-social svg { width: 18px !important; height: 18px !important; }
    }
    
    @media only screen and (min-width: 769px) and (max-width: 1024px) {
      .content { padding: 30px 100px; }
      .footer { padding: 30px 200px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header" style="text-align: center; padding-top: 20px;">
      <img src="http://alpheraacademy.edu.bh/Group.png" alt="Alphera Logo" class="header-logo" style="max-width: 70px; height: auto; display: block; margin: 0px auto 0;" />
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
                    <div class="info-row">${userName || 'N/A'}</div>
                    <div class="info-row">${userEmail}</div>
                    <div class="info-row">${userPhone || 'N/A'}</div>
                </div>
            </div>
            
            <div class="waiting-list-box">
                <p class="waiting-list-text">You're on the waiting list, we will contact you with further details</p>
                <p class="waiting-list-text">Heres a link to access your profile:</p>
            </div>
            
             <div class="button-container">
                 <a href="${dashboardUrl}" class="button" style="color: #82B3B4 !important; padding: 10px 70px; font-weight: 800; font-size: 22px; background-color: #004AAD !important;">Go To Dashboard</a>
             </div>
    </div>
    
    <div class="footer">
      <div class="footer-contact">
        <span style="white-space: nowrap;">+973&nbsp;88&nbsp;88&nbsp;88&nbsp;88</span>
        <span class="footer-separator">|</span>
        <span style="white-space: nowrap;">info@alphera.edu</span>
        <span class="footer-separator">|</span>
        <span style="white-space: nowrap;">www.alphera.edu</span>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-social">


       
        <img src="http://alpheraacademy.edu.bh/instagram.png" alt="Instagram" style="width: 29.67px; height: 29.67px; background-color: #82B3B4; margin-top: 0px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
        <img src="http://alpheraacademy.edu.bh/linkedin.png" alt="LinkedIn" style="width: 29.67px; height: 29.67px; background-color: #82B3B4; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
        <img src="http://alpheraacademy.edu.bh/youtube.png" alt="YouTube" style="width: 29.67px; height: 29.67px; background-color: #82B3B4; display: flex; align-items: center; justify-content: center; border-radius: 8px;">

    

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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4035';
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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4035';
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
