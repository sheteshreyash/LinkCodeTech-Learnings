package com.example.pass_val.entity;


public class LoginData {

    private String name;

    private String email;
    private String phone;
    private String password;
    private String cpassword;
    
    public LoginData(String name, String email, String phone, String password, String cpassword) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.cpassword = cpassword;
    }
    public LoginData() {
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
