package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.NameEntityDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing NameEntity.
 */
public interface NameEntityService {

    /**
     * Save a nameEntity.
     *
     * @param nameEntityDTO the entity to save
     * @return the persisted entity
     */
    NameEntityDTO save(NameEntityDTO nameEntityDTO);

    /**
     * Get all the nameEntities.
     *
     * @return the list of entities
     */
    List<NameEntityDTO> findAll();


    /**
     * Get the "id" nameEntity.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<NameEntityDTO> findOne(Long id);

    /**
     * Delete the "id" nameEntity.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
