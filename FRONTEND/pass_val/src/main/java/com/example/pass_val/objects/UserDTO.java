package com.example.pass_val.objects;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

public class UserDTO {

    @NotBlank(message = "Enter your Name")
    private String name;

    @NotBlank(message = "Enter your Email")
    @Email(message = "Enter a valid Email Address")
    private String email;

    @NotBlank(message = "Enter your Phone Number")
    @Length(min=10 , max = 10, message = "Phone Number Must Be 10 Digits" )
    private String phone;

    @NotBlank(message = "Enter your Password")
    @Length(min = 6, message = "Password Must Be Atleast 6 Characters" )
    private String password;

    @NotBlank(message = "Re-enter your Password")
    @Length(min = 6, message = "Password Must Be Atleast 6 Characters" )
    private String cpassword;
    
    @Override
    public String toString() {
        return "UserDTO [name=" + name + ", email=" + email + ", phone=" + phone + ", password=" + password
                + ", cpassword=" + cpassword + "]";
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getCpassword() {
        return cpassword;
    }
    public void setCpassword(String cpassword) {
        this.cpassword = cpassword;
    }
}
