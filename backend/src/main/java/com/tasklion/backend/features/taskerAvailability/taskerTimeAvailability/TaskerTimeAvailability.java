package com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability;

import com.tasklion.backend.features.tasklionUser.tasker.Tasker;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "TASKER_TIME_AVAILABILITY")
public class TaskerTimeAvailability  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "TASKER_ID", nullable = false)
    private Tasker tasker;

    @Column(name = "START_TIME", nullable = false)
    private LocalTime startTime;

    @Column(name = "END_TIME", nullable = false)
    private LocalTime endTime;

}
