package com.winter.control;

import com.winter.model.Student;
import com.winter.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private IStudentService studentService;

    @RequestMapping("/addStudent")
    public String addStudent(String name, Integer age) {
        String msg = "success";
        try {
            String id = UUID.randomUUID().toString();
            Student student = new Student(id, name, age, new Date());
            studentService.addStudentMongod(student);
        } catch (Exception e) {
            msg = "fail";
        }
        return msg;
    }

    @RequestMapping("/getStudentWithId")
    public Student getStudentWithId(String id) {
        try {
            return studentService.findById(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @RequestMapping("/deleteStudentById")
    public String deleteStudentById(String id) {
        try {
            studentService.deleteStudentById(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "fail";
        }
        return "success";
    }

    @RequestMapping("/findStudentByStudentName")
    public Student findStudentByStudentName(String studentName) {
        try {
            return studentService.findStudentByNameMongod(studentName);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @RequestMapping("/updateStudentInfo")
    public String updateStudentInfo(String id, String name, Integer age) {
        try {
            Student student = new Student(id, name, age, new Date());
            studentService.updateStudentInfo(student);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "fail";
        }
        return "success";
    }

    @RequestMapping("/queryStudentList")
    public List<Student> queryStudentList(String sortFiled, Integer page, Integer size){
        return studentService.queryStudentList(sortFiled, page, size);
    }
}