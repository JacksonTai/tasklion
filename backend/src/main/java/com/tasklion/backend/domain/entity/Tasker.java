package com.tasklion.backend.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.proxy.HibernateProxy;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "TASKER")
public class Tasker extends TasklionUser {

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "PERSONAL_DETAILS_ID", referencedColumnName = "ID")
    private PersonalDetail personalDetail;

    @Column(name = "ABOUT_ME")
    private String aboutMe;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ADDRESS_ID", referencedColumnName = "ID")
    private Address address;

    @OneToMany(mappedBy = "tasker", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Service> services = new ArrayList<>();

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Tasker tasker = (Tasker) o;
        return getId() != null && Objects.equals(getId(), tasker.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}