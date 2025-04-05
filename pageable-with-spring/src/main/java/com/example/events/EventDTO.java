package com.example.events;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class EventDTO {
    private UUID id;
    private String title;
    private LocalDateTime date;
}
