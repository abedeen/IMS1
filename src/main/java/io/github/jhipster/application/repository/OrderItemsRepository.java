package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.OrderItems;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrderItems entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {

}
