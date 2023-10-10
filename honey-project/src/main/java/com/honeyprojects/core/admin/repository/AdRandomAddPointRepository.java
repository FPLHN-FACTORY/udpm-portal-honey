package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminChestGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminChestReponse;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdRandomAddPointRepository extends HoneyRepository {
    @Query(value = """
            SELECT c.id, c.name, c.code, c.category_status, c.transaction_rights
            FROM category c
            ORDER BY c.last_modified_date DESC
            """, nativeQuery = true)
    List<AdminCategoryResponse> getAllCategory();

    @Query(value = """
            SELECT DISTINCT student_id
            FROM honey
            """, nativeQuery = true)
    List<String> getAllIdStudentInHoney();

    @Query(value = """
            SELECT *
            FROM honey
            WHERE student_id = :#{#idStudent} and honey_category_id = :#{#idCategory}
            """, nativeQuery = true)
    Optional<Honey> getHoneyByIdStudent(String idStudent, String idCategory);

    @Query(value = """
            select row_number() OVER(ORDER BY created_date DESC) as stt, id, name
            from chest
            """, nativeQuery = true)
    List<AdminChestReponse> getAllChest();

    @Query(value = """
            select  row_number()  OVER(ORDER BY c.created_date DESC) as stt, g.id, g.name, g.code, g.from_date, g.to_date
            from chest c
            join chest_gift cg on c.id = cg.chest_id
            join gift g on g.id = cg.gift_id
            where c.id = :#{#idchest}
            """, nativeQuery = true)
    List<AdminChestGiftResponse> getAllGiftByChest(String idchest);

    @Query(value = """
            select row_number()  OVER(ORDER BY created_date DESC) as stt, id, name
            from chest
            where id = :#{#idChest}
            """, nativeQuery = true)
    AdminChestReponse getChestById(String idChest);

    @Query(value = """
            select id
            from chest_gift
            where chest_id = :#{#idChest} and gift_id = :#{#idGift}
            """, nativeQuery = true)
    String getOptionalChestGift(String idChest, String idGift);

    @Query(value = """
            select id
            from archive
            where student_id = :#{#idStudent}
            """,nativeQuery = true)
    String getArchiveByIdStudent(String idStudent);

    @Query(value = """
            select name
            from chest
            """, nativeQuery = true)
    List<String> getAllNameChest();

    @Query(value = """
            SELECT  row_number()  OVER(ORDER BY created_date DESC) as stt, id, name, code, category_status, transaction_rights
            FROM category
            where name = :categoryPoint
            """,nativeQuery = true)
    AdminCategoryResponse getCategoryByName(String categoryPoint);

    @Query(value = """
            SELECT id
            from gift
            where name = :#{#name} and status = 2
            """,nativeQuery = true)
    String getIdGiftByName(String name);

//    @Query(value = """
//            SELECT c.id, c.name, c.code
//            FROM category c WHERE c.name = :#{#nameCategory}
//            """, nativeQuery = true)
//    AdminCategoryResponse getCategoryByName(String nameCategory);

//    @Query(value = """
//            SELECT DISTINCT type
//            FROM gift
//            ORDER BY type ASC
//            """, nativeQuery = true)
//    List<Integer> getAllTypeGift();

//    @Query(value = """
//            SELECT *
//            FROM gift
//            WHERE type = :#{#typeNumber}
//            ORDER BY type ASC
//            """, nativeQuery = true)
//    List<AdminGiftResponse> getGiftByType(Integer typeNumber);

//    @Query(value = """
//            SELECT DISTINCT *
//            FROM archive
//            WHERE student_id = :#{#idStudent}
//            """, nativeQuery = true)
//    Archive getArchiveByIdStudent(String idStudent);
}
