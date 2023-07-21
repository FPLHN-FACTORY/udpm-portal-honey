package com.honeyprojects.repository;

import com.honeyprojects.entity.Conversion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(ConversionRepository.NAME)
public interface ConversionRepository extends JpaRepository<Conversion, String> {
    public static final String NAME = "BaseConversionRepository";
}
