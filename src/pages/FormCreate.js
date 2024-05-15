// FormCreate.js
import React from "react";

const FormCreate = ({ formData }) => {
    const renderFormFields = () => {
        return formData.map((field, index) => {
            if (field.type === "date") {
                return <input key={index} type="date" name={field.name} required={field.required} className={field.className} />;
            } else if (field.type === "paragraph") {
                return <p key={index}>{field.label}</p>;
            }
            // Add more cases for other field types as needed
        });
    };

    return <div>{renderFormFields()}</div>;
};

export default FormCreate;
