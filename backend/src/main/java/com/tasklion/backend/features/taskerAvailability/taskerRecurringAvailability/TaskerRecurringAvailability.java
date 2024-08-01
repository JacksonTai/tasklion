package com.tasklion.backend.features.taskerAvailability.taskerRecurringAvailability;

import com.querydsl.core.annotations.QueryInit;
import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.TaskerTimeAvailability;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@Entity
@Table(name = "TASKER_RECURRING_AVAILABILITY")
@NoArgsConstructor
@AllArgsConstructor
public class TaskerRecurringAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "DAY_OF_WEEK", nullable = false)
    private String dayOfWeek;

    @QueryInit("tasker")
    @ManyToOne
    @JoinColumn(name = "TASKER_TIME_AVAILABILITY_ID", nullable = false)
    private TaskerTimeAvailability taskerTimeAvailability;

}
