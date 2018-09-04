package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.OrderItemsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing OrderItems.
 */
public interface OrderItemsService {

    /**
     * Save a orderItems.
     *
     * @param orderItemsDTO the entity to save
     * @return the persisted entity
     */
    OrderItemsDTO save(OrderItemsDTO orderItemsDTO);

    /**
     * Get all the orderItems.
     *
     * @return the list of entities
     */
    List<OrderItemsDTO> findAll();


    /**
     * Get the "id" orderItems.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<OrderItemsDTO> findOne(Long id);

    /**
     * Delete the "id" orderItems.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
