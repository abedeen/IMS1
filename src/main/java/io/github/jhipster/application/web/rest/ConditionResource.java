package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.ConditionService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.service.dto.ConditionDTO;
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
 * REST controller for managing Condition.
 */
@RestController
@RequestMapping("/api")
public class ConditionResource {

    private final Logger log = LoggerFactory.getLogger(ConditionResource.class);

    private static final String ENTITY_NAME = "condition";

    private final ConditionService conditionService;

    public ConditionResource(ConditionService conditionService) {
        this.conditionService = conditionService;
    }

    /**
     * POST  /conditions : Create a new condition.
     *
     * @param conditionDTO the conditionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new conditionDTO, or with status 400 (Bad Request) if the condition has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/conditions")
    @Timed
    public ResponseEntity<ConditionDTO> createCondition(@RequestBody ConditionDTO conditionDTO) throws URISyntaxException {
        log.debug("REST request to save Condition : {}", conditionDTO);
        if (conditionDTO.getId() != null) {
            throw new BadRequestAlertException("A new condition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConditionDTO result = conditionService.save(conditionDTO);
        return ResponseEntity.created(new URI("/api/conditions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /conditions : Updates an existing condition.
     *
     * @param conditionDTO the conditionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated conditionDTO,
     * or with status 400 (Bad Request) if the conditionDTO is not valid,
     * or with status 500 (Internal Server Error) if the conditionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/conditions")
    @Timed
    public ResponseEntity<ConditionDTO> updateCondition(@RequestBody ConditionDTO conditionDTO) throws URISyntaxException {
        log.debug("REST request to update Condition : {}", conditionDTO);
        if (conditionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ConditionDTO result = conditionService.save(conditionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, conditionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /conditions : get all the conditions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of conditions in body
     */
    @GetMapping("/conditions")
    @Timed
    public List<ConditionDTO> getAllConditions() {
        log.debug("REST request to get all Conditions");
        return conditionService.findAll();
    }

    /**
     * GET  /conditions/:id : get the "id" condition.
     *
     * @param id the id of the conditionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the conditionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/conditions/{id}")
    @Timed
    public ResponseEntity<ConditionDTO> getCondition(@PathVariable Long id) {
        log.debug("REST request to get Condition : {}", id);
        Optional<ConditionDTO> conditionDTO = conditionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(conditionDTO);
    }

    /**
     * DELETE  /conditions/:id : delete the "id" condition.
     *
     * @param id the id of the conditionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/conditions/{id}")
    @Timed
    public ResponseEntity<Void> deleteCondition(@PathVariable Long id) {
        log.debug("REST request to delete Condition : {}", id);
        conditionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
