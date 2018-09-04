package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.VendorsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Vendors.
 */
public interface VendorsService {

    /**
     * Save a vendors.
     *
     * @param vendorsDTO the entity to save
     * @return the persisted entity
     */
    VendorsDTO save(VendorsDTO vendorsDTO);

    /**
     * Get all the vendors.
     *
     * @return the list of entities
     */
    List<VendorsDTO> findAll();


    /**
     * Get the "id" vendors.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<VendorsDTO> findOne(Long id);

    /**
     * Delete the "id" vendors.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
