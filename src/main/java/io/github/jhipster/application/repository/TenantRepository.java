package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Tenant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Tenant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {

}
