package com.tasklion.backend.features.taskerService;

import com.querydsl.core.annotations.QueryInit;
import com.tasklion.backend.features.taskerService.serviceCategory.ServiceCategory;
import com.tasklion.backend.features.taskerService.serviceReview.ServiceReview;
import com.tasklion.backend.features.tasklionUser.tasker.Tasker;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "TASKER_SERVICE",
        uniqueConstraints = @UniqueConstraint(columnNames = {"TASKER_ID", "SERVICE_CATEGORY_ID"}))
public class TaskerService implements Serializable {

    @Serial
    private static final long serialVersionUID = -1263749612155844491L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @QueryInit("tasklionAccount.username")
    @ManyToOne
    @JoinColumn(name = "TASKER_ID")
    private Tasker tasker;

    @Column(name = "DESCRIPTION")
    private String description;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "TASKER_SERVICE_ID", referencedColumnName = "ID")
    private List<ServiceReview> reviews;

    @ManyToOne
    @JoinColumn(name = "SERVICE_CATEGORY_ID")
    private ServiceCategory category;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        TaskerService taskerService = (TaskerService) o;
        return getId() != null && Objects.equals(getId(), taskerService.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
