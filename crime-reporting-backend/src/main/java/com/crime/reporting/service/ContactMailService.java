package com.crime.reporting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.crime.reporting.dto.ContactRequest;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class ContactMailService {

    @Autowired
    private JavaMailSender mailSender;

    @SuppressWarnings("null")
	public void sendContactMail(ContactRequest req) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();

        // UTF-8 is IMPORTANT for emojis & HTML
        MimeMessageHelper helper =
                new MimeMessageHelper(message, true, "UTF-8");

        // MUST match MAIL_USERNAME env variable
        helper.setFrom("saravanan5227733@gmail.com");

        // Where YOU receive the mail
        helper.setTo("saravanan5227733@gmail.com");

        // Mail subject
        helper.setSubject("Contact Form: " + req.getSubject());

        // HTML mail body
        String html = """
            <table width="100%%" cellpadding="0" cellspacing="0"
                   style="background:#f1f5f9;padding:24px;
                          font-family:Arial,Helvetica,sans-serif">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0"
                         style="background:#ffffff;border-radius:10px;
                                overflow:hidden;
                                box-shadow:0 4px 12px rgba(0,0,0,0.08)">

                    <!-- HEADER -->
                    <tr>
                      <td style="background:#0b2545;color:white;
                                 padding:16px 24px">
                        <h2 style="margin:0;font-size:20px">
                          Crime Reporting System
                        </h2>
                        <p style="margin:4px 0 0;font-size:13px;
                                  opacity:0.9">
                          New Contact Form Submission
                        </p>
                      </td>
                    </tr>

                    <!-- BODY -->
                    <tr>
                      <td style="padding:24px;color:#1f2937;
                                 font-size:14px;line-height:1.6">

                        <p style="margin-top:0">
                          You have received a new contact request with the following details:
                        </p>

                        <table width="100%%" cellpadding="8" cellspacing="0"
                               style="border-collapse:collapse;
                                      background:#f8fafc;
                                      border:1px solid #e5e7eb;
                                      border-radius:6px">

                          <tr>
                            <td width="120"
                                style="font-weight:bold;color:#374151">
                              Name
                            </td>
                            <td>%s</td>
                          </tr>

                          <tr>
                            <td style="font-weight:bold;color:#374151">
                              Email
                            </td>
                            <td>%s</td>
                          </tr>

                          <tr>
                            <td style="font-weight:bold;color:#374151">
                              Subject
                            </td>
                            <td>%s</td>
                          </tr>
                        </table>

                        <br/>

                        <p style="font-weight:bold;margin-bottom:6px">
                          Message
                        </p>

                        <div style="background:#f1f5f9;
                                    padding:14px;
                                    border-left:4px solid #0b2545;
                                    border-radius:4px;
                                    white-space:pre-wrap">
                          %s
                        </div>

                      </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                      <td style="background:#f8fafc;
                                 padding:16px 24px;
                                 font-size:12px;
                                 color:#6b7280">
                        <p style="margin:0">
                          This email was generated automatically by the
                          <strong>Crime Reporting System</strong>.
                        </p>
                        <p style="margin:6px 0 0">
                          Do not reply to this email. For official communication,
                          use the admin dashboard.
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
            """.formatted(
                req.getName(),
                req.getEmail(),
                req.getSubject(),
                req.getMessage()
        );

        helper.setText(html, true);

        mailSender.send(message);
    }
}
