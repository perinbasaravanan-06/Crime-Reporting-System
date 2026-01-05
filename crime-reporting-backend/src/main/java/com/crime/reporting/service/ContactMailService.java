//package com.crime.reporting.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.stereotype.Service;
//
//import com.crime.reporting.dto.ContactRequest;
//
//import jakarta.mail.MessagingException;
//import jakarta.mail.internet.MimeMessage;
//
//@Service
//public class ContactMailService {
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    public void sendContactMail(ContactRequest req) throws MessagingException {
//
//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//        helper.setTo("admin@crimeportal.com");
//        helper.setSubject("🚨 Contact Form: " + req.getSubject());
//
//        String html = """
//        <div style="font-family:Inter,sans-serif;padding:20px;background:#f8fafc">
//          <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:24px">
//            <h2 style="color:#0b2545">📨 New Contact Request</h2>
//            <hr/>
//            <p><b>Name:</b> %s</p>
//            <p><b>Email:</b> %s</p>
//            <p><b>Message:</b></p>
//            <div style="padding:12px;background:#f1f5f9;border-radius:8px">
//              %s
//            </div>
//            <br/>
//            <small style="color:#64748b">
//              Crime Reporting Portal • Contact System
//            </small>
//          </div>
//        </div>
//        """.formatted(req.getName(), req.getEmail(), req.getMessage());
//
//        helper.setText(html, true);
//        mailSender.send(message);
//    }
//}
