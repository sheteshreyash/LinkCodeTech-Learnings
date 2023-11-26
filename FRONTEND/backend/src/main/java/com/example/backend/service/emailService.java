// package com.example.backend.service;

// import org.apache.logging.log4j.message.SimpleMessage;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.example.backend.model.EmailRequest;

// import jakarta.mail.*;
// import jakarta.mail.event.TransportEvent;
// import jakarta.mail.internet.InternetAddress;
// import jakarta.mail.internet.MimeMessage;
// import java.util.Properties;

// import javax.mail.Address;
// import javax.mail.Authenticator;
// import javax.mail.Message;
// import javax.mail.PasswordAuthentication;
// import javax.mail.Session;
// import javax.mail.Transport;
// import javax.mail.internet.InternetAddress;
// import javax.mail.internet.MimeMessage;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.mail.MailSender;
// import org.springframework.mail.SimpleMailMessage;



// @Service
// public class emailService {
    
//     /**
//      * @param subject
//      * @param message
//      * @param to
//      */
//     public boolean sendEmail(String subject, String message, String to) {
		
//         boolean f = false;
//         String from = "shreyashshete02315@gmail.com";
		//Variable for gmail
		// String host="smtp.gmail.com";
		
		//get the system properties
		// Properties properties = System.getProperties();
		// System.out.println("PROPERTIES "+properties);
		
		//setting important information to properties object
		
		//host set
		// properties.put("mail.smtp.host", host);
		// properties.put("mail.smtp.port","25");
		// properties.put("mail.smtp.ssl.enable","true");
		// properties.put("mail.smtp.auth","true");
		
		//Step 1: to get the session object..
		// Session session=Session.getInstance(properties, new Authenticator() {
		// 	@Override
		// 	protected PasswordAuthentication getPasswordAuthentication() {				
		// 		return new PasswordAuthentication("shreyashshete02315@gmail.com", "eiqvbmtbotilxdmn");
		// 	}			
		// });
		
		// session.setDebug(true);
		
		//Step 2 : compose the message [text,multi media]
		//MimeMessage m = new MimeMessage(session);
		// MimeMessage m = new MimeMessage(session);
		
		// try {		
		//from email
		// m.setFrom(from);
		
		//adding recipient to message
		//m.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
		// m.addRecipients(MessageAware.RecipientType.TO, new InternetAddress(to));
		
		//adding subject to message
		// m.setSubject(subject);
		
		//adding text to message
		// m.setText(message);
		
		//send 
		
		//Step 3 : send the message using Transport class
		//Transport.send(m);
		// jakarta.mail.Transport.send(m);
		
// 		System.out.println("Sent success...................");
//         f= true;
		
// 		}catch (Exception e) {
// 			e.printStackTrace();
// 		}
//         return f;
// 	}

// }
