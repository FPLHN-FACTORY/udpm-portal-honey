package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import java.awt.font.ShapeGraphicAttribute;

@Getter
@Setter
public class StudentHistoryResponse {
    private String image;
    private String content;
    private String point;
    private String pointGet;
}
