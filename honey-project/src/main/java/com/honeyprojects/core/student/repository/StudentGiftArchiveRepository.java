package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.request.StudentArchiveFilterRequest;
import com.honeyprojects.core.student.model.response.StudentArchiveResponse;
import com.honeyprojects.repository.ArchiveRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface StudentGiftArchiveRepository extends ArchiveRepository {
    @Query(value = """
                    select g.code, g.name, g.status, g.type, g.to_date, g.from_date, g.image from archive a
                    inner join archive_gift ag on ag.archive_id = a.id
                    inner join gift g on ag.gift_id = g.id
                    where (a.student_id =:#{#filterRequest.idStudent})
                    and (:#{#filterRequest.status} is null OR g.status = :#{#filterRequest.status})
                    and (:#{#filterRequest.type} is null OR g.type = :#{#filterRequest.type})
            """, nativeQuery = true)
    Page<StudentArchiveResponse> getAllGiftArchive(StudentArchiveFilterRequest filterRequest, Pageable pageable);
}
