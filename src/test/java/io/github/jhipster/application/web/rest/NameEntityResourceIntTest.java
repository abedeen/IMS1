package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.Ims1App;

import io.github.jhipster.application.domain.NameEntity;
import io.github.jhipster.application.repository.NameEntityRepository;
import io.github.jhipster.application.service.NameEntityService;
import io.github.jhipster.application.service.dto.NameEntityDTO;
import io.github.jhipster.application.service.mapper.NameEntityMapper;
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
 * Test class for the NameEntityResource REST controller.
 *
 * @see NameEntityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Ims1App.class)
public class NameEntityResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private NameEntityRepository nameEntityRepository;

    @Autowired
    private NameEntityMapper nameEntityMapper;
    
    @Autowired
    private NameEntityService nameEntityService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNameEntityMockMvc;

    private NameEntity nameEntity;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NameEntityResource nameEntityResource = new NameEntityResource(nameEntityService);
        this.restNameEntityMockMvc = MockMvcBuilders.standaloneSetup(nameEntityResource)
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
    public static NameEntity createEntity(EntityManager em) {
        NameEntity nameEntity = new NameEntity()
            .name(DEFAULT_NAME);
        return nameEntity;
    }

    @Before
    public void initTest() {
        nameEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createNameEntity() throws Exception {
        int databaseSizeBeforeCreate = nameEntityRepository.findAll().size();

        // Create the NameEntity
        NameEntityDTO nameEntityDTO = nameEntityMapper.toDto(nameEntity);
        restNameEntityMockMvc.perform(post("/api/name-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nameEntityDTO)))
            .andExpect(status().isCreated());

        // Validate the NameEntity in the database
        List<NameEntity> nameEntityList = nameEntityRepository.findAll();
        assertThat(nameEntityList).hasSize(databaseSizeBeforeCreate + 1);
        NameEntity testNameEntity = nameEntityList.get(nameEntityList.size() - 1);
        assertThat(testNameEntity.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createNameEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nameEntityRepository.findAll().size();

        // Create the NameEntity with an existing ID
        nameEntity.setId(1L);
        NameEntityDTO nameEntityDTO = nameEntityMapper.toDto(nameEntity);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNameEntityMockMvc.perform(post("/api/name-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nameEntityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the NameEntity in the database
        List<NameEntity> nameEntityList = nameEntityRepository.findAll();
        assertThat(nameEntityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNameEntities() throws Exception {
        // Initialize the database
        nameEntityRepository.saveAndFlush(nameEntity);

        // Get all the nameEntityList
        restNameEntityMockMvc.perform(get("/api/name-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nameEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getNameEntity() throws Exception {
        // Initialize the database
        nameEntityRepository.saveAndFlush(nameEntity);

        // Get the nameEntity
        restNameEntityMockMvc.perform(get("/api/name-entities/{id}", nameEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nameEntity.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNameEntity() throws Exception {
        // Get the nameEntity
        restNameEntityMockMvc.perform(get("/api/name-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNameEntity() throws Exception {
        // Initialize the database
        nameEntityRepository.saveAndFlush(nameEntity);

        int databaseSizeBeforeUpdate = nameEntityRepository.findAll().size();

        // Update the nameEntity
        NameEntity updatedNameEntity = nameEntityRepository.findById(nameEntity.getId()).get();
        // Disconnect from session so that the updates on updatedNameEntity are not directly saved in db
        em.detach(updatedNameEntity);
        updatedNameEntity
            .name(UPDATED_NAME);
        NameEntityDTO nameEntityDTO = nameEntityMapper.toDto(updatedNameEntity);

        restNameEntityMockMvc.perform(put("/api/name-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nameEntityDTO)))
            .andExpect(status().isOk());

        // Validate the NameEntity in the database
        List<NameEntity> nameEntityList = nameEntityRepository.findAll();
        assertThat(nameEntityList).hasSize(databaseSizeBeforeUpdate);
        NameEntity testNameEntity = nameEntityList.get(nameEntityList.size() - 1);
        assertThat(testNameEntity.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingNameEntity() throws Exception {
        int databaseSizeBeforeUpdate = nameEntityRepository.findAll().size();

        // Create the NameEntity
        NameEntityDTO nameEntityDTO = nameEntityMapper.toDto(nameEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNameEntityMockMvc.perform(put("/api/name-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nameEntityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the NameEntity in the database
        List<NameEntity> nameEntityList = nameEntityRepository.findAll();
        assertThat(nameEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNameEntity() throws Exception {
        // Initialize the database
        nameEntityRepository.saveAndFlush(nameEntity);

        int databaseSizeBeforeDelete = nameEntityRepository.findAll().size();

        // Get the nameEntity
        restNameEntityMockMvc.perform(delete("/api/name-entities/{id}", nameEntity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<NameEntity> nameEntityList = nameEntityRepository.findAll();
        assertThat(nameEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NameEntity.class);
        NameEntity nameEntity1 = new NameEntity();
        nameEntity1.setId(1L);
        NameEntity nameEntity2 = new NameEntity();
        nameEntity2.setId(nameEntity1.getId());
        assertThat(nameEntity1).isEqualTo(nameEntity2);
        nameEntity2.setId(2L);
        assertThat(nameEntity1).isNotEqualTo(nameEntity2);
        nameEntity1.setId(null);
        assertThat(nameEntity1).isNotEqualTo(nameEntity2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(NameEntityDTO.class);
        NameEntityDTO nameEntityDTO1 = new NameEntityDTO();
        nameEntityDTO1.setId(1L);
        NameEntityDTO nameEntityDTO2 = new NameEntityDTO();
        assertThat(nameEntityDTO1).isNotEqualTo(nameEntityDTO2);
        nameEntityDTO2.setId(nameEntityDTO1.getId());
        assertThat(nameEntityDTO1).isEqualTo(nameEntityDTO2);
        nameEntityDTO2.setId(2L);
        assertThat(nameEntityDTO1).isNotEqualTo(nameEntityDTO2);
        nameEntityDTO1.setId(null);
        assertThat(nameEntityDTO1).isNotEqualTo(nameEntityDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(nameEntityMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(nameEntityMapper.fromId(null)).isNull();
    }
}
