package com.winter.service;

import com.winter.model.Student;

import java.util.List;

public interface IStudentService {
    /**
     * 新增学生信息
     * @param student
     */
    void addStudentMongod(Student student);

    /**
     * 新增学生信息
     * @param student
     */
    void addStudentES(Student student);

    /**
     * 批量添加学生信息
     * @param students
     * @return
     */
    void batchAddStudent(List<Student> students);

    /**
     * 删除学生信息
     * @param id
     */
    void deleteStudentById(String id);

    /**
     * 根据主键查询学生信息
     * @param id
     * @return
     */
    Student findById(String id);

    /**
     * 根据学生姓名查询学生信息
     * @param name
     * @return
     */
    Student findStudentByNameMongod(String name);

    /**
     * 根据学生姓名查询学生信息
     * @param name
     * @return
     */
    List<Student> findStudentByNameES(String name);

    /**
     * 更新学生信息
     * @param student
     */
    void updateStudentInfo(Student student);

    /**
     * 分页查询
     * @param page
     * @param size
     * @return
     */
    List<Student> queryStudentList(String sortFiled, Integer page, Integer size);

    /**
     * 创建索引
     */
    void createIndex();
}
