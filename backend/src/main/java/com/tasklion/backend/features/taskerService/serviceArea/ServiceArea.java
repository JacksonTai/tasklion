package com.tasklion.backend.features.taskerService.serviceArea;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tasklion.backend.features.tasklionUser.tasker.Tasker;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;
import org.hibernate.validator.constraints.Length;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "SERVICE_AREA")
public class ServiceArea implements Serializable {

    @Serial
    private static final long serialVersionUID = 175116376659115887L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "CITY")
    @Length(max = 30)
    private String city;

    @Column(name = "STATE")
    @Length(max = 20)
    private String state;

    @Column(name = "POSTCODE")
    @Length(max = 5)
    private String postcode;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "TASKER_ID")
    private Tasker tasker;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        ServiceArea serviceArea = (ServiceArea) o;
        return getId() != null && Objects.equals(getId(), serviceArea.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
