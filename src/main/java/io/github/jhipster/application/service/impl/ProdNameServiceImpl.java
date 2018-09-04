package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.ProdNameService;
import io.github.jhipster.application.domain.ProdName;
import io.github.jhipster.application.repository.ProdNameRepository;
import io.github.jhipster.application.service.dto.ProdNameDTO;
import io.github.jhipster.application.service.mapper.ProdNameMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing ProdName.
 */
@Service
@Transactional
public class ProdNameServiceImpl implements ProdNameService {

    private final Logger log = LoggerFactory.getLogger(ProdNameServiceImpl.class);

    private final ProdNameRepository prodNameRepository;

    private final ProdNameMapper prodNameMapper;

    public ProdNameServiceImpl(ProdNameRepository prodNameRepository, ProdNameMapper prodNameMapper) {
        this.prodNameRepository = prodNameRepository;
        this.prodNameMapper = prodNameMapper;
    }

    /**
     * Save a prodName.
     *
     * @param prodNameDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProdNameDTO save(ProdNameDTO prodNameDTO) {
        log.debug("Request to save ProdName : {}", prodNameDTO);
        ProdName prodName = prodNameMapper.toEntity(prodNameDTO);
        prodName = prodNameRepository.save(prodName);
        return prodNameMapper.toDto(prodName);
    }

    /**
     * Get all the prodNames.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProdNameDTO> findAll() {
        log.debug("Request to get all ProdNames");
        return prodNameRepository.findAll().stream()
            .map(prodNameMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one prodName by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProdNameDTO> findOne(Long id) {
        log.debug("Request to get ProdName : {}", id);
        return prodNameRepository.findById(id)
            .map(prodNameMapper::toDto);
    }

    /**
     * Delete the prodName by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProdName : {}", id);
        prodNameRepository.deleteById(id);
    }
}
