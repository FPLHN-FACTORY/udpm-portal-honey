package com.portalprojects.repository;

import com.portalprojects.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(DocumentRepository.NAME)
public interface DocumentRepository extends JpaRepository<Document,String> {
    String NAME = "BaseDocumentRepository";


}
