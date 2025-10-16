# Email Configuration for Payment Emails
# Add these variables to your .env.local file

# SMTP Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Base URL for payment links
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Note: For Gmail, you'll need to:
# 1. Enable 2-factor authentication
# 2. Generate an App Password
# 3. Use the App Password as SMTP_PASS
# 
# For other email providers, adjust SMTP_HOST and SMTP_PORT accordingly

## How It Works

After completing a screening call form, the system will automatically:

1. **Save the screening call data** to the database
2. **Update the application stage** to mark screening call as completed
3. **Send a payment email** to the parent with:
   - Fixed payment amount: $150
   - Payment due date: 7 days from screening call completion
   - Direct payment link to user dashboard
   - Screening call details (caller name, date)
   - Next steps information (walkthrough, assessment dates if provided)

The payment amount and due date are handled automatically at the application level - no manual input required in the screening call form.
