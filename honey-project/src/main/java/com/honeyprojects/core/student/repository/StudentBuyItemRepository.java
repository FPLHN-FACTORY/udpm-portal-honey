package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.request.StudentFilterHistoryRequest;
import com.honeyprojects.core.student.model.response.StudentBuyItemResponse;
import com.honeyprojects.core.student.model.response.StudentCreateResquestConversionResponse;
import com.honeyprojects.repository.HistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentBuyItemRepository extends HistoryRepository {

    @Query(value = """
                SELECT c.name as nameCategory,  h.id,h.name_gift, h.honey_point, h.last_modified_date ,
                h.created_date, h.status, h.student_id FROM history h  inner join
                 honey hn on hn.id = h.honey_id inner join category c 
                 on hn.honey_category_id = c.id 
                  WHERE (:#{#filter.status} IS NULL OR h.status = :#{#filter.status})
            AND (:#{#filter.idCategory} IS NULL OR c.id = :#{#filter.idCategory})
            AND h.type = 2 ORDER BY h.last_modified_date DESC
                """, nativeQuery = true)
    Page<StudentBuyItemResponse> getHistory(@Param("filter") StudentFilterHistoryRequest filter,
                                            Pageable pageable);


}
