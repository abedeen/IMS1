package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.OrderStatusService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.service.dto.OrderStatusDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing OrderStatus.
 */
@RestController
@RequestMapping("/api")
public class OrderStatusResource {

    private final Logger log = LoggerFactory.getLogger(OrderStatusResource.class);

    private static final String ENTITY_NAME = "orderStatus";

    private final OrderStatusService orderStatusService;

    public OrderStatusResource(OrderStatusService orderStatusService) {
        this.orderStatusService = orderStatusService;
    }

    /**
     * POST  /order-statuses : Create a new orderStatus.
     *
     * @param orderStatusDTO the orderStatusDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderStatusDTO, or with status 400 (Bad Request) if the orderStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-statuses")
    @Timed
    public ResponseEntity<OrderStatusDTO> createOrderStatus(@RequestBody OrderStatusDTO orderStatusDTO) throws URISyntaxException {
        log.debug("REST request to save OrderStatus : {}", orderStatusDTO);
        if (orderStatusDTO.getId() != null) {
            throw new BadRequestAlertException("A new orderStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderStatusDTO result = orderStatusService.save(orderStatusDTO);
        return ResponseEntity.created(new URI("/api/order-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-statuses : Updates an existing orderStatus.
     *
     * @param orderStatusDTO the orderStatusDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderStatusDTO,
     * or with status 400 (Bad Request) if the orderStatusDTO is not valid,
     * or with status 500 (Internal Server Error) if the orderStatusDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-statuses")
    @Timed
    public ResponseEntity<OrderStatusDTO> updateOrderStatus(@RequestBody OrderStatusDTO orderStatusDTO) throws URISyntaxException {
        log.debug("REST request to update OrderStatus : {}", orderStatusDTO);
        if (orderStatusDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderStatusDTO result = orderStatusService.save(orderStatusDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderStatusDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-statuses : get all the orderStatuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderStatuses in body
     */
    @GetMapping("/order-statuses")
    @Timed
    public List<OrderStatusDTO> getAllOrderStatuses() {
        log.debug("REST request to get all OrderStatuses");
        return orderStatusService.findAll();
    }

    /**
     * GET  /order-statuses/:id : get the "id" orderStatus.
     *
     * @param id the id of the orderStatusDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderStatusDTO, or with status 404 (Not Found)
     */
    @GetMapping("/order-statuses/{id}")
    @Timed
    public ResponseEntity<OrderStatusDTO> getOrderStatus(@PathVariable Long id) {
        log.debug("REST request to get OrderStatus : {}", id);
        Optional<OrderStatusDTO> orderStatusDTO = orderStatusService.findOne(id);
        return ResponseUtil.wrapOrNotFound(orderStatusDTO);
    }

    /**
     * DELETE  /order-statuses/:id : delete the "id" orderStatus.
     *
     * @param id the id of the orderStatusDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-statuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderStatus(@PathVariable Long id) {
        log.debug("REST request to delete OrderStatus : {}", id);
        orderStatusService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
