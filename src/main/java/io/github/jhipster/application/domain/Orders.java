package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Orders.
 */
@Entity
@Table(name = "orders")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Orders implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "order_reference_number")
    private String orderReferenceNumber;

    @Column(name = "order_date")
    private String orderDate;

    @Column(name = "name")
    private String name;

    @Column(name = "status_id")
    private String statusId;

    @Column(name = "notes")
    private String notes;

    @OneToOne
    @JoinColumn(unique = true)
    private Vendors vendors;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderReferenceNumber() {
        return orderReferenceNumber;
    }

    public Orders orderReferenceNumber(String orderReferenceNumber) {
        this.orderReferenceNumber = orderReferenceNumber;
        return this;
    }

    public void setOrderReferenceNumber(String orderReferenceNumber) {
        this.orderReferenceNumber = orderReferenceNumber;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public Orders orderDate(String orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getName() {
        return name;
    }

    public Orders name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatusId() {
        return statusId;
    }

    public Orders statusId(String statusId) {
        this.statusId = statusId;
        return this;
    }

    public void setStatusId(String statusId) {
        this.statusId = statusId;
    }

    public String getNotes() {
        return notes;
    }

    public Orders notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Vendors getVendors() {
        return vendors;
    }

    public Orders vendors(Vendors vendors) {
        this.vendors = vendors;
        return this;
    }

    public void setVendors(Vendors vendors) {
        this.vendors = vendors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Orders orders = (Orders) o;
        if (orders.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orders.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Orders{" +
            "id=" + getId() +
            ", orderReferenceNumber='" + getOrderReferenceNumber() + "'" +
            ", orderDate='" + getOrderDate() + "'" +
            ", name='" + getName() + "'" +
            ", statusId='" + getStatusId() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
