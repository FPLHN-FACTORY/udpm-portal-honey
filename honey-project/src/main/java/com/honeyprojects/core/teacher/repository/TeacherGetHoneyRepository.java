package com.honeyprojects.core.teacher.repository;

import com.honeyprojects.entity.Honey;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherGetHoneyRepository extends HoneyRepository {

    Honey findByStudentIdAndHoneyCategoryId(String studentId, String categoryId);

}
