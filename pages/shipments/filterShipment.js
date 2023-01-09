/* React API */
import { useEffect, useState } from 'react';

/* Next API */
import Link from 'next/link';

/* Hooks */
import { useForm } from '../../hooks/useForm';

/* Instances */
import axios from '../../configs/axiosInstance';

/* Static Props */
import { loadProducts } from '../../lib/loadProducts';

/* Components */
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import SelectField from '../../components/SelectField';

export default function FilterShipment({ allProducts }) {
  const [errors, setErrors] = useState(undefined);

  const [selectedProduct, setSelectedProduct] = useState(undefined);
  const [shipmentFilterForm, setShipmentFilterForm] = useForm({
    productCode: '',
    startingDate: '',
    endingDate: '',
    shipmentStatus: ''
  });
  const [searchResult, setSearchResult] = useState([]);
  const [calculatedResult, setCalculatedResult] = useState(undefined);

  useEffect(() => {
    if (selectedProduct !== undefined) {
      shipmentFilterForm.productCode = selectedProduct.productCode;
    } else {
      shipmentFilterForm.productCode = '';
    }
  });

  const whichProduct = (event) => {
    setSelectedProduct(
      allProducts.find((product) => product.productCode === event.target.value)
    );
  };

  const searchWithDateRange = async (event) => {
    event.preventDefault();
    const data = { shipmentFilterForm };

    await axios
      .post('/shipment/filterShipment', data)
      .then((res) => {
        if (res.data.success === false) {
          setErrors(res.data.message);
          setSearchResult([]);
          setCalculatedResult(undefined);
        } else {
          setErrors('');
          setSearchResult(res.data.data);
          setCalculatedResult(res.data.calculatedResults);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const shipmentStatusOptions = [
    {
      id: 0,
      name: 'Options',
      units: [
        { id: 0, value: 'raw', label: 'Raw' },
        { id: 1, value: 'queue', label: 'Queue' },
        { id: 2, value: 'progress', label: 'Progress' },
        { id: 3, value: 'done', label: 'Done' }
      ]
    }
  ];

  return (
    <>
      <div>
        <form>
          <input list={'products'} onChange={whichProduct} />
          <datalist id={'products'}>
            {allProducts.map((product) => (
              <option key={product.productCode} value={product.productCode}>
                {product.productName}
              </option>
            ))}
          </datalist>

          <InputField
            name={'startingDate'}
            type={'date'}
            placeholder={'Starting Date'}
            value={shipmentFilterForm.startingDate}
            onChange={setShipmentFilterForm}
          />
          <InputField
            name={'endingDate'}
            type={'date'}
            placeholder={'Ending Date'}
            value={shipmentFilterForm.endingDate}
            onChange={setShipmentFilterForm}
          />
          <SelectField
            name={'shipmentStatus'}
            placeholder={'Please Select a Shipment Status'}
            value={shipmentFilterForm.shipmentStatus}
            options={shipmentStatusOptions}
            onChange={setShipmentFilterForm}
          />
          <Button
            type={'submit'}
            onClick={searchWithDateRange}
            content={'Search'}
          />
        </form>
      </div>

      <div>
        {calculatedResult !== undefined && (
          <div>
            <p>{calculatedResult.gross.totalGrossMeasure}</p>
            <p>{calculatedResult.net.totalNetMeasure}</p>
            <p>{calculatedResult.cost.totalCost}</p>
            <p>{calculatedResult.price.totalPrice}</p>
          </div>
        )}
      </div>

      <div>
        {searchResult &&
          searchResult.map((shipment, index) => (
            <div key={index}>
              <p>ProductCode: {shipment.productInfo[0].productCode}</p>
              <p>
                RequestedDate:
                {new Date(shipment.shipmentRequestedDate).toLocaleDateString(
                  'tr-TR'
                )}
              </p>
              <p>RequestedTime: {shipment.shipmentRequestedTime}</p>
              <p>ShipmentQuantity: {shipment.shipmentQuantity}</p>
              <p>ShipmentStatus: {shipment.shipmentStatus}</p>
              <Link
                href={`/shipments/${encodeURIComponent(shipment.shipmentCode)}`}
              >
                {shipment.shipmentCode}
              </Link>
            </div>
          ))}
      </div>

      <div>
        <p>{errors}</p>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allProducts = await loadProducts();
  return { props: { allProducts } };
}
