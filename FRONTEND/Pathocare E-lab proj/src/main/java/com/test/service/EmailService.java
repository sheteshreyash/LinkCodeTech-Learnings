// package com.test.service;

// import java.util.Properties;
// import javax.mail.Message.RecipientType;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.MessageSourceAware;
// import org.springframework.http.converter.smile.MappingJackson2SmileHttpMessageConverter;
// import org.springframework.mail.javamail.MimeMailMessage;
// import org.springframework.stereotype.Service;

// import com.test.entity.EmailReq;

// import jakarta.mail.Authenticator;
// import jakarta.mail.MessageAware;
// import jakarta.mail.PasswordAuthentication;
// import jakarta.mail.Session;
// import jakarta.mail.Transport;
// import jakarta.mail.internet.InternetAddress;
// import jakarta.mail.internet.MimeMessage;
// import javax.mail.Message;


// @Service
// public class EmailService {
    
//     /**
//      * @param to
//      * @param subject
//      * @param Message
//      * @return
//      */

//     public boolean sendEmail(String to, String subject, String Message) {

//         boolean f = false;
//         String from = "shreyashshete02315@gmail.com";

//         // variable for gmail
//         String host = "smtp.gmail.com";

//         Properties properties;
//         Session ses = Session.getInstance(properties, new Authenticator() {
//             @Override
//             protected PasswordAuthentication getPasswordAuthentication() {
//                 return new PasswordAuthentication("shreyashshete02315@gmail.com", "ikqojzkoyrozatbk");
//             }
//         });

//         ses.setDebug(true);
//         MimeMessage m = new MimeMessage(ses);

//         try {
            
//             m.setFrom(from);            
//             m.addRecipient(((TO)MessageAware.RecipientType), new InternetAddress(to));
//             m.setSubject(subject);
//             m.setText(Message);
//             Transport.send(m);

//             System.out.println("Sent Success....");
//             f = true;

//         } catch (Exception e) {
//             e.printStackTrace();
//         }
//         return f;
//     }
// }
