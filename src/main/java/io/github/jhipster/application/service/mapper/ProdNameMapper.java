package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.ProdNameDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProdName and its DTO ProdNameDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProdNameMapper extends EntityMapper<ProdNameDTO, ProdName> {



    default ProdName fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProdName prodName = new ProdName();
        prodName.setId(id);
        return prodName;
    }
}
