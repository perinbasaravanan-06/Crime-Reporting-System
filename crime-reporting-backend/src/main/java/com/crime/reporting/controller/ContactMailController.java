//package com.crime.reporting.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.crime.reporting.dto.ContactRequest;
//import jakarta.mail.MessagingException;
//
//@RestController
//@RequestMapping("/api/contact")
//public class ContactMailController {
//
//    @Autowired
//    private ContactMailService mailService;
//
//    @PostMapping
//    public String sendContact(@RequestBody ContactRequest request) throws MessagingException {
//        mailService.sendContactMail(request);
//        return "Message sent successfully";
//    }
//}
