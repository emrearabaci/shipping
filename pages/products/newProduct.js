/* React API */
import { useState } from 'react';

/* Hooks */
import { useForm } from '../../hooks/useForm';

/* Instances */
import axios from '../../configs/axiosInstance';

/* Components */
import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import Button from '../../components/Button';

export default function NewProduct() {
  const [errors, setErrors] = useState([]);
  const [newProductForm, setNewProductForm] = useForm({
    productCode: '',
    productName: '',
    productCustomer: '',
    productUnitCost: '',
    productUnitPrice: '',
    productUnit: '',
    productNetMeasure: '',
    productGrossMeasure: '',
    productRawMaterial: '',
    productStages: '',
    productDescription: '',
    productCreator: 'Logged User!',
    productUpdater: 'Logged User!'
  });

  const productUnitOptions = [
    {
      id: 0,
      name: 'Countable',
      units: [{ id: 0, value: 'p', label: 'Piece (p)' }]
    },
    {
      id: 1,
      name: 'Measure of Weight',
      units: [
        { id: 0, value: 'g', label: 'Gram (g)' },
        { id: 1, value: 'kg', label: 'Kilogram (kg)' }
      ]
    },
    {
      id: 2,
      name: 'Measure of Length',
      units: [
        { id: 0, value: 'mm2', label: 'Millimeter (mm)' },
        { id: 1, value: 'cm2', label: 'Centimeter (cm)' },
        { id: 2, value: 'dm2', label: 'Decimeter (dm)' },
        { id: 3, value: 'm2', label: 'Meter (m)' }
      ]
    },
    {
      id: 3,
      name: 'Measure of Capacity',
      units: [{ id: 0, value: 'l', label: 'Liter (l)' }]
    }
  ];

  const newProductRequest = async (event) => {
    event.preventDefault(event);
    const data = {
      newProductForm
    };

    await axios
      .post('/product/newProduct', data, {
        withCredentials: false
      })
      .then((res) => {
        console.table(res.data);
      })
      .catch((err) => {
        const errors = err.response.data.error;
        console.log(errors);
        setErrors(errors);
      });
  };

  return (
    <>
      <form className={``}>
        <InputField
          name={`productCode`}
          type={`text`}
          placeholder={`Product Code:`}
          value={newProductForm.productCode}
          onChange={setNewProductForm}
        />
        <InputField
          name={`productName`}
          type={`text`}
          placeholder={`Product Name:`}
          value={newProductForm.productName}
          onChange={setNewProductForm}
        />
        <InputField
          name={`productCustomer`}
          type={`text`}
          placeholder={`Product Customer:`}
          value={newProductForm.productCustomer}
          onChange={setNewProductForm}
        />
        <InputField
          name={`productUnitCost`}
          type={`number`}
          placeholder={`Product Unit Cost:`}
          value={newProductForm.productUnitCost}
          onChange={setNewProductForm}
        />
        <InputField
          name={`productUnitPrice`}
          type={`number`}
          placeholder={`Product Unit Price:`}
          value={newProductForm.productUnitPrice}
          onChange={setNewProductForm}
        />
        <SelectField
          name={'productUnit'}
          placeholder={'Please Select a Unit Type'}
          value={newProductForm.productUnit}
          options={productUnitOptions}
          onChange={setNewProductForm}
        />
        <InputField
          name={`productNetMeasure`}
          type={`number`}
          placeholder={`Product Net Measure:`}
          value={newProductForm.productNetMeasure}
          onChange={setNewProductForm}
        />
        <InputField
          name={`productGrossMeasure`}
          type={`number`}
          placeholder={`Product Gross Measure:`}
          value={newProductForm.productGrossMeasure}
          onChange={setNewProductForm}
        />
        <InputField
          name={`productRawMaterial`}
          type={`text`}
          placeholder={`Product Raw Material:`}
          value={newProductForm.productRawMaterial}
          onChange={setNewProductForm}
        />
        <InputField
          name={`productStages`}
          type={`string`}
          placeholder={`Product Stages:`}
          value={newProductForm.productStages}
          onChange={setNewProductForm}
        />
        <InputField
          name={`productDescription`}
          type={`string`}
          placeholder={`Product Descriptions:`}
          value={newProductForm.productDescription}
          onChange={setNewProductForm}
        />
        <Button
          type={`submit`}
          onClick={newProductRequest}
          content={`Save Product`}
        />
      </form>

      <div>
        {Object.keys(errors).map((error, index) => {
          return (
            <p key={index}>
              {error}: {errors[error]}
            </p>
          );
        })}
      </div>
    </>
  );
}
