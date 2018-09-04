package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.OrderItemsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrderItems and its DTO OrderItemsDTO.
 */
@Mapper(componentModel = "spring", uses = {OrderStatusMapper.class, CategoryMapper.class, ConditionMapper.class, ProdNameMapper.class, OrdersMapper.class, StockMapper.class})
public interface OrderItemsMapper extends EntityMapper<OrderItemsDTO, OrderItems> {

    @Mapping(source = "status.id", target = "statusId")
    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "condition.id", target = "conditionId")
    @Mapping(source = "names.id", target = "namesId")
    @Mapping(source = "orderItems.id", target = "orderItemsId")
    @Mapping(source = "users.id", target = "usersId")
    OrderItemsDTO toDto(OrderItems orderItems);

    @Mapping(source = "statusId", target = "status")
    @Mapping(source = "categoryId", target = "category")
    @Mapping(source = "conditionId", target = "condition")
    @Mapping(source = "namesId", target = "names")
    @Mapping(source = "orderItemsId", target = "orderItems")
    @Mapping(source = "usersId", target = "users")
    OrderItems toEntity(OrderItemsDTO orderItemsDTO);

    default OrderItems fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrderItems orderItems = new OrderItems();
        orderItems.setId(id);
        return orderItems;
    }
}
