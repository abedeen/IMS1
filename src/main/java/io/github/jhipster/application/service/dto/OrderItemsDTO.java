package io.github.jhipster.application.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the OrderItems entity.
 */
public class OrderItemsDTO implements Serializable {

    private Long id;

    private String category;

    private String condition;

    private String price;

    private String quantity;

    private String vendor;

    private String status;

    private String receiveDate;

    private Long totalSpending;

    private String currency;

    private String statusId;

    private Long quantityIn;

    private Long quantityOut;

    private String notes;

    private Long statusId;

    private Long categoryId;

    private Long conditionId;

    private Long namesId;

    private Long ordersId;

    private Long usersId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReceiveDate() {
        return receiveDate;
    }

    public void setReceiveDate(String receiveDate) {
        this.receiveDate = receiveDate;
    }

    public Long getTotalSpending() {
        return totalSpending;
    }

    public void setTotalSpending(Long totalSpending) {
        this.totalSpending = totalSpending;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getStatusId() {
        return statusId;
    }

    public void setStatusId(String statusId) {
        this.statusId = statusId;
    }

    public Long getQuantityIn() {
        return quantityIn;
    }

    public void setQuantityIn(Long quantityIn) {
        this.quantityIn = quantityIn;
    }

    public Long getQuantityOut() {
        return quantityOut;
    }

    public void setQuantityOut(Long quantityOut) {
        this.quantityOut = quantityOut;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Long getStatusId() {
        return statusId;
    }

    public void setStatusId(Long orderStatusId) {
        this.statusId = orderStatusId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getConditionId() {
        return conditionId;
    }

    public void setConditionId(Long conditionId) {
        this.conditionId = conditionId;
    }

    public Long getNamesId() {
        return namesId;
    }

    public void setNamesId(Long nameEntityId) {
        this.namesId = nameEntityId;
    }

    public Long getOrdersId() {
        return ordersId;
    }

    public void setOrdersId(Long ordersId) {
        this.ordersId = ordersId;
    }

    public Long getUsersId() {
        return usersId;
    }

    public void setUsersId(Long stockId) {
        this.usersId = stockId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrderItemsDTO orderItemsDTO = (OrderItemsDTO) o;
        if (orderItemsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderItemsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderItemsDTO{" +
            "id=" + getId() +
            ", category='" + getCategory() + "'" +
            ", condition='" + getCondition() + "'" +
            ", price='" + getPrice() + "'" +
            ", quantity='" + getQuantity() + "'" +
            ", vendor='" + getVendor() + "'" +
            ", status='" + getStatus() + "'" +
            ", receiveDate='" + getReceiveDate() + "'" +
            ", totalSpending=" + getTotalSpending() +
            ", currency='" + getCurrency() + "'" +
            ", statusId='" + getStatusId() + "'" +
            ", quantityIn=" + getQuantityIn() +
            ", quantityOut=" + getQuantityOut() +
            ", notes='" + getNotes() + "'" +
            ", status=" + getStatusId() +
            ", category=" + getCategoryId() +
            ", condition=" + getConditionId() +
            ", names=" + getNamesId() +
            ", orders=" + getOrdersId() +
            ", users=" + getUsersId() +
            "}";
    }
}
