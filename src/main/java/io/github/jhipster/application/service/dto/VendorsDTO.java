package io.github.jhipster.application.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Vendors entity.
 */
public class VendorsDTO implements Serializable {

    private Long id;

    private String name;

    private String url;

    private String address;

    private String contactPerson;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VendorsDTO vendorsDTO = (VendorsDTO) o;
        if (vendorsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vendorsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VendorsDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", url='" + getUrl() + "'" +
            ", address='" + getAddress() + "'" +
            ", contactPerson='" + getContactPerson() + "'" +
            "}";
    }
}
