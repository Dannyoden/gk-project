package com.goalkeeper.api.service.impl;

import com.goalkeeper.api.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailService {

    private JavaMailSender mailSender;
    private final String RESET_PASSWORD = "Please click the link below to reset your password: ";

    @Value("${goalkeeper.app.url}")
    private String baseUrl;

    @Autowired
    public EmailService(final JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void send(SimpleMailMessage simpleMailMessage) {
        mailSender.send(simpleMailMessage);
    }

    public SimpleMailMessage constructResetTokenEmail(String token, User user) {
        String url = baseUrl + "/update-password?token=" + token;
        String message = RESET_PASSWORD;
        return constructEmail("Reset Password", message + " \r\n" + url, user);
    }

    private SimpleMailMessage constructEmail(String subject, String body, User user) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(subject);
        email.setText(body);
        email.setTo(user.getEmail());
        email.setFrom("support@goal-keeper.io");
        return email;
    }
}
