package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.Ims1App;

import io.github.jhipster.application.domain.OrderItems;
import io.github.jhipster.application.repository.OrderItemsRepository;
import io.github.jhipster.application.service.OrderItemsService;
import io.github.jhipster.application.service.dto.OrderItemsDTO;
import io.github.jhipster.application.service.mapper.OrderItemsMapper;
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
 * Test class for the OrderItemsResource REST controller.
 *
 * @see OrderItemsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Ims1App.class)
public class OrderItemsResourceIntTest {

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    private static final String DEFAULT_CONDITION = "AAAAAAAAAA";
    private static final String UPDATED_CONDITION = "BBBBBBBBBB";

    private static final String DEFAULT_PRICE = "AAAAAAAAAA";
    private static final String UPDATED_PRICE = "BBBBBBBBBB";

    private static final String DEFAULT_QUANTITY = "AAAAAAAAAA";
    private static final String UPDATED_QUANTITY = "BBBBBBBBBB";

    private static final String DEFAULT_VENDOR = "AAAAAAAAAA";
    private static final String UPDATED_VENDOR = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_RECEIVE_DATE = "AAAAAAAAAA";
    private static final String UPDATED_RECEIVE_DATE = "BBBBBBBBBB";

    private static final Long DEFAULT_TOTAL_SPENDING = 1L;
    private static final Long UPDATED_TOTAL_SPENDING = 2L;

    private static final String DEFAULT_CURRENCY = "AAAAAAAAAA";
    private static final String UPDATED_CURRENCY = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS_ID = "AAAAAAAAAA";
    private static final String UPDATED_STATUS_ID = "BBBBBBBBBB";

    private static final Long DEFAULT_QUANTITY_IN = 1L;
    private static final Long UPDATED_QUANTITY_IN = 2L;

    private static final Long DEFAULT_QUANTITY_OUT = 1L;
    private static final Long UPDATED_QUANTITY_OUT = 2L;

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private OrderItemsMapper orderItemsMapper;
    
    @Autowired
    private OrderItemsService orderItemsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrderItemsMockMvc;

    private OrderItems orderItems;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderItemsResource orderItemsResource = new OrderItemsResource(orderItemsService);
        this.restOrderItemsMockMvc = MockMvcBuilders.standaloneSetup(orderItemsResource)
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
    public static OrderItems createEntity(EntityManager em) {
        OrderItems orderItems = new OrderItems()
            .category(DEFAULT_CATEGORY)
            .condition(DEFAULT_CONDITION)
            .price(DEFAULT_PRICE)
            .quantity(DEFAULT_QUANTITY)
            .vendor(DEFAULT_VENDOR)
            .status(DEFAULT_STATUS)
            .receiveDate(DEFAULT_RECEIVE_DATE)
            .totalSpending(DEFAULT_TOTAL_SPENDING)
            .currency(DEFAULT_CURRENCY)
            .statusId(DEFAULT_STATUS_ID)
            .quantityIn(DEFAULT_QUANTITY_IN)
            .quantityOut(DEFAULT_QUANTITY_OUT)
            .notes(DEFAULT_NOTES);
        return orderItems;
    }

    @Before
    public void initTest() {
        orderItems = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderItems() throws Exception {
        int databaseSizeBeforeCreate = orderItemsRepository.findAll().size();

        // Create the OrderItems
        OrderItemsDTO orderItemsDTO = orderItemsMapper.toDto(orderItems);
        restOrderItemsMockMvc.perform(post("/api/order-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderItemsDTO)))
            .andExpect(status().isCreated());

        // Validate the OrderItems in the database
        List<OrderItems> orderItemsList = orderItemsRepository.findAll();
        assertThat(orderItemsList).hasSize(databaseSizeBeforeCreate + 1);
        OrderItems testOrderItems = orderItemsList.get(orderItemsList.size() - 1);
        assertThat(testOrderItems.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testOrderItems.getCondition()).isEqualTo(DEFAULT_CONDITION);
        assertThat(testOrderItems.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testOrderItems.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testOrderItems.getVendor()).isEqualTo(DEFAULT_VENDOR);
        assertThat(testOrderItems.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testOrderItems.getReceiveDate()).isEqualTo(DEFAULT_RECEIVE_DATE);
        assertThat(testOrderItems.getTotalSpending()).isEqualTo(DEFAULT_TOTAL_SPENDING);
        assertThat(testOrderItems.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
        assertThat(testOrderItems.getStatusId()).isEqualTo(DEFAULT_STATUS_ID);
        assertThat(testOrderItems.getQuantityIn()).isEqualTo(DEFAULT_QUANTITY_IN);
        assertThat(testOrderItems.getQuantityOut()).isEqualTo(DEFAULT_QUANTITY_OUT);
        assertThat(testOrderItems.getNotes()).isEqualTo(DEFAULT_NOTES);
    }

    @Test
    @Transactional
    public void createOrderItemsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderItemsRepository.findAll().size();

        // Create the OrderItems with an existing ID
        orderItems.setId(1L);
        OrderItemsDTO orderItemsDTO = orderItemsMapper.toDto(orderItems);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderItemsMockMvc.perform(post("/api/order-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderItemsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OrderItems in the database
        List<OrderItems> orderItemsList = orderItemsRepository.findAll();
        assertThat(orderItemsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOrderItems() throws Exception {
        // Initialize the database
        orderItemsRepository.saveAndFlush(orderItems);

        // Get all the orderItemsList
        restOrderItemsMockMvc.perform(get("/api/order-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderItems.getId().intValue())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].condition").value(hasItem(DEFAULT_CONDITION.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.toString())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.toString())))
            .andExpect(jsonPath("$.[*].vendor").value(hasItem(DEFAULT_VENDOR.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].receiveDate").value(hasItem(DEFAULT_RECEIVE_DATE.toString())))
            .andExpect(jsonPath("$.[*].totalSpending").value(hasItem(DEFAULT_TOTAL_SPENDING.intValue())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY.toString())))
            .andExpect(jsonPath("$.[*].statusId").value(hasItem(DEFAULT_STATUS_ID.toString())))
            .andExpect(jsonPath("$.[*].quantityIn").value(hasItem(DEFAULT_QUANTITY_IN.intValue())))
            .andExpect(jsonPath("$.[*].quantityOut").value(hasItem(DEFAULT_QUANTITY_OUT.intValue())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())));
    }
    
    @Test
    @Transactional
    public void getOrderItems() throws Exception {
        // Initialize the database
        orderItemsRepository.saveAndFlush(orderItems);

        // Get the orderItems
        restOrderItemsMockMvc.perform(get("/api/order-items/{id}", orderItems.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderItems.getId().intValue()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.condition").value(DEFAULT_CONDITION.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.toString()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.toString()))
            .andExpect(jsonPath("$.vendor").value(DEFAULT_VENDOR.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.receiveDate").value(DEFAULT_RECEIVE_DATE.toString()))
            .andExpect(jsonPath("$.totalSpending").value(DEFAULT_TOTAL_SPENDING.intValue()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY.toString()))
            .andExpect(jsonPath("$.statusId").value(DEFAULT_STATUS_ID.toString()))
            .andExpect(jsonPath("$.quantityIn").value(DEFAULT_QUANTITY_IN.intValue()))
            .andExpect(jsonPath("$.quantityOut").value(DEFAULT_QUANTITY_OUT.intValue()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrderItems() throws Exception {
        // Get the orderItems
        restOrderItemsMockMvc.perform(get("/api/order-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderItems() throws Exception {
        // Initialize the database
        orderItemsRepository.saveAndFlush(orderItems);

        int databaseSizeBeforeUpdate = orderItemsRepository.findAll().size();

        // Update the orderItems
        OrderItems updatedOrderItems = orderItemsRepository.findById(orderItems.getId()).get();
        // Disconnect from session so that the updates on updatedOrderItems are not directly saved in db
        em.detach(updatedOrderItems);
        updatedOrderItems
            .category(UPDATED_CATEGORY)
            .condition(UPDATED_CONDITION)
            .price(UPDATED_PRICE)
            .quantity(UPDATED_QUANTITY)
            .vendor(UPDATED_VENDOR)
            .status(UPDATED_STATUS)
            .receiveDate(UPDATED_RECEIVE_DATE)
            .totalSpending(UPDATED_TOTAL_SPENDING)
            .currency(UPDATED_CURRENCY)
            .statusId(UPDATED_STATUS_ID)
            .quantityIn(UPDATED_QUANTITY_IN)
            .quantityOut(UPDATED_QUANTITY_OUT)
            .notes(UPDATED_NOTES);
        OrderItemsDTO orderItemsDTO = orderItemsMapper.toDto(updatedOrderItems);

        restOrderItemsMockMvc.perform(put("/api/order-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderItemsDTO)))
            .andExpect(status().isOk());

        // Validate the OrderItems in the database
        List<OrderItems> orderItemsList = orderItemsRepository.findAll();
        assertThat(orderItemsList).hasSize(databaseSizeBeforeUpdate);
        OrderItems testOrderItems = orderItemsList.get(orderItemsList.size() - 1);
        assertThat(testOrderItems.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testOrderItems.getCondition()).isEqualTo(UPDATED_CONDITION);
        assertThat(testOrderItems.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testOrderItems.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testOrderItems.getVendor()).isEqualTo(UPDATED_VENDOR);
        assertThat(testOrderItems.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testOrderItems.getReceiveDate()).isEqualTo(UPDATED_RECEIVE_DATE);
        assertThat(testOrderItems.getTotalSpending()).isEqualTo(UPDATED_TOTAL_SPENDING);
        assertThat(testOrderItems.getCurrency()).isEqualTo(UPDATED_CURRENCY);
        assertThat(testOrderItems.getStatusId()).isEqualTo(UPDATED_STATUS_ID);
        assertThat(testOrderItems.getQuantityIn()).isEqualTo(UPDATED_QUANTITY_IN);
        assertThat(testOrderItems.getQuantityOut()).isEqualTo(UPDATED_QUANTITY_OUT);
        assertThat(testOrderItems.getNotes()).isEqualTo(UPDATED_NOTES);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderItems() throws Exception {
        int databaseSizeBeforeUpdate = orderItemsRepository.findAll().size();

        // Create the OrderItems
        OrderItemsDTO orderItemsDTO = orderItemsMapper.toDto(orderItems);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrderItemsMockMvc.perform(put("/api/order-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderItemsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OrderItems in the database
        List<OrderItems> orderItemsList = orderItemsRepository.findAll();
        assertThat(orderItemsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrderItems() throws Exception {
        // Initialize the database
        orderItemsRepository.saveAndFlush(orderItems);

        int databaseSizeBeforeDelete = orderItemsRepository.findAll().size();

        // Get the orderItems
        restOrderItemsMockMvc.perform(delete("/api/order-items/{id}", orderItems.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderItems> orderItemsList = orderItemsRepository.findAll();
        assertThat(orderItemsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderItems.class);
        OrderItems orderItems1 = new OrderItems();
        orderItems1.setId(1L);
        OrderItems orderItems2 = new OrderItems();
        orderItems2.setId(orderItems1.getId());
        assertThat(orderItems1).isEqualTo(orderItems2);
        orderItems2.setId(2L);
        assertThat(orderItems1).isNotEqualTo(orderItems2);
        orderItems1.setId(null);
        assertThat(orderItems1).isNotEqualTo(orderItems2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderItemsDTO.class);
        OrderItemsDTO orderItemsDTO1 = new OrderItemsDTO();
        orderItemsDTO1.setId(1L);
        OrderItemsDTO orderItemsDTO2 = new OrderItemsDTO();
        assertThat(orderItemsDTO1).isNotEqualTo(orderItemsDTO2);
        orderItemsDTO2.setId(orderItemsDTO1.getId());
        assertThat(orderItemsDTO1).isEqualTo(orderItemsDTO2);
        orderItemsDTO2.setId(2L);
        assertThat(orderItemsDTO1).isNotEqualTo(orderItemsDTO2);
        orderItemsDTO1.setId(null);
        assertThat(orderItemsDTO1).isNotEqualTo(orderItemsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(orderItemsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(orderItemsMapper.fromId(null)).isNull();
    }
}
