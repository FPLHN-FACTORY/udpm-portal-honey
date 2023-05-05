package com.portalprojects.core.admin.repository;

import com.portalprojects.entity.Document;
import com.portalprojects.repository.DocumentRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface AdDocumentRepository extends DocumentRepository {

    @Query(value = """
    SELECT a.* FROM document a WHERE id = :documentId
    """,nativeQuery = true)
    Document findOne(@Param("documentId")String documentId);

    @Query(value = """
      SELECT a.*  FROM document a WHERE a.mission_detail_id = :missionDetailId 
      """,nativeQuery = true)
    ArrayList<Document> findAllByMissionDetailId(@Param("missionDetailId")String missionDetailId);

    @Query(value = """
      SELECT count(*)  FROM document a WHERE a.mission_detail_id = :missionDetailId 
      """,nativeQuery = true)
   int findCountOfDocument(@Param("missionDetailId")String missionDetailId);


}
