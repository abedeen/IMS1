package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ProdName;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProdName entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProdNameRepository extends JpaRepository<ProdName, Long> {

}
