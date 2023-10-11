package com.honeyprojects.core.common.base;

import com.honeyprojects.util.DataUtils;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class BaseCategoryBusiness {
    @Autowired
    protected EntityManager entityManager;

    protected int CODE_LENGTH = 10;

    protected Long getNextSequenceValue(String sequenceName) {
        String query = "SELECT NEXTVAL(" + sequenceName + ")";
        String data = this.entityManager.createNativeQuery(query).getSingleResult().toString();
        return Long.parseLong(data);
    }

    protected String generateCode(long sequenceNumber) {
        return String.format("%0" + this.CODE_LENGTH + "d", sequenceNumber);
    }

    protected String generateCode(String prefix, long sequenceNumber) {
        String var10000 = DataUtils.safeToString(prefix);
        return var10000 + String.format("%0" + this.CODE_LENGTH + "d", sequenceNumber);
    }
}
