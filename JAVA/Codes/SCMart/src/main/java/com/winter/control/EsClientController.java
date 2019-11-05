package com.winter.control;

import com.winter.model.Student;
import com.winter.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RequestMapping("/esClient")
@RestController
public class EsClientController {
    @Autowired
    private IStudentService studentService;

    @RequestMapping("/addStudent")
    public String addStudent(String studentName, Integer age) {
        Student student = new Student(UUID.randomUUID().toString(),
                studentName, age, new Date());
        studentService.addStudentES(student);
        return "success";
    }

    @RequestMapping("/batchAddStudent")
    public String batchAddStudent() {
        List<Student> list = new ArrayList<Student>();
        for (int i = 0; i < 100; i++) {
            Student student = new Student(UUID.randomUUID().toString(),
                    "黄家驹" + i, i + 1, new Date());
            list.add(student);
        }
        studentService.batchAddStudent(list);
        return "success";
    }

    @RequestMapping("/queryStudentsWithName")
    public List<Student> queryStudentsByName(String studentName) {
        return studentService.findStudentByNameES(studentName);
    }

    @RequestMapping("/createIndex")
    public String queryStudentsByName() {
        studentService.createIndex();
        return "Success";
    }
}
