package com.example.events;

import lombok.*;

import java.util.List;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventResponseDTO {
    private List<EventDTO> content;
    private int totalItemsPerPage;
    private long totalItems;
    private int totalPages;
    private int currentPage;
}