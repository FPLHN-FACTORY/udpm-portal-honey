package com.honeyprojects.core.teacher.model.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TeacherGiftStudentResponse {
   private String code;
   private String name;
   private String email;
   private String club;
}
