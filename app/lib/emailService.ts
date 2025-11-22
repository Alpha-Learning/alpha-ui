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

export async function sendWelcomeEmail(userEmail: string, password?: string, userName?: string): Promise<boolean> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4035';
    const loginUrl = `${baseUrl}/auth/login`;
    
    const passwordSection = password ? `
              <div class="info-box" style="background: #fff3cd; border-color: #ffc107;">
                <h3>🔐 Your Login Credentials</h3>
                <p><strong>Email:</strong> ${userEmail}</p>
                <p><strong>Password:</strong> <code style="background: #f8f9fa; padding: 5px 10px; border-radius: 4px; font-size: 16px; font-weight: bold;">${password}</code></p>
                <p style="margin-top: 15px; color: #856404; font-size: 14px;">
                  <strong>⚠️ Important:</strong> Please save this password securely. You will need it to log in to your dashboard.
                </p>
              </div>
    ` : `
              <h3>🔐 Login Instructions</h3>
              <p>After completing your application and setting up your password, you can log in using:</p>
              <ul style="margin-left: 20px;">
                <li><strong>Email:</strong> ${userEmail}</li>
                <li><strong>Password:</strong> The password you set during application submission</li>
              </ul>
    `;
    
    const mailOptions = {
      from: `"Alphera Academy" <${emailConfig.auth.user}>`,
      to: userEmail,
      subject: password ? `Welcome to Alphera Academy - Your Account is Ready!` : `Welcome to Alphera Academy - Complete Your Application`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Alphera Academy</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8EC0C2, #142954); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; border: 2px solid #8EC0C2; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #8EC0C2, #142954); 
              color: white; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              font-weight: bold; 
              margin: 10px 0;
            }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            code { background: #f8f9fa; padding: 5px 10px; border-radius: 4px; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Alphera Academy</h1>
              <h2>Welcome${userName ? `, ${userName}` : ''}!</h2>
            </div>
            
            <div class="content">
              <p>Dear ${userName || 'Prospective Parent'},</p>
              
              <p>Thank you for submitting your application to Alphera Academy! We're excited that you've taken this important step in your child's educational journey with us.</p>
              
              ${passwordSection}
              
              <div style="text-align: center; margin: 20px 0;">
                <a href="${loginUrl}" class="button" style="color: white !important;">Login to Dashboard</a>
              </div>
              
              <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
              
              <p>Best regards,<br>
              The Alphera Academy Team</p>
            </div>
            
            <div class="footer">
              <p>This email was sent to ${userEmail} regarding your application for Alphera Academy.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: password ? `
        Welcome to Alphera Academy!
        
        Dear ${userName || 'Prospective Parent'},
        
        Thank you for submitting your application to Alphera Academy! We're excited that you've taken this important step in your child's educational journey with us.
        
        YOUR LOGIN CREDENTIALS:
        Email: ${userEmail}
        Password: ${password}
        
        ⚠️ Important: Please save this password securely. You will need it to log in to your dashboard.
        
        Login URL: ${loginUrl}
        
        If you have any questions or need assistance, please don't hesitate to contact us.
        
        Best regards,
        The Alphera Academy Team
      ` : `
        Welcome to Alphera Academy!
        
        Dear Prospective Parent,
        
        Thank you for your interest in Alphera Academy! We're excited that you've taken the first step in your child's educational journey with us.
        
        NEXT STEPS:
        1. Fill out the pre-assessment form with your and your child's information
        2. After submitting the form, you'll be prompted to set up a password for your account
        3. Once your password is set, you can log in to track your application progress
        
        Start Your Application: ${baseUrl}/form/pre-assessment?email=${encodeURIComponent(userEmail)}
        
        LOGIN INSTRUCTIONS:
        After completing your application and setting up your password, you can log in using:
        - Email: ${userEmail}
        - Password: The password you set during application submission
        
        Login URL: ${loginUrl}
        
        If you have any questions or need assistance, please don't hesitate to contact us.
        
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
