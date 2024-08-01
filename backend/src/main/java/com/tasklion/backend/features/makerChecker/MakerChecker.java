package com.tasklion.backend.features.makerChecker;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "MAKER_CHECKER")
public class MakerChecker implements Serializable {

    @Serial
    private static final long serialVersionUID = 94950369724158903L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "MAKER_ID")
    private String makerId;

    @Column(name = "CHECKER_ID")
    private String checkerId;

    @Type(JsonType.class)
    @Column(name = "CURRENT_VALUE", columnDefinition = "jsonb")
    private String currentValue;

    @Type(JsonType.class)
    @Column(name = "NEW_VALUE", columnDefinition = "jsonb")
    private String newValue;

    @Column(name = "STATUS")
    private String status;

    @CreationTimestamp
    private LocalDateTime creationDateTime;

}
