export const appointmentConfirmationTemplate = (data: {
  customerName: string;
  providerName: string;
  serviceName: string;
  date: string;
  time: string;
  address: string;
  price: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .content { border: 1px solid #ddd; padding: 20px; border-radius: 0 0 8px 8px; }
    .details { background-color: #f3f4f6; padding: 15px; border-radius: 4px; margin: 15px 0; }
    .detail-row { margin: 8px 0; }
    .label { font-weight: bold; color: #4b5563; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
    .button { display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Confirmed!</h1>
    </div>
    <div class="content">
      <p>Hello ${data.customerName},</p>
      <p>Your appointment has been successfully booked with ${data.providerName}.</p>
      
      <div class="details">
        <div class="detail-row">
          <span class="label">Service:</span> ${data.serviceName}
        </div>
        <div class="detail-row">
          <span class="label">Date:</span> ${data.date}
        </div>
        <div class="detail-row">
          <span class="label">Time:</span> ${data.time}
        </div>
        <div class="detail-row">
          <span class="label">Location:</span> ${data.address}
        </div>
        <div class="detail-row">
          <span class="label">Price:</span> ${data.price}
        </div>
      </div>

      <p>Please arrive 10 minutes early. If you need to reschedule or cancel, please log into your account.</p>
      
      <p>Thank you for choosing our service!</p>
    </div>
    <div class="footer">
      <p>ServiceBook - Online Appointment Scheduling</p>
    </div>
  </div>
</body>
</html>
`;

export const providerAppointmentTemplate = (data: {
  providerName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  date: string;
  time: string;
  notes: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .content { border: 1px solid #ddd; padding: 20px; border-radius: 0 0 8px 8px; }
    .details { background-color: #f3f4f6; padding: 15px; border-radius: 4px; margin: 15px 0; }
    .detail-row { margin: 8px 0; }
    .label { font-weight: bold; color: #4b5563; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Appointment Booking</h1>
    </div>
    <div class="content">
      <p>Hello ${data.providerName},</p>
      <p>You have a new appointment booking.</p>
      
      <div class="details">
        <div class="detail-row">
          <span class="label">Customer:</span> ${data.customerName}
        </div>
        <div class="detail-row">
          <span class="label">Email:</span> ${data.customerEmail}
        </div>
        <div class="detail-row">
          <span class="label">Phone:</span> ${data.customerPhone}
        </div>
        <div class="detail-row">
          <span class="label">Service:</span> ${data.serviceName}
        </div>
        <div class="detail-row">
          <span class="label">Date:</span> ${data.date}
        </div>
        <div class="detail-row">
          <span class="label">Time:</span> ${data.time}
        </div>
        ${data.notes ? `<div class="detail-row"><span class="label">Notes:</span> ${data.notes}</div>` : ''}
      </div>

      <p>Please log into your dashboard to manage this appointment.</p>
    </div>
    <div class="footer">
      <p>ServiceBook - Online Appointment Scheduling</p>
    </div>
  </div>
</body>
</html>
`;
