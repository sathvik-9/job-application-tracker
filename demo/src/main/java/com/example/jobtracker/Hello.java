package com.example.jobtracker;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;


@RestController 
public class Hello {

    @GetMapping("/")
    public String greet(){
        return "Hello World!";
    }
}
