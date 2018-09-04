package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.ProdNameDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ProdName.
 */
public interface ProdNameService {

    /**
     * Save a prodName.
     *
     * @param prodNameDTO the entity to save
     * @return the persisted entity
     */
    ProdNameDTO save(ProdNameDTO prodNameDTO);

    /**
     * Get all the prodNames.
     *
     * @return the list of entities
     */
    List<ProdNameDTO> findAll();


    /**
     * Get the "id" prodName.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ProdNameDTO> findOne(Long id);

    /**
     * Delete the "id" prodName.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
