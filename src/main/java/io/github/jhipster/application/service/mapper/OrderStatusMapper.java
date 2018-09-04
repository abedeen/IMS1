package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.OrderStatusDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrderStatus and its DTO OrderStatusDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OrderStatusMapper extends EntityMapper<OrderStatusDTO, OrderStatus> {



    default OrderStatus fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrderStatus orderStatus = new OrderStatus();
        orderStatus.setId(id);
        return orderStatus;
    }
}
