package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.NameEntityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity NameEntity and its DTO NameEntityDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface NameEntityMapper extends EntityMapper<NameEntityDTO, NameEntity> {



    default NameEntity fromId(Long id) {
        if (id == null) {
            return null;
        }
        NameEntity nameEntity = new NameEntity();
        nameEntity.setId(id);
        return nameEntity;
    }
}
