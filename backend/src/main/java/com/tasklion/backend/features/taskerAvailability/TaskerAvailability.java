package com.tasklion.backend.features.taskerAvailability;

import com.tasklion.backend.features.taskerAvailability.taskerTimeAvailability.TaskerTimeAvailability;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TASKER_AVAILABILITY")
public class TaskerAvailability implements Serializable {

    @Serial
    private static final long serialVersionUID = 4890083875961078506L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name="DATE", nullable = false)
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "TASKER_TIME_AVAILABILITY_ID", nullable = false)
    private TaskerTimeAvailability taskerTimeAvailability;

    @Column(name = "STATUS", nullable = false)
    private String status;

}
