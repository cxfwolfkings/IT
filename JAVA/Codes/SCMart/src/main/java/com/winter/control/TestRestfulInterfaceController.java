package com.winter.control;

import com.winter.config.StudentConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/restful")
public class TestRestfulInterfaceController{

    @Autowired
    private StudentConfig studentConfig;

    @RequestMapping("/test")
    public String testRestfulInterface(@RequestParam("name") String name) {
        return "hello" + name;
    }

    @RequestMapping("/printStudentInfo")
    public String getStudentInfo(){
        return "studentName:" + studentConfig.getName() +  "   studentAge:" + studentConfig.getAge();
    }

}
