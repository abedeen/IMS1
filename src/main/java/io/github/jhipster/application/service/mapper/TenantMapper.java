package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.TenantDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Tenant and its DTO TenantDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TenantMapper extends EntityMapper<TenantDTO, Tenant> {



    default Tenant fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tenant tenant = new Tenant();
        tenant.setId(id);
        return tenant;
    }
}
