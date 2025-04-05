package com.example.events;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @GetMapping
    public ResponseEntity<Page<EventDTO>> getEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        Page<EventDTO> response = eventService.listAllEvents(page, size);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/custom")
    public ResponseEntity<EventResponseDTO> getCustomEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<EventDTO> data = eventService.listAllEvents(page, size);

        EventResponseDTO response = EventResponseDTO
                .builder()
                .content(data.getContent())
                .totalItemsPerPage(data.getSize())
                .totalItems(data.getTotalElements())
                .totalPages(data.getTotalPages())
                .currentPage(data.getNumber())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping
    public ResponseEntity<EventDTO> createEvent(
            @RequestBody EventRequestDTO eventRequestDTO
    ) {
        EventDTO response = eventService.createEvent(eventRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
