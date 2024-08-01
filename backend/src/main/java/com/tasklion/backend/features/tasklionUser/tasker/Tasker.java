package com.tasklion.backend.features.tasklionUser.tasker;

import com.tasklion.backend.features.taskerService.TaskerService;
import com.tasklion.backend.features.taskerService.serviceArea.ServiceArea;
import com.tasklion.backend.features.tasklionAccount.TasklionAccount;
import com.tasklion.backend.features.tasklionUser.TasklionUser;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.proxy.HibernateProxy;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "TASKER")
@AllArgsConstructor
public class Tasker extends TasklionUser implements Serializable {

    @Serial
    private static final long serialVersionUID = -3610429868005238983L;

    @OneToOne
    @JoinColumn(name = "TASKLION_ACCOUNT_ID")
    private TasklionAccount tasklionAccount;

    @Column(name = "ABOUT_ME")
    private String aboutMe;

    @ToString.Exclude
    @OneToMany(mappedBy = "tasker", cascade = CascadeType.ALL)
    private List<ServiceArea> serviceAreas;

    @ToString.Exclude
    @Builder.Default
    @OneToMany(mappedBy = "tasker", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TaskerService> services = new ArrayList<>();

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