package com.winter.repository;

import com.winter.model.Student;

import java.util.List;

public interface IStudentRepository {
    /**
     * 添加学生
     *
     * @param student
     */
    void addStudent(Student student);

    /**
     * 批量添加学生
     *
     * @param students
     */
    void batchAddStudent(List<Student> students);

    /**
     * 根据学生信息查询学生信息
     *
     * @param studentName
     */
    List<Student> queryStudentByName(String studentName);

    /**
     * 创建索引
     */
    public void createIndex();
}
