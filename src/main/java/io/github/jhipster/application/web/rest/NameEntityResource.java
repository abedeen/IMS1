package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.NameEntityService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.service.dto.NameEntityDTO;
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
 * REST controller for managing NameEntity.
 */
@RestController
@RequestMapping("/api")
public class NameEntityResource {

    private final Logger log = LoggerFactory.getLogger(NameEntityResource.class);

    private static final String ENTITY_NAME = "nameEntity";

    private final NameEntityService nameEntityService;

    public NameEntityResource(NameEntityService nameEntityService) {
        this.nameEntityService = nameEntityService;
    }

    /**
     * POST  /name-entities : Create a new nameEntity.
     *
     * @param nameEntityDTO the nameEntityDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nameEntityDTO, or with status 400 (Bad Request) if the nameEntity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/name-entities")
    @Timed
    public ResponseEntity<NameEntityDTO> createNameEntity(@RequestBody NameEntityDTO nameEntityDTO) throws URISyntaxException {
        log.debug("REST request to save NameEntity : {}", nameEntityDTO);
        if (nameEntityDTO.getId() != null) {
            throw new BadRequestAlertException("A new nameEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NameEntityDTO result = nameEntityService.save(nameEntityDTO);
        return ResponseEntity.created(new URI("/api/name-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /name-entities : Updates an existing nameEntity.
     *
     * @param nameEntityDTO the nameEntityDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nameEntityDTO,
     * or with status 400 (Bad Request) if the nameEntityDTO is not valid,
     * or with status 500 (Internal Server Error) if the nameEntityDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/name-entities")
    @Timed
    public ResponseEntity<NameEntityDTO> updateNameEntity(@RequestBody NameEntityDTO nameEntityDTO) throws URISyntaxException {
        log.debug("REST request to update NameEntity : {}", nameEntityDTO);
        if (nameEntityDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NameEntityDTO result = nameEntityService.save(nameEntityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nameEntityDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /name-entities : get all the nameEntities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of nameEntities in body
     */
    @GetMapping("/name-entities")
    @Timed
    public List<NameEntityDTO> getAllNameEntities() {
        log.debug("REST request to get all NameEntities");
        return nameEntityService.findAll();
    }

    /**
     * GET  /name-entities/:id : get the "id" nameEntity.
     *
     * @param id the id of the nameEntityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nameEntityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/name-entities/{id}")
    @Timed
    public ResponseEntity<NameEntityDTO> getNameEntity(@PathVariable Long id) {
        log.debug("REST request to get NameEntity : {}", id);
        Optional<NameEntityDTO> nameEntityDTO = nameEntityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nameEntityDTO);
    }

    /**
     * DELETE  /name-entities/:id : delete the "id" nameEntity.
     *
     * @param id the id of the nameEntityDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/name-entities/{id}")
    @Timed
    public ResponseEntity<Void> deleteNameEntity(@PathVariable Long id) {
        log.debug("REST request to delete NameEntity : {}", id);
        nameEntityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
