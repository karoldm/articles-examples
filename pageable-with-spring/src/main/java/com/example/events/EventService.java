package com.example.events;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;

    public Page<EventDTO> listAllEvents(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("date"));

        return eventRepository.findAll(pageable).map(event ->
                EventDTO
                        .builder()
                        .id(event.getId())
                        .title(event.getTitle())
                        .date(event.getDate())
                        .build()
        );
    }

    public EventDTO createEvent(EventRequestDTO eventRequestDTO) {
        EventEntity newEvent = EventEntity.builder()
                .title(eventRequestDTO.getTitle())
                .date(eventRequestDTO.getDate())
                .build();

        EventEntity createdEvent = eventRepository.save(newEvent);

        return EventDTO.builder()
                .id(createdEvent.getId())
                .title(createdEvent.getTitle())
                .date(createdEvent.getDate())
                .build();
    }
}
