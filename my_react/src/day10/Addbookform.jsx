import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addbook } from "../actions/BookActions";

function AddBookForm() {

  const validationschema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    price: Yup.number().required("Price is required")
  });

  return (
    <div>
      <h2>Add New Book</h2>

      <Formik
        initialValues={{ title: "", author: "", price: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          addBook(values);
          resetForm();
        }}
      >
        <Form>
          <div>
            <Field name="title" placeholder="Book Title" />
            <ErrorMessage name="title" />
          </div>

          <div>
            <Field name="author" placeholder="Author Name" />
            <ErrorMessage name="author" />
          </div>

          <div>
            <Field name="price" placeholder="Price" />
            <ErrorMessage name="price" />
          </div>

          <button type="submit">Add Book</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Addbookform;
