package com.tasklion.backend.features.taskerService.serviceReview;

import com.tasklion.backend.features.task.Task;
import com.tasklion.backend.features.tasklionUser.customer.Customer;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "SERVICE_REVIEW",
        uniqueConstraints = @UniqueConstraint(columnNames = {"REVIEWER_ID", "TASK_ID"}))
public class ServiceReview implements Serializable {

    @Serial
    private static final long serialVersionUID = -1269358414230582464L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "RATING")
    private Double rating;

    @Column(name = "COMMENT")
    private String comment;

    @Column(name = "REVIEW_DATE")
    private LocalDate reviewDate;

    @ManyToOne
    @JoinColumn(name = "REVIEWER_ID")
    private Customer reviewer;

    @ManyToOne
    @JoinColumn(name = "TASK_ID")
    private Task task;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        ServiceReview that = (ServiceReview) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
