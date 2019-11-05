package com.winter.service.impl;

import com.mongodb.client.result.UpdateResult;
import com.winter.model.Student;
import com.winter.repository.IStudentRepository;
import com.winter.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("stdentService")
public class StudentServiceImpl implements IStudentService {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Resource(name = "studentDao")
    private IStudentRepository studentDao;

    @Override
    public void addStudentMongod(Student student) {
        mongoTemplate.save(student);
    }

    @Override
    public void addStudentES(Student student) {
        studentDao.addStudent(student);
    }

    @Override
    public void batchAddStudent(List<Student> students) {
        studentDao.batchAddStudent(students);
    }

    @Override
    public void deleteStudentById(String id) {
        Query query = new Query(Criteria.where("id").is(id));
        mongoTemplate.remove(query, Student.class);
    }

    @Override
    public Student findById(String id) {
        return mongoTemplate.findById(id, Student.class);
    }

    @Override
    public Student findStudentByNameMongod(String studentName) {
        Query query = new Query(Criteria.where("studentName").is(studentName));
        return mongoTemplate.findOne(query, Student.class);
    }

    @Override
    public List<Student> findStudentByNameES(String studentName) {
        return studentDao.queryStudentByName(studentName);
    }

    @Override
    public void updateStudentInfo(Student student) {
        Query query = new Query(Criteria.where("id").is(student.getId()));
        Update update = new Update().set("userName", student.getName()).
                set("age", student.getAge());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Student.class);
    }

    @Override
    public List<Student> queryStudentList(String sortFiled,Integer page, Integer size) {
        Query query = new Query();
        query.with(new Sort(Sort.Direction.DESC,sortFiled));
        // 数量
        long total = mongoTemplate.count(query,Student.class);
        // 分页
        query.skip((page - 1) * size).limit(size);
        List<Student> students = mongoTemplate.find(query, Student.class);
        return students;
    }

    @Override
    public void createIndex() {
        studentDao.createIndex();
    }
}
