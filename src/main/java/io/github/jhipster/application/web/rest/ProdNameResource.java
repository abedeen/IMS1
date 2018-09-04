package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.ProdNameService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.service.dto.ProdNameDTO;
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
 * REST controller for managing ProdName.
 */
@RestController
@RequestMapping("/api")
public class ProdNameResource {

    private final Logger log = LoggerFactory.getLogger(ProdNameResource.class);

    private static final String ENTITY_NAME = "prodName";

    private final ProdNameService prodNameService;

    public ProdNameResource(ProdNameService prodNameService) {
        this.prodNameService = prodNameService;
    }

    /**
     * POST  /prod-names : Create a new prodName.
     *
     * @param prodNameDTO the prodNameDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new prodNameDTO, or with status 400 (Bad Request) if the prodName has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/prod-names")
    @Timed
    public ResponseEntity<ProdNameDTO> createProdName(@RequestBody ProdNameDTO prodNameDTO) throws URISyntaxException {
        log.debug("REST request to save ProdName : {}", prodNameDTO);
        if (prodNameDTO.getId() != null) {
            throw new BadRequestAlertException("A new prodName cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProdNameDTO result = prodNameService.save(prodNameDTO);
        return ResponseEntity.created(new URI("/api/prod-names/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /prod-names : Updates an existing prodName.
     *
     * @param prodNameDTO the prodNameDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated prodNameDTO,
     * or with status 400 (Bad Request) if the prodNameDTO is not valid,
     * or with status 500 (Internal Server Error) if the prodNameDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/prod-names")
    @Timed
    public ResponseEntity<ProdNameDTO> updateProdName(@RequestBody ProdNameDTO prodNameDTO) throws URISyntaxException {
        log.debug("REST request to update ProdName : {}", prodNameDTO);
        if (prodNameDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProdNameDTO result = prodNameService.save(prodNameDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, prodNameDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /prod-names : get all the prodNames.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of prodNames in body
     */
    @GetMapping("/prod-names")
    @Timed
    public List<ProdNameDTO> getAllProdNames() {
        log.debug("REST request to get all ProdNames");
        return prodNameService.findAll();
    }

    /**
     * GET  /prod-names/:id : get the "id" prodName.
     *
     * @param id the id of the prodNameDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the prodNameDTO, or with status 404 (Not Found)
     */
    @GetMapping("/prod-names/{id}")
    @Timed
    public ResponseEntity<ProdNameDTO> getProdName(@PathVariable Long id) {
        log.debug("REST request to get ProdName : {}", id);
        Optional<ProdNameDTO> prodNameDTO = prodNameService.findOne(id);
        return ResponseUtil.wrapOrNotFound(prodNameDTO);
    }

    /**
     * DELETE  /prod-names/:id : delete the "id" prodName.
     *
     * @param id the id of the prodNameDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/prod-names/{id}")
    @Timed
    public ResponseEntity<Void> deleteProdName(@PathVariable Long id) {
        log.debug("REST request to delete ProdName : {}", id);
        prodNameService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
