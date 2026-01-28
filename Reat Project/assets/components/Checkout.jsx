import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useCart } from "../../context/CartContext";
import PageWrapper from "./PageWrapper";
import BackButton from "./BackButton";

const Checkout = () => {
  const { clearCart } = useCart();

  return (
    <PageWrapper>
      <div className="max-w-md mx-auto py-20">
        <BackButton />
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>

        <Formik
          initialValues={{ name: "", email: "", address: "" }}
          validationSchema={Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            address: Yup.string().required(),
          })}
          onSubmit={() => {
            alert("Order placed!");
            clearCart();
          }}
        >
          <Form className="space-y-4">
            <Field name="name" placeholder="Name" className="w-full p-2 border" />
            <Field name="email" placeholder="Email" className="w-full p-2 border" />
            <Field name="address" placeholder="Address" className="w-full p-2 border" />

            <button className="w-full bg-emerald-600 text-white py-2 rounded">
              Place Order
            </button>
          </Form>
        </Formik>
      </div>
    </PageWrapper>
  );
};

export default Checkout;
