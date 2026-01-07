package com.crime.reporting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendContactMail(ContactRequest req) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper =
                new MimeMessageHelper(message, true, "UTF-8");

        // ✅ MUST match MAIL_USERNAME
        helper.setFrom(fromEmail);

        // ✅ Receiver (you)
        helper.setTo(fromEmail);

        helper.setSubject("Contact Form: " + req.getSubject());

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

                    <tr>
                      <td style="background:#0b2545;color:white;
                                 padding:16px 24px">
                        <h2 style="margin:0;font-size:20px">
                          Crime Reporting System
                        </h2>
                        <p style="margin:4px 0 0;font-size:13px;opacity:0.9">
                          New Contact Form Submission
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:24px;color:#1f2937;font-size:14px">
                        <p><strong>Name:</strong> %s</p>
                        <p><strong>Email:</strong> %s</p>
                        <p><strong>Subject:</strong> %s</p>

                        <p style="margin-top:16px;font-weight:bold">Message</p>
                        <div style="background:#f1f5f9;padding:14px;
                                    border-left:4px solid #0b2545">
                          %s
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="background:#f8fafc;padding:16px;
                                 font-size:12px;color:#6b7280">
                        Auto-generated email • Do not reply
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
