package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.Ims1App;

import io.github.jhipster.application.domain.Tenant;
import io.github.jhipster.application.repository.TenantRepository;
import io.github.jhipster.application.service.TenantService;
import io.github.jhipster.application.service.dto.TenantDTO;
import io.github.jhipster.application.service.mapper.TenantMapper;
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
 * Test class for the TenantResource REST controller.
 *
 * @see TenantResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Ims1App.class)
public class TenantResourceIntTest {

    private static final String DEFAULT_COMPANY = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DEPARTMENT = "AAAAAAAAAA";
    private static final String UPDATED_DEPARTMENT = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_LOGO_URL = "AAAAAAAAAA";
    private static final String UPDATED_LOGO_URL = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private TenantMapper tenantMapper;
    
    @Autowired
    private TenantService tenantService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTenantMockMvc;

    private Tenant tenant;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TenantResource tenantResource = new TenantResource(tenantService);
        this.restTenantMockMvc = MockMvcBuilders.standaloneSetup(tenantResource)
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
    public static Tenant createEntity(EntityManager em) {
        Tenant tenant = new Tenant()
            .company(DEFAULT_COMPANY)
            .contactEmail(DEFAULT_CONTACT_EMAIL)
            .contactName(DEFAULT_CONTACT_NAME)
            .contactPhone(DEFAULT_CONTACT_PHONE)
            .contactTitle(DEFAULT_CONTACT_TITLE)
            .department(DEFAULT_DEPARTMENT)
            .email(DEFAULT_EMAIL)
            .logoURL(DEFAULT_LOGO_URL)
            .name(DEFAULT_NAME);
        return tenant;
    }

    @Before
    public void initTest() {
        tenant = createEntity(em);
    }

    @Test
    @Transactional
    public void createTenant() throws Exception {
        int databaseSizeBeforeCreate = tenantRepository.findAll().size();

        // Create the Tenant
        TenantDTO tenantDTO = tenantMapper.toDto(tenant);
        restTenantMockMvc.perform(post("/api/tenants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tenantDTO)))
            .andExpect(status().isCreated());

        // Validate the Tenant in the database
        List<Tenant> tenantList = tenantRepository.findAll();
        assertThat(tenantList).hasSize(databaseSizeBeforeCreate + 1);
        Tenant testTenant = tenantList.get(tenantList.size() - 1);
        assertThat(testTenant.getCompany()).isEqualTo(DEFAULT_COMPANY);
        assertThat(testTenant.getContactEmail()).isEqualTo(DEFAULT_CONTACT_EMAIL);
        assertThat(testTenant.getContactName()).isEqualTo(DEFAULT_CONTACT_NAME);
        assertThat(testTenant.getContactPhone()).isEqualTo(DEFAULT_CONTACT_PHONE);
        assertThat(testTenant.getContactTitle()).isEqualTo(DEFAULT_CONTACT_TITLE);
        assertThat(testTenant.getDepartment()).isEqualTo(DEFAULT_DEPARTMENT);
        assertThat(testTenant.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testTenant.getLogoURL()).isEqualTo(DEFAULT_LOGO_URL);
        assertThat(testTenant.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createTenantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tenantRepository.findAll().size();

        // Create the Tenant with an existing ID
        tenant.setId(1L);
        TenantDTO tenantDTO = tenantMapper.toDto(tenant);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTenantMockMvc.perform(post("/api/tenants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tenantDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Tenant in the database
        List<Tenant> tenantList = tenantRepository.findAll();
        assertThat(tenantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTenants() throws Exception {
        // Initialize the database
        tenantRepository.saveAndFlush(tenant);

        // Get all the tenantList
        restTenantMockMvc.perform(get("/api/tenants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tenant.getId().intValue())))
            .andExpect(jsonPath("$.[*].company").value(hasItem(DEFAULT_COMPANY.toString())))
            .andExpect(jsonPath("$.[*].contactEmail").value(hasItem(DEFAULT_CONTACT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].contactName").value(hasItem(DEFAULT_CONTACT_NAME.toString())))
            .andExpect(jsonPath("$.[*].contactPhone").value(hasItem(DEFAULT_CONTACT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].contactTitle").value(hasItem(DEFAULT_CONTACT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].department").value(hasItem(DEFAULT_DEPARTMENT.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].logoURL").value(hasItem(DEFAULT_LOGO_URL.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getTenant() throws Exception {
        // Initialize the database
        tenantRepository.saveAndFlush(tenant);

        // Get the tenant
        restTenantMockMvc.perform(get("/api/tenants/{id}", tenant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tenant.getId().intValue()))
            .andExpect(jsonPath("$.company").value(DEFAULT_COMPANY.toString()))
            .andExpect(jsonPath("$.contactEmail").value(DEFAULT_CONTACT_EMAIL.toString()))
            .andExpect(jsonPath("$.contactName").value(DEFAULT_CONTACT_NAME.toString()))
            .andExpect(jsonPath("$.contactPhone").value(DEFAULT_CONTACT_PHONE.toString()))
            .andExpect(jsonPath("$.contactTitle").value(DEFAULT_CONTACT_TITLE.toString()))
            .andExpect(jsonPath("$.department").value(DEFAULT_DEPARTMENT.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.logoURL").value(DEFAULT_LOGO_URL.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTenant() throws Exception {
        // Get the tenant
        restTenantMockMvc.perform(get("/api/tenants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTenant() throws Exception {
        // Initialize the database
        tenantRepository.saveAndFlush(tenant);

        int databaseSizeBeforeUpdate = tenantRepository.findAll().size();

        // Update the tenant
        Tenant updatedTenant = tenantRepository.findById(tenant.getId()).get();
        // Disconnect from session so that the updates on updatedTenant are not directly saved in db
        em.detach(updatedTenant);
        updatedTenant
            .company(UPDATED_COMPANY)
            .contactEmail(UPDATED_CONTACT_EMAIL)
            .contactName(UPDATED_CONTACT_NAME)
            .contactPhone(UPDATED_CONTACT_PHONE)
            .contactTitle(UPDATED_CONTACT_TITLE)
            .department(UPDATED_DEPARTMENT)
            .email(UPDATED_EMAIL)
            .logoURL(UPDATED_LOGO_URL)
            .name(UPDATED_NAME);
        TenantDTO tenantDTO = tenantMapper.toDto(updatedTenant);

        restTenantMockMvc.perform(put("/api/tenants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tenantDTO)))
            .andExpect(status().isOk());

        // Validate the Tenant in the database
        List<Tenant> tenantList = tenantRepository.findAll();
        assertThat(tenantList).hasSize(databaseSizeBeforeUpdate);
        Tenant testTenant = tenantList.get(tenantList.size() - 1);
        assertThat(testTenant.getCompany()).isEqualTo(UPDATED_COMPANY);
        assertThat(testTenant.getContactEmail()).isEqualTo(UPDATED_CONTACT_EMAIL);
        assertThat(testTenant.getContactName()).isEqualTo(UPDATED_CONTACT_NAME);
        assertThat(testTenant.getContactPhone()).isEqualTo(UPDATED_CONTACT_PHONE);
        assertThat(testTenant.getContactTitle()).isEqualTo(UPDATED_CONTACT_TITLE);
        assertThat(testTenant.getDepartment()).isEqualTo(UPDATED_DEPARTMENT);
        assertThat(testTenant.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testTenant.getLogoURL()).isEqualTo(UPDATED_LOGO_URL);
        assertThat(testTenant.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingTenant() throws Exception {
        int databaseSizeBeforeUpdate = tenantRepository.findAll().size();

        // Create the Tenant
        TenantDTO tenantDTO = tenantMapper.toDto(tenant);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTenantMockMvc.perform(put("/api/tenants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tenantDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Tenant in the database
        List<Tenant> tenantList = tenantRepository.findAll();
        assertThat(tenantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTenant() throws Exception {
        // Initialize the database
        tenantRepository.saveAndFlush(tenant);

        int databaseSizeBeforeDelete = tenantRepository.findAll().size();

        // Get the tenant
        restTenantMockMvc.perform(delete("/api/tenants/{id}", tenant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Tenant> tenantList = tenantRepository.findAll();
        assertThat(tenantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tenant.class);
        Tenant tenant1 = new Tenant();
        tenant1.setId(1L);
        Tenant tenant2 = new Tenant();
        tenant2.setId(tenant1.getId());
        assertThat(tenant1).isEqualTo(tenant2);
        tenant2.setId(2L);
        assertThat(tenant1).isNotEqualTo(tenant2);
        tenant1.setId(null);
        assertThat(tenant1).isNotEqualTo(tenant2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TenantDTO.class);
        TenantDTO tenantDTO1 = new TenantDTO();
        tenantDTO1.setId(1L);
        TenantDTO tenantDTO2 = new TenantDTO();
        assertThat(tenantDTO1).isNotEqualTo(tenantDTO2);
        tenantDTO2.setId(tenantDTO1.getId());
        assertThat(tenantDTO1).isEqualTo(tenantDTO2);
        tenantDTO2.setId(2L);
        assertThat(tenantDTO1).isNotEqualTo(tenantDTO2);
        tenantDTO1.setId(null);
        assertThat(tenantDTO1).isNotEqualTo(tenantDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(tenantMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(tenantMapper.fromId(null)).isNull();
    }
}
