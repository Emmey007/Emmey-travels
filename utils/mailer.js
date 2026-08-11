const nodemailer = require("nodemailer");
const envObj = require("../config/env");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: envObj.gmailUser, pass: envObj.gmailPass },
});

const sendVerificationEmail = async (user, token) => {
    const url = `${envObj.baseUrl}/api/v1/auth/verify-email?token=${token}&id=${user._id}`;

    await transporter.sendMail({
        from: `"EMMEY Travels" <${envObj.gmailUser}>`,
        to: user.email,
        subject: "Verify your EMMEY Travels account",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Verify your email</title>
        </head>
        <body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
                <tr>
                    <td align="center">
                        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                            
                            <!-- Header -->
                            <tr>
                                <td style="background:#0a1628;padding:32px 40px;text-align:center;">
                                    <p style="margin:0;font-size:22px;font-weight:800;color:#c9a84c;letter-spacing:4px;">EMMEY</p>
                                    <p style="margin:2px 0 0;font-size:9px;font-weight:600;color:#8899bb;letter-spacing:4px;">TRAVELS</p>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td style="padding:40px 40px 24px;">
                                    <p style="margin:0 0 8px;font-size:22px;font-weight:800;color:#0a1628;">Verify your email address</p>
                                    <p style="margin:0 0 24px;font-size:14px;color:#888;line-height:1.6;">Hi ${user.name}, thanks for creating an EMMEY Travels account. Click the button below to verify your email and activate your account.</p>
                                    
                                    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                                        <tr>
                                            <td style="background:#c9a84c;border-radius:8px;">
                                                <a href="${url}" style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:700;color:#0a1628;text-decoration:none;letter-spacing:0.3px;">
                                                    Verify my email →
                                                </a>
                                            </td>
                                        </tr>
                                    </table>

                                    <p style="margin:0 0 8px;font-size:13px;color:#888;line-height:1.6;">Or copy and paste this link into your browser:</p>
                                    <p style="margin:0 0 24px;font-size:12px;color:#c9a84c;word-break:break-all;">${url}</p>

                                    <div style="border-top:1px solid #eee;padding-top:20px;">
                                        <p style="margin:0;font-size:12px;color:#bbb;line-height:1.6;">This link expires in <strong>24 hours</strong>. If you did not create an account with EMMEY Travels, you can safely ignore this email.</p>
                                    </div>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #eee;">
                                    <p style="margin:0;font-size:12px;color:#bbb;text-align:center;">© ${new Date().getFullYear()} EMMEY Travels. All rights reserved.</p>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `,
    });
};

const sendBookingConfirmation = async (user, booking) => {
    await transporter.sendMail({
        from: `"EMMEY Travels" <${envObj.gmailUser}>`,
        to: user.email,
        subject: "Booking Confirmed — EMMEY Travels",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Booking Confirmed</title>
        </head>
        <body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
                <tr>
                    <td align="center">
                        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                            <!-- Header -->
                            <tr>
                                <td style="background:#0a1628;padding:32px 40px;text-align:center;">
                                    <p style="margin:0;font-size:22px;font-weight:800;color:#c9a84c;letter-spacing:4px;">EMMEY</p>
                                    <p style="margin:2px 0 0;font-size:9px;font-weight:600;color:#8899bb;letter-spacing:4px;">TRAVELS</p>
                                </td>
                            </tr>

                            <!-- Booking Badge -->
                            <tr>
                                <td style="background:#0a1628;padding:0 40px 32px;text-align:center;">
                                    <div style="display:inline-block;background:rgba(201,168,76,0.15);border:1px solid #c9a84c;border-radius:8px;padding:8px 20px;">
                                        <p style="margin:0;font-size:12px;font-weight:700;color:#c9a84c;letter-spacing:1px;text-transform:uppercase;">Booking Confirmed</p>
                                    </div>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td style="padding:40px 40px 24px;">
                                    <p style="margin:0 0 8px;font-size:22px;font-weight:800;color:#0a1628;">Your trip is confirmed!</p>
                                    <p style="margin:0 0 28px;font-size:14px;color:#888;line-height:1.6;">Hi ${user.name}, your booking has been confirmed. Here are your booking details:</p>

                                    <!-- Booking Details -->
                                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;border-radius:12px;overflow:hidden;margin-bottom:28px;">
                                        <tr>
                                            <td style="padding:16px 20px;border-bottom:1px solid #eee;">
                                                <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Booking Reference</p>
                                                <p style="margin:4px 0 0;font-size:18px;font-weight:800;color:#0a1628;">${booking.reference}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding:16px 20px;border-bottom:1px solid #eee;">
                                                <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Route</p>
                                                <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#0a1628;">${booking.listing?.origin || ""} → ${booking.listing?.destination || ""}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding:16px 20px;border-bottom:1px solid #eee;">
                                                <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Travel Type</p>
                                                <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#0a1628;text-transform:capitalize;">${booking.listing?.type || ""}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding:16px 20px;border-bottom:1px solid #eee;">
                                                <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Departure Date</p>
                                                <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#0a1628;">${booking.listing?.departureDate ? new Date(booking.listing.departureDate).toDateString() : ""}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding:16px 20px;border-bottom:1px solid #eee;">
                                                <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Seats</p>
                                                <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#0a1628;">${booking.seats}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding:16px 20px;">
                                                <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Total Amount</p>
                                                <p style="margin:4px 0 0;font-size:18px;font-weight:800;color:#c9a84c;">₦${booking.totalPrice?.toLocaleString()}</p>
                                            </td>
                                        </tr>
                                    </table>

                                    <div style="border-top:1px solid #eee;padding-top:20px;">
                                        <p style="margin:0;font-size:12px;color:#bbb;line-height:1.6;">If you have any questions about your booking, please contact our support team. We wish you a safe and pleasant journey.</p>
                                    </div>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #eee;">
                                    <p style="margin:0;font-size:12px;color:#bbb;text-align:center;">© ${new Date().getFullYear()} EMMEY Travels. All rights reserved.</p>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `,
    });
};
const sendAdminBookingAlert = async (admin, user, booking) => {
    await transporter.sendMail({
        from: `"EMMEY Travels" <${envObj.gmailUser}>`,
        to: admin.email,
        subject: `New Booking Alert — ${booking.reference}`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8"/>
            <title>New Booking Alert</title>
        </head>
        <body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
                <tr><td align="center">
                    <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                        <tr>
                            <td style="background:#0a1628;padding:32px 40px;text-align:center;">
                                <p style="margin:0;font-size:22px;font-weight:800;color:#c9a84c;letter-spacing:4px;">EMMEY</p>
                                <p style="margin:2px 0 0;font-size:9px;font-weight:600;color:#8899bb;letter-spacing:4px;">TRAVELS · ADMIN ALERT</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:40px;">
                                <p style="font-size:20px;font-weight:800;color:#0a1628;margin:0 0 8px;">New Booking Received</p>
                                <p style="font-size:14px;color:#888;margin:0 0 28px;">Hi ${admin.name}, a new booking has just been made on EMMEY Travels.</p>
                                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;border-radius:12px;overflow:hidden;margin-bottom:24px;">
                                    <tr><td style="padding:14px 20px;border-bottom:1px solid #eee;">
                                        <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;">Reference</p>
                                        <p style="margin:4px 0 0;font-size:16px;font-weight:800;color:#0a1628;">${booking.reference}</p>
                                    </td></tr>
                                    <tr><td style="padding:14px 20px;border-bottom:1px solid #eee;">
                                        <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;">Traveller</p>
                                        <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#0a1628;">${user.name} — ${user.email}</p>
                                    </td></tr>
                                    <tr><td style="padding:14px 20px;border-bottom:1px solid #eee;">
                                        <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;">Destination</p>
                                        <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#0a1628;">${booking.listing?.origin || 'N/A'} → ${booking.listing?.destination || 'N/A'}</p>
                                    </td></tr>
                                    <tr><td style="padding:14px 20px;border-bottom:1px solid #eee;">
                                        <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;">Seats</p>
                                        <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#0a1628;">${booking.seats}</p>
                                    </td></tr>
                                    <tr><td style="padding:14px 20px;">
                                        <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;">Total Amount</p>
                                        <p style="margin:4px 0 0;font-size:18px;font-weight:800;color:#c9a84c;">₦${booking.totalPrice?.toLocaleString()}</p>
                                    </td></tr>
                                </table>
                                <a href="${envObj.clientUrl}/dashboard/bookings" style="display:inline-block;padding:12px 28px;background:#c9a84c;color:#0a1628;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;">View in Dashboard →</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #eee;">
                                <p style="margin:0;font-size:12px;color:#bbb;text-align:center;">© ${new Date().getFullYear()} EMMEY Travels Admin</p>
                            </td>
                        </tr>
                    </table>
                </td></tr>
            </table>
        </body>
        </html>
        `
    })
}

const sendBookingFailure = async (user, destination) => {
    await transporter.sendMail({
        from: `"EMMEY Travels" <${envObj.gmailUser}>`,
        to: user.email,
        subject: 'Booking Failed — EMMEY Travels',
        html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
                <tr><td align="center">
                    <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                        <tr>
                            <td style="background:#0a1628;padding:32px 40px;text-align:center;">
                                <p style="margin:0;font-size:22px;font-weight:800;color:#c9a84c;letter-spacing:4px;">EMMEY</p>
                                <p style="margin:2px 0 0;font-size:9px;font-weight:600;color:#8899bb;letter-spacing:4px;">TRAVELS</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:40px;">
                                <p style="font-size:20px;font-weight:800;color:#0a1628;margin:0 0 8px;">Booking Unsuccessful</p>
                                <p style="font-size:14px;color:#888;margin:0 0 24px;">Dear Traveller ${user.name}, unfortunately your booking to <strong>${destination}</strong> could not be completed at this time.</p>
                                <p style="font-size:14px;color:#555;margin:0 0 28px;line-height:1.7;">This may be due to insufficient seats, a payment issue, or a temporary system error. Please try again or contact our support team for assistance.</p>
                                <a href="${envObj.clientUrl}" style="display:inline-block;padding:12px 28px;background:#0a1628;color:#fff;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;">Try Again →</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #eee;">
                                <p style="margin:0;font-size:12px;color:#bbb;text-align:center;">© ${new Date().getFullYear()} EMMEY Travels. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </td></tr>
            </table>
        </body>
        </html>
        `
    })
}

const sendEnquiryConfirmation = async (user, message) => {
    await transporter.sendMail({
        from: `"EMMEY Travels" <${envObj.gmailUser}>`,
        to: user.email,
        subject: 'We received your enquiry — EMMEY Travels',
        html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
                <tr><td align="center">
                    <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                        <tr>
                            <td style="background:#0a1628;padding:32px 40px;text-align:center;">
                                <p style="margin:0;font-size:22px;font-weight:800;color:#c9a84c;letter-spacing:4px;">EMMEY</p>
                                <p style="margin:2px 0 0;font-size:9px;font-weight:600;color:#8899bb;letter-spacing:4px;">TRAVELS</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:40px;">
                                <p style="font-size:20px;font-weight:800;color:#0a1628;margin:0 0 8px;">We got your message!</p>
                                <p style="font-size:14px;color:#888;margin:0 0 24px;line-height:1.6;">Hi ${user.name}, thank you for reaching out to EMMEY Travels. We have received your enquiry and our team will get back to you as soon as possible.</p>
                                <div style="background:#f9f9f9;border-radius:12px;padding:20px;margin-bottom:24px;">
                                    <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Your message</p>
                                    <p style="margin:0;font-size:14px;color:#333;line-height:1.7;">${message}</p>
                                </div>
                                <p style="font-size:13px;color:#bbb;line-height:1.6;">We typically respond within 24 hours. If your matter is urgent, please contact us directly.</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #eee;">
                                <p style="margin:0;font-size:12px;color:#bbb;text-align:center;">© ${new Date().getFullYear()} EMMEY Travels. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </td></tr>
            </table>
        </body>
        </html>
        `
    })
}

const sendAdminEnquiryAlert = async (admin, enquiry) => {
    await transporter.sendMail({
        from: `"EMMEY Travels" <${envObj.gmailUser}>`,
        to: admin.email,
        subject: `New Enquiry from ${enquiry.name} — EMMEY Travels`,
        html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
                <tr><td align="center">
                    <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                        <tr>
                            <td style="background:#0a1628;padding:32px 40px;text-align:center;">
                                <p style="margin:0;font-size:22px;font-weight:800;color:#c9a84c;letter-spacing:4px;">EMMEY</p>
                                <p style="margin:2px 0 0;font-size:9px;font-weight:600;color:#8899bb;letter-spacing:4px;">TRAVELS · ADMIN ALERT</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:40px;">
                                <p style="font-size:20px;font-weight:800;color:#0a1628;margin:0 0 8px;">New Enquiry Received</p>
                                <p style="font-size:14px;color:#888;margin:0 0 28px;">Hi ${admin.name}, a new enquiry has been submitted on EMMEY Travels.</p>
                                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;border-radius:12px;overflow:hidden;margin-bottom:24px;">
                                    <tr><td style="padding:14px 20px;border-bottom:1px solid #eee;">
                                        <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;">From</p>
                                        <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#0a1628;">${enquiry.name}</p>
                                    </td></tr>
                                    <tr><td style="padding:14px 20px;border-bottom:1px solid #eee;">
                                        <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;">Email</p>
                                        <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#0a1628;">${enquiry.email}</p>
                                    </td></tr>
                                    <tr><td style="padding:14px 20px;">
                                        <p style="margin:0;font-size:11px;font-weight:600;color:#888;text-transform:uppercase;">Message</p>
                                        <p style="margin:4px 0 0;font-size:14px;color:#333;line-height:1.7;">${enquiry.message}</p>
                                    </td></tr>
                                </table>
                                <a href="${envObj.clientUrl}/dashboard/enquiries" style="display:inline-block;padding:12px 28px;background:#c9a84c;color:#0a1628;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;">View & Reply in Dashboard →</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #eee;">
                                <p style="margin:0;font-size:12px;color:#bbb;text-align:center;">© ${new Date().getFullYear()} EMMEY Travels Admin</p>
                            </td>
                        </tr>
                    </table>
                </td></tr>
            </table>
        </body>
        </html>
        `
    })
}

module.exports = { sendVerificationEmail, sendBookingConfirmation, sendBookingFailure, sendAdminBookingAlert, sendEnquiryConfirmation, sendAdminEnquiryAlert }
