package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.Ims1App;

import io.github.jhipster.application.domain.ProdName;
import io.github.jhipster.application.repository.ProdNameRepository;
import io.github.jhipster.application.service.ProdNameService;
import io.github.jhipster.application.service.dto.ProdNameDTO;
import io.github.jhipster.application.service.mapper.ProdNameMapper;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProdNameResource REST controller.
 *
 * @see ProdNameResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Ims1App.class)
public class ProdNameResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ProdNameRepository prodNameRepository;

    @Autowired
    private ProdNameMapper prodNameMapper;
    
    @Autowired
    private ProdNameService prodNameService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProdNameMockMvc;

    private ProdName prodName;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProdNameResource prodNameResource = new ProdNameResource(prodNameService);
        this.restProdNameMockMvc = MockMvcBuilders.standaloneSetup(prodNameResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProdName createEntity(EntityManager em) {
        ProdName prodName = new ProdName()
            .name(DEFAULT_NAME);
        return prodName;
    }

    @Before
    public void initTest() {
        prodName = createEntity(em);
    }

    @Test
    @Transactional
    public void createProdName() throws Exception {
        int databaseSizeBeforeCreate = prodNameRepository.findAll().size();

        // Create the ProdName
        ProdNameDTO prodNameDTO = prodNameMapper.toDto(prodName);
        restProdNameMockMvc.perform(post("/api/prod-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prodNameDTO)))
            .andExpect(status().isCreated());

        // Validate the ProdName in the database
        List<ProdName> prodNameList = prodNameRepository.findAll();
        assertThat(prodNameList).hasSize(databaseSizeBeforeCreate + 1);
        ProdName testProdName = prodNameList.get(prodNameList.size() - 1);
        assertThat(testProdName.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createProdNameWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prodNameRepository.findAll().size();

        // Create the ProdName with an existing ID
        prodName.setId(1L);
        ProdNameDTO prodNameDTO = prodNameMapper.toDto(prodName);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProdNameMockMvc.perform(post("/api/prod-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prodNameDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProdName in the database
        List<ProdName> prodNameList = prodNameRepository.findAll();
        assertThat(prodNameList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProdNames() throws Exception {
        // Initialize the database
        prodNameRepository.saveAndFlush(prodName);

        // Get all the prodNameList
        restProdNameMockMvc.perform(get("/api/prod-names?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prodName.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getProdName() throws Exception {
        // Initialize the database
        prodNameRepository.saveAndFlush(prodName);

        // Get the prodName
        restProdNameMockMvc.perform(get("/api/prod-names/{id}", prodName.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(prodName.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProdName() throws Exception {
        // Get the prodName
        restProdNameMockMvc.perform(get("/api/prod-names/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProdName() throws Exception {
        // Initialize the database
        prodNameRepository.saveAndFlush(prodName);

        int databaseSizeBeforeUpdate = prodNameRepository.findAll().size();

        // Update the prodName
        ProdName updatedProdName = prodNameRepository.findById(prodName.getId()).get();
        // Disconnect from session so that the updates on updatedProdName are not directly saved in db
        em.detach(updatedProdName);
        updatedProdName
            .name(UPDATED_NAME);
        ProdNameDTO prodNameDTO = prodNameMapper.toDto(updatedProdName);

        restProdNameMockMvc.perform(put("/api/prod-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prodNameDTO)))
            .andExpect(status().isOk());

        // Validate the ProdName in the database
        List<ProdName> prodNameList = prodNameRepository.findAll();
        assertThat(prodNameList).hasSize(databaseSizeBeforeUpdate);
        ProdName testProdName = prodNameList.get(prodNameList.size() - 1);
        assertThat(testProdName.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingProdName() throws Exception {
        int databaseSizeBeforeUpdate = prodNameRepository.findAll().size();

        // Create the ProdName
        ProdNameDTO prodNameDTO = prodNameMapper.toDto(prodName);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProdNameMockMvc.perform(put("/api/prod-names")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prodNameDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProdName in the database
        List<ProdName> prodNameList = prodNameRepository.findAll();
        assertThat(prodNameList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProdName() throws Exception {
        // Initialize the database
        prodNameRepository.saveAndFlush(prodName);

        int databaseSizeBeforeDelete = prodNameRepository.findAll().size();

        // Get the prodName
        restProdNameMockMvc.perform(delete("/api/prod-names/{id}", prodName.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProdName> prodNameList = prodNameRepository.findAll();
        assertThat(prodNameList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProdName.class);
        ProdName prodName1 = new ProdName();
        prodName1.setId(1L);
        ProdName prodName2 = new ProdName();
        prodName2.setId(prodName1.getId());
        assertThat(prodName1).isEqualTo(prodName2);
        prodName2.setId(2L);
        assertThat(prodName1).isNotEqualTo(prodName2);
        prodName1.setId(null);
        assertThat(prodName1).isNotEqualTo(prodName2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProdNameDTO.class);
        ProdNameDTO prodNameDTO1 = new ProdNameDTO();
        prodNameDTO1.setId(1L);
        ProdNameDTO prodNameDTO2 = new ProdNameDTO();
        assertThat(prodNameDTO1).isNotEqualTo(prodNameDTO2);
        prodNameDTO2.setId(prodNameDTO1.getId());
        assertThat(prodNameDTO1).isEqualTo(prodNameDTO2);
        prodNameDTO2.setId(2L);
        assertThat(prodNameDTO1).isNotEqualTo(prodNameDTO2);
        prodNameDTO1.setId(null);
        assertThat(prodNameDTO1).isNotEqualTo(prodNameDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(prodNameMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(prodNameMapper.fromId(null)).isNull();
    }
}
