import { useState } from "react";
import Card from "./Card";
import PageWrapper from "./PageWrapper";
import BackButton from "./BackButton";

const Products = ({ products, setProducts, isAdmin }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [editProduct, setEditProduct] = useState({});

  const addProduct = (e) => {
    e.preventDefault();
    setProducts([
      ...products,
      { id: Date.now(), ...newProduct, price: Number(newProduct.price) }
    ]);
    setNewProduct({ name: "", price: "", category: "", image: "" });
  };

  const deleteProduct = (id) =>
    setProducts(products.filter(p => p.id !== id));

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditProduct(product);
  };

  const saveEdit = () => {
    setProducts(
      products.map(p => (p.id === editingId ? editProduct : p))
    );
    setEditingId(null);
  };

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-10 py-20">
        <BackButton />

        {/* ADMIN FORM */}
        {isAdmin && (
          <div className="mb-12 p-6 border rounded bg-white">
            <h2 className="text-xl font-bold mb-4">Admin – Add Product</h2>

            <form
              onSubmit={addProduct}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <input
                placeholder="Name"
                className="border p-2"
                value={newProduct.name}
                onChange={e =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />
              <input
                placeholder="Price"
                type="number"
                className="border p-2"
                value={newProduct.price}
                onChange={e =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
              />
              <input
                placeholder="Category"
                className="border p-2"
                value={newProduct.category}
                onChange={e =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                required
              />
              <input
                placeholder="Image URL"
                className="border p-2"
                value={newProduct.image}
                onChange={e =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                required
              />
              <button className="md:col-span-4 bg-emerald-600 text-white py-2 rounded">
                Add Product
              </button>
            </form>
          </div>
        )}

        {/* PRODUCT LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product.id}>
              {editingId === product.id ? (
                isAdmin && (
                  <div className="border p-4 rounded">
                    <input
                      className="border p-2 w-full mb-2"
                      value={editProduct.name}
                      onChange={e =>
                        setEditProduct({ ...editProduct, name: e.target.value })
                      }
                    />
                    <input
                      className="border p-2 w-full mb-2"
                      value={editProduct.price}
                      onChange={e =>
                        setEditProduct({ ...editProduct, price: e.target.value })
                      }
                    />
                    <button
                      onClick={saveEdit}
                      className="bg-emerald-600 text-white w-full py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                )
              ) : (
                <>
                  <Card {...product} />
                  {isAdmin && (
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="text-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Products;
