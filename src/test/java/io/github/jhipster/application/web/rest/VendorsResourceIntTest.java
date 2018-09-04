package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.Ims1App;

import io.github.jhipster.application.domain.Vendors;
import io.github.jhipster.application.repository.VendorsRepository;
import io.github.jhipster.application.service.VendorsService;
import io.github.jhipster.application.service.dto.VendorsDTO;
import io.github.jhipster.application.service.mapper.VendorsMapper;
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
 * Test class for the VendorsResource REST controller.
 *
 * @see VendorsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Ims1App.class)
public class VendorsResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_PERSON = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_PERSON = "BBBBBBBBBB";

    @Autowired
    private VendorsRepository vendorsRepository;

    @Autowired
    private VendorsMapper vendorsMapper;
    
    @Autowired
    private VendorsService vendorsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVendorsMockMvc;

    private Vendors vendors;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VendorsResource vendorsResource = new VendorsResource(vendorsService);
        this.restVendorsMockMvc = MockMvcBuilders.standaloneSetup(vendorsResource)
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
    public static Vendors createEntity(EntityManager em) {
        Vendors vendors = new Vendors()
            .name(DEFAULT_NAME)
            .url(DEFAULT_URL)
            .address(DEFAULT_ADDRESS)
            .contactPerson(DEFAULT_CONTACT_PERSON);
        return vendors;
    }

    @Before
    public void initTest() {
        vendors = createEntity(em);
    }

    @Test
    @Transactional
    public void createVendors() throws Exception {
        int databaseSizeBeforeCreate = vendorsRepository.findAll().size();

        // Create the Vendors
        VendorsDTO vendorsDTO = vendorsMapper.toDto(vendors);
        restVendorsMockMvc.perform(post("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorsDTO)))
            .andExpect(status().isCreated());

        // Validate the Vendors in the database
        List<Vendors> vendorsList = vendorsRepository.findAll();
        assertThat(vendorsList).hasSize(databaseSizeBeforeCreate + 1);
        Vendors testVendors = vendorsList.get(vendorsList.size() - 1);
        assertThat(testVendors.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testVendors.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testVendors.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testVendors.getContactPerson()).isEqualTo(DEFAULT_CONTACT_PERSON);
    }

    @Test
    @Transactional
    public void createVendorsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vendorsRepository.findAll().size();

        // Create the Vendors with an existing ID
        vendors.setId(1L);
        VendorsDTO vendorsDTO = vendorsMapper.toDto(vendors);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVendorsMockMvc.perform(post("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Vendors in the database
        List<Vendors> vendorsList = vendorsRepository.findAll();
        assertThat(vendorsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVendors() throws Exception {
        // Initialize the database
        vendorsRepository.saveAndFlush(vendors);

        // Get all the vendorsList
        restVendorsMockMvc.perform(get("/api/vendors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vendors.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].contactPerson").value(hasItem(DEFAULT_CONTACT_PERSON.toString())));
    }
    
    @Test
    @Transactional
    public void getVendors() throws Exception {
        // Initialize the database
        vendorsRepository.saveAndFlush(vendors);

        // Get the vendors
        restVendorsMockMvc.perform(get("/api/vendors/{id}", vendors.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vendors.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.contactPerson").value(DEFAULT_CONTACT_PERSON.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVendors() throws Exception {
        // Get the vendors
        restVendorsMockMvc.perform(get("/api/vendors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVendors() throws Exception {
        // Initialize the database
        vendorsRepository.saveAndFlush(vendors);

        int databaseSizeBeforeUpdate = vendorsRepository.findAll().size();

        // Update the vendors
        Vendors updatedVendors = vendorsRepository.findById(vendors.getId()).get();
        // Disconnect from session so that the updates on updatedVendors are not directly saved in db
        em.detach(updatedVendors);
        updatedVendors
            .name(UPDATED_NAME)
            .url(UPDATED_URL)
            .address(UPDATED_ADDRESS)
            .contactPerson(UPDATED_CONTACT_PERSON);
        VendorsDTO vendorsDTO = vendorsMapper.toDto(updatedVendors);

        restVendorsMockMvc.perform(put("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorsDTO)))
            .andExpect(status().isOk());

        // Validate the Vendors in the database
        List<Vendors> vendorsList = vendorsRepository.findAll();
        assertThat(vendorsList).hasSize(databaseSizeBeforeUpdate);
        Vendors testVendors = vendorsList.get(vendorsList.size() - 1);
        assertThat(testVendors.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testVendors.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testVendors.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testVendors.getContactPerson()).isEqualTo(UPDATED_CONTACT_PERSON);
    }

    @Test
    @Transactional
    public void updateNonExistingVendors() throws Exception {
        int databaseSizeBeforeUpdate = vendorsRepository.findAll().size();

        // Create the Vendors
        VendorsDTO vendorsDTO = vendorsMapper.toDto(vendors);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVendorsMockMvc.perform(put("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Vendors in the database
        List<Vendors> vendorsList = vendorsRepository.findAll();
        assertThat(vendorsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVendors() throws Exception {
        // Initialize the database
        vendorsRepository.saveAndFlush(vendors);

        int databaseSizeBeforeDelete = vendorsRepository.findAll().size();

        // Get the vendors
        restVendorsMockMvc.perform(delete("/api/vendors/{id}", vendors.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Vendors> vendorsList = vendorsRepository.findAll();
        assertThat(vendorsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vendors.class);
        Vendors vendors1 = new Vendors();
        vendors1.setId(1L);
        Vendors vendors2 = new Vendors();
        vendors2.setId(vendors1.getId());
        assertThat(vendors1).isEqualTo(vendors2);
        vendors2.setId(2L);
        assertThat(vendors1).isNotEqualTo(vendors2);
        vendors1.setId(null);
        assertThat(vendors1).isNotEqualTo(vendors2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VendorsDTO.class);
        VendorsDTO vendorsDTO1 = new VendorsDTO();
        vendorsDTO1.setId(1L);
        VendorsDTO vendorsDTO2 = new VendorsDTO();
        assertThat(vendorsDTO1).isNotEqualTo(vendorsDTO2);
        vendorsDTO2.setId(vendorsDTO1.getId());
        assertThat(vendorsDTO1).isEqualTo(vendorsDTO2);
        vendorsDTO2.setId(2L);
        assertThat(vendorsDTO1).isNotEqualTo(vendorsDTO2);
        vendorsDTO1.setId(null);
        assertThat(vendorsDTO1).isNotEqualTo(vendorsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(vendorsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(vendorsMapper.fromId(null)).isNull();
    }
}
