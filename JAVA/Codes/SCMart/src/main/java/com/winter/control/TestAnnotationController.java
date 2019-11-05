package com.winter.control;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/springmvc")
public class TestAnnotationController {
    @RequestMapping(value = "/setUserInfo", method = RequestMethod.GET)
    public String setUserInfo(@RequestParam(name = "userName") String userName){
        System.out.println(userName);
        return "success";
    }
}
