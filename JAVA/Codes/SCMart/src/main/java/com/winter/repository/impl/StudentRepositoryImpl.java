package com.winter.repository.impl;

import com.winter.model.Student;
import com.winter.repository.IStudentRepository;
import com.winter.utils.JestClientUtil;
import io.searchbox.client.JestResult;
import io.searchbox.core.Bulk;
import io.searchbox.core.Index;
import io.searchbox.core.Search;
import io.searchbox.indices.CreateIndex;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;
import java.util.List;

@Repository("studentDao")
public class StudentRepositoryImpl implements IStudentRepository {
    private static final String ES_INDEX_NAME = "student_index";
    private static final String ES_TYPE_NAME = "student_type";

    @Autowired
    private JestClientUtil jestClientUtil;


    @Override
    public void addStudent(Student student) {
        Index index = new Index.Builder(student).index(this.ES_INDEX_NAME).
                type(this.ES_TYPE_NAME).build();
        try {
            JestResult jestResult = jestClientUtil.createJestClient().execute(index);
            System.out.println(jestResult.isSucceeded());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void batchAddStudent(List<Student> students) {
        if (!CollectionUtils.isEmpty(students)) {
            try {
                Bulk.Builder bulk = new Bulk.Builder().defaultIndex(this.ES_INDEX_NAME).
                        defaultType(this.ES_TYPE_NAME);
                for (Student student : students) {
                    Index index = new Index.Builder(student).build();
                    bulk.addAction(index);
                }
                jestClientUtil.createJestClient().execute(bulk.build());
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }

    @Override
    public List<Student> queryStudentByName(String studentName) {
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchQuery("name", studentName));
        Search search = new Search.Builder(searchSourceBuilder.toString())
                .addIndex(this.ES_INDEX_NAME).addType(this.ES_TYPE_NAME).build();
        try {
            JestResult result = jestClientUtil.createJestClient().execute(search);
            return result.getSourceAsObjectList(Student.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void createIndex() {
        try {
            jestClientUtil.createJestClient().execute(new CreateIndex.
                    Builder(this.ES_INDEX_NAME).build());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
