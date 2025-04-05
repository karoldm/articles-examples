package com.example.events;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventRequestDTO {
    private String title;
    private LocalDateTime date;
}
