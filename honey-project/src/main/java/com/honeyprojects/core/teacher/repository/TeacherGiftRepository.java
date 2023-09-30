package com.honeyprojects.core.teacher.repository;

import com.honeyprojects.entity.Gift;
import com.honeyprojects.repository.GiftRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherGiftRepository extends GiftRepository {
    @Query(value = """
        select * from gift g where g.code =:code
""",nativeQuery = true)
    public Gift getIdClubByCode(String code);

    @Query("""
    select g from Gift g where (g.toDate < :dateNow and g.status !=3) 
    or ((g.fromDate <= :dateNow and g.toDate > :dateNow) and g.status !=2 )
""")
    List<Gift> getAllGiftWrong(Long dateNow);

}
