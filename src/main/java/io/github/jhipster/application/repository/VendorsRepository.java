package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Vendors;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Vendors entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VendorsRepository extends JpaRepository<Vendors, Long> {

}
