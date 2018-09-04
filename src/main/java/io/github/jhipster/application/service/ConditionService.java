package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.ConditionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Condition.
 */
public interface ConditionService {

    /**
     * Save a condition.
     *
     * @param conditionDTO the entity to save
     * @return the persisted entity
     */
    ConditionDTO save(ConditionDTO conditionDTO);

    /**
     * Get all the conditions.
     *
     * @return the list of entities
     */
    List<ConditionDTO> findAll();


    /**
     * Get the "id" condition.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ConditionDTO> findOne(Long id);

    /**
     * Delete the "id" condition.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
