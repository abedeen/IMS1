package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.NameEntityService;
import io.github.jhipster.application.domain.NameEntity;
import io.github.jhipster.application.repository.NameEntityRepository;
import io.github.jhipster.application.service.dto.NameEntityDTO;
import io.github.jhipster.application.service.mapper.NameEntityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing NameEntity.
 */
@Service
@Transactional
public class NameEntityServiceImpl implements NameEntityService {

    private final Logger log = LoggerFactory.getLogger(NameEntityServiceImpl.class);

    private final NameEntityRepository nameEntityRepository;

    private final NameEntityMapper nameEntityMapper;

    public NameEntityServiceImpl(NameEntityRepository nameEntityRepository, NameEntityMapper nameEntityMapper) {
        this.nameEntityRepository = nameEntityRepository;
        this.nameEntityMapper = nameEntityMapper;
    }

    /**
     * Save a nameEntity.
     *
     * @param nameEntityDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public NameEntityDTO save(NameEntityDTO nameEntityDTO) {
        log.debug("Request to save NameEntity : {}", nameEntityDTO);
        NameEntity nameEntity = nameEntityMapper.toEntity(nameEntityDTO);
        nameEntity = nameEntityRepository.save(nameEntity);
        return nameEntityMapper.toDto(nameEntity);
    }

    /**
     * Get all the nameEntities.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<NameEntityDTO> findAll() {
        log.debug("Request to get all NameEntities");
        return nameEntityRepository.findAll().stream()
            .map(nameEntityMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one nameEntity by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<NameEntityDTO> findOne(Long id) {
        log.debug("Request to get NameEntity : {}", id);
        return nameEntityRepository.findById(id)
            .map(nameEntityMapper::toDto);
    }

    /**
     * Delete the nameEntity by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete NameEntity : {}", id);
        nameEntityRepository.deleteById(id);
    }
}
