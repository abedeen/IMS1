package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.OrdersDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Orders and its DTO OrdersDTO.
 */
@Mapper(componentModel = "spring", uses = {VendorsMapper.class})
public interface OrdersMapper extends EntityMapper<OrdersDTO, Orders> {

    @Mapping(source = "vendors.id", target = "vendorsId")
    OrdersDTO toDto(Orders orders);

    @Mapping(source = "vendorsId", target = "vendors")
    Orders toEntity(OrdersDTO ordersDTO);

    default Orders fromId(Long id) {
        if (id == null) {
            return null;
        }
        Orders orders = new Orders();
        orders.setId(id);
        return orders;
    }
}
