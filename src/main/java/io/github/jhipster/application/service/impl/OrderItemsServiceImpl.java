package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.OrderItemsService;
import io.github.jhipster.application.domain.OrderItems;
import io.github.jhipster.application.repository.OrderItemsRepository;
import io.github.jhipster.application.service.dto.OrderItemsDTO;
import io.github.jhipster.application.service.mapper.OrderItemsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing OrderItems.
 */
@Service
@Transactional
public class OrderItemsServiceImpl implements OrderItemsService {

    private final Logger log = LoggerFactory.getLogger(OrderItemsServiceImpl.class);

    private final OrderItemsRepository orderItemsRepository;

    private final OrderItemsMapper orderItemsMapper;

    public OrderItemsServiceImpl(OrderItemsRepository orderItemsRepository, OrderItemsMapper orderItemsMapper) {
        this.orderItemsRepository = orderItemsRepository;
        this.orderItemsMapper = orderItemsMapper;
    }

    /**
     * Save a orderItems.
     *
     * @param orderItemsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrderItemsDTO save(OrderItemsDTO orderItemsDTO) {
        log.debug("Request to save OrderItems : {}", orderItemsDTO);
        OrderItems orderItems = orderItemsMapper.toEntity(orderItemsDTO);
        orderItems = orderItemsRepository.save(orderItems);
        return orderItemsMapper.toDto(orderItems);
    }

    /**
     * Get all the orderItems.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<OrderItemsDTO> findAll() {
        log.debug("Request to get all OrderItems");
        return orderItemsRepository.findAll().stream()
            .map(orderItemsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one orderItems by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<OrderItemsDTO> findOne(Long id) {
        log.debug("Request to get OrderItems : {}", id);
        return orderItemsRepository.findById(id)
            .map(orderItemsMapper::toDto);
    }

    /**
     * Delete the orderItems by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderItems : {}", id);
        orderItemsRepository.deleteById(id);
    }
}
