package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.ConditionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Condition and its DTO ConditionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ConditionMapper extends EntityMapper<ConditionDTO, Condition> {



    default Condition fromId(Long id) {
        if (id == null) {
            return null;
        }
        Condition condition = new Condition();
        condition.setId(id);
        return condition;
    }
}
