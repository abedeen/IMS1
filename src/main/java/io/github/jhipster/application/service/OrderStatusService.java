package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.OrderStatusDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing OrderStatus.
 */
public interface OrderStatusService {

    /**
     * Save a orderStatus.
     *
     * @param orderStatusDTO the entity to save
     * @return the persisted entity
     */
    OrderStatusDTO save(OrderStatusDTO orderStatusDTO);

    /**
     * Get all the orderStatuses.
     *
     * @return the list of entities
     */
    List<OrderStatusDTO> findAll();


    /**
     * Get the "id" orderStatus.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<OrderStatusDTO> findOne(Long id);

    /**
     * Delete the "id" orderStatus.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
