package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.ConditionService;
import io.github.jhipster.application.domain.Condition;
import io.github.jhipster.application.repository.ConditionRepository;
import io.github.jhipster.application.service.dto.ConditionDTO;
import io.github.jhipster.application.service.mapper.ConditionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Condition.
 */
@Service
@Transactional
public class ConditionServiceImpl implements ConditionService {

    private final Logger log = LoggerFactory.getLogger(ConditionServiceImpl.class);

    private final ConditionRepository conditionRepository;

    private final ConditionMapper conditionMapper;

    public ConditionServiceImpl(ConditionRepository conditionRepository, ConditionMapper conditionMapper) {
        this.conditionRepository = conditionRepository;
        this.conditionMapper = conditionMapper;
    }

    /**
     * Save a condition.
     *
     * @param conditionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ConditionDTO save(ConditionDTO conditionDTO) {
        log.debug("Request to save Condition : {}", conditionDTO);
        Condition condition = conditionMapper.toEntity(conditionDTO);
        condition = conditionRepository.save(condition);
        return conditionMapper.toDto(condition);
    }

    /**
     * Get all the conditions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ConditionDTO> findAll() {
        log.debug("Request to get all Conditions");
        return conditionRepository.findAll().stream()
            .map(conditionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one condition by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ConditionDTO> findOne(Long id) {
        log.debug("Request to get Condition : {}", id);
        return conditionRepository.findById(id)
            .map(conditionMapper::toDto);
    }

    /**
     * Delete the condition by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Condition : {}", id);
        conditionRepository.deleteById(id);
    }
}
