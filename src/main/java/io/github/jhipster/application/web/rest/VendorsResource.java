package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.VendorsService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.service.dto.VendorsDTO;
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
 * REST controller for managing Vendors.
 */
@RestController
@RequestMapping("/api")
public class VendorsResource {

    private final Logger log = LoggerFactory.getLogger(VendorsResource.class);

    private static final String ENTITY_NAME = "vendors";

    private final VendorsService vendorsService;

    public VendorsResource(VendorsService vendorsService) {
        this.vendorsService = vendorsService;
    }

    /**
     * POST  /vendors : Create a new vendors.
     *
     * @param vendorsDTO the vendorsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vendorsDTO, or with status 400 (Bad Request) if the vendors has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vendors")
    @Timed
    public ResponseEntity<VendorsDTO> createVendors(@RequestBody VendorsDTO vendorsDTO) throws URISyntaxException {
        log.debug("REST request to save Vendors : {}", vendorsDTO);
        if (vendorsDTO.getId() != null) {
            throw new BadRequestAlertException("A new vendors cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VendorsDTO result = vendorsService.save(vendorsDTO);
        return ResponseEntity.created(new URI("/api/vendors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vendors : Updates an existing vendors.
     *
     * @param vendorsDTO the vendorsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vendorsDTO,
     * or with status 400 (Bad Request) if the vendorsDTO is not valid,
     * or with status 500 (Internal Server Error) if the vendorsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vendors")
    @Timed
    public ResponseEntity<VendorsDTO> updateVendors(@RequestBody VendorsDTO vendorsDTO) throws URISyntaxException {
        log.debug("REST request to update Vendors : {}", vendorsDTO);
        if (vendorsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VendorsDTO result = vendorsService.save(vendorsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vendorsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vendors : get all the vendors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vendors in body
     */
    @GetMapping("/vendors")
    @Timed
    public List<VendorsDTO> getAllVendors() {
        log.debug("REST request to get all Vendors");
        return vendorsService.findAll();
    }

    /**
     * GET  /vendors/:id : get the "id" vendors.
     *
     * @param id the id of the vendorsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vendorsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/vendors/{id}")
    @Timed
    public ResponseEntity<VendorsDTO> getVendors(@PathVariable Long id) {
        log.debug("REST request to get Vendors : {}", id);
        Optional<VendorsDTO> vendorsDTO = vendorsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(vendorsDTO);
    }

    /**
     * DELETE  /vendors/:id : delete the "id" vendors.
     *
     * @param id the id of the vendorsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vendors/{id}")
    @Timed
    public ResponseEntity<Void> deleteVendors(@PathVariable Long id) {
        log.debug("REST request to delete Vendors : {}", id);
        vendorsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
