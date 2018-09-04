package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.VendorsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Vendors and its DTO VendorsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface VendorsMapper extends EntityMapper<VendorsDTO, Vendors> {



    default Vendors fromId(Long id) {
        if (id == null) {
            return null;
        }
        Vendors vendors = new Vendors();
        vendors.setId(id);
        return vendors;
    }
}
