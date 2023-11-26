// package com.example.backend.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestMethod;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.backend.model.EmailRequest;
// import com.example.backend.service.emailService;

// @RestController
// public class Emailcontroller {

//     /**
//      *
//      */
//     @Autowired
//     private emailService emailService;

//     @RequestMapping("/welcome")
//     public String getwelcomemsg() {
//         return "Hello Shreyash";
//     }

    // api to send email 
    // @RequestMapping(value = "/sendemail", method = RequestMethod.POST)
    // public ResponseEntity<?> sendEmail(@RequestBody EmailRequest request) {

    //     System.out.println(request);
    //     this.emailService.sendEmail(request.getSubject(), request.getText(), request.getTo());
    //     return ResponseEntity.ok("Email is sent successfully");
    // }


// }
