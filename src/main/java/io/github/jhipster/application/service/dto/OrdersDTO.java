package io.github.jhipster.application.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Orders entity.
 */
public class OrdersDTO implements Serializable {

    private Long id;

    private String orderReferenceNumber;

    private String orderDate;

    private String name;

    private String statusId;

    private String notes;

    private Long vendorsId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderReferenceNumber() {
        return orderReferenceNumber;
    }

    public void setOrderReferenceNumber(String orderReferenceNumber) {
        this.orderReferenceNumber = orderReferenceNumber;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatusId() {
        return statusId;
    }

    public void setStatusId(String statusId) {
        this.statusId = statusId;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Long getVendorsId() {
        return vendorsId;
    }

    public void setVendorsId(Long vendorsId) {
        this.vendorsId = vendorsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrdersDTO ordersDTO = (OrdersDTO) o;
        if (ordersDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ordersDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrdersDTO{" +
            "id=" + getId() +
            ", orderReferenceNumber='" + getOrderReferenceNumber() + "'" +
            ", orderDate='" + getOrderDate() + "'" +
            ", name='" + getName() + "'" +
            ", statusId='" + getStatusId() + "'" +
            ", notes='" + getNotes() + "'" +
            ", vendors=" + getVendorsId() +
            "}";
    }
}
