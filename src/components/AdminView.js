import React, { useState, useEffect, useContext} from "react";
import UserContext from "../UserContext";
import { Table, Button, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function AdminView (props) {
    const { productData, fetchData } = props;
    const { changeDocTitle } = useContext(UserContext);
    const [productId, setProductId] = useState("");
    const [products, setProducts] = useState([]);
    const [brandName, setBrandName] = useState("");
    const [modelName, setModelName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(null);
    const [material, setMaterial] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [weight, setWeight] = useState(null);

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const openAdd = () => setShowAdd(true)
    const closeAdd = () => {
        setShowAdd(false);
        clearForm();
    }

    const clearForm = () => {
        setBrandName("");
        setModelName("");
        setDescription("");
        setPrice(null);
        setMaterial("");
        setColor("");
        setSize("");
        setType("");
        setCategory("");
        setWeight(null);
    }

    const openEdit = (product) => {
        setProductId(product._id);
        setBrandName(product.brandName);
        setModelName(product.modelName);
        setDescription(product.description);
        setPrice(product.price);
        setMaterial(product.material);
        setColor(product.color);
        setSize(product.size);
        setType(product.type);
        setCategory(product.category);
        setWeight(product.weight);
        setShowEdit(true);
    }
    const closeEdit = () => {
        setShowEdit(false);
        clearForm();
    }

    useEffect(() => {
        const productsArray = productData.map(product => {
            return(
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.brandName}</td>
                    <td>{product.modelName}</td>
                    <td>{product.description}</td>
                    <td>&#8369;{`${product.price.toLocaleString()}.00`}</td>
                    <td>
                    <div>Type: {product.type}</div>
                    <div>Category: {product.category}</div>
                    <div>Material: {product.material}</div>
                    <div>Color: {product.color}</div>
                    <div>Weight (grams): {product.weight}</div>
                    <div>Size: {product.size}</div>
                    </td>
                    <td className={product.isActive ? "text-success text-center" : "text-danger text-center"}>{product.isActive ? "Available" : "Unavailable"}</td>
                    <td className="text-center">
                        <Button className="btn-block" variant="warning" size="sm" onClick={() => openEdit(product)}>Update</Button>
                        {
                            product.isActive ? <Button className="btn-block" variant="danger" size="sm" onClick={() => archiveToggle(product._id, product.isActive)}>Disable</Button>
                            : <Button className="btn-block" variant="success" size="sm" onClick={() => archiveToggle(product._id, product.isActive)}>Enable</Button>
                        }
                        
                    </td>
                </tr>
            )
        })
        setProducts(productsArray);
    }, [productData])

    useEffect(() => {
        changeDocTitle("G.B. Music: Admin Dashboard")
    }, [])

    const addProduct = (e) => {
        e.preventDefault();
        
        fetch(`${process.env.REACT_APP_API_URL}/products/new-product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                brandName: brandName,
                modelName: modelName,
                description: description,
                price: price,
                    material: material,
                    color: color,
                    size: size,
                    type: type,
                    category: category,
                    weight: weight
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.incompleteDetails) {


                Swal.fire({
                    title: "Oops!",
                    icon: "error",
                    text: "Please enter all required details!",
                    timer: 5000
                })
            } else {
                fetchData()

                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    text: "Product successfully added!",
                    timer: 5000
                })
                closeAdd();
            }
        })
        .catch((err)=>Swal.fire({title:"error", icon: "error", text: `ERROR MSG: ${err}.`}))
    }

    const editProduct = (e, productId) => {
        e.preventDefault();
        
        Swal.fire({
            title: "Hold on!",
            text: `Are you sure you want to effect these changes to ${brandName} ${modelName}?`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}/products/update/${productId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    },
                    
                    body: JSON.stringify({
                        brandName: brandName,
                        modelName: modelName,
                        description: description,
                        price: price,
                            material: material,
                            color: color,
                            size: size,
                            type: type,
                            category: category,
                            weight: weight
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        fetchData();
                        const Toast = Swal.mixin({
                            toast: true,
                            icon: "info",
                            position: "top",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            showCloseButton: true
                          })
                        Toast.fire({
                            text: `You have successfully updated the product details for ${data.brandName} ${data.modelName}!`
                        })
                        closeEdit();
                    } else {
                        fetchData();
                        Swal.fire({
                            title: "Error!",
                            icon: "error",
                            text: "Something went wrong. :(",
                            timer: 5000
                        })
                    }
                })
            }
        })
    }
            
    const archiveToggle = (productId, isActive) => {
        fetch(`${process.env.REACT_APP_API_URL}/products/archive-toggle/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                isActive: isActive
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.isProductActive) {
                fetchData();
                const Toast = Swal.mixin({
                    toast: true,
                    icon: "success",
                    position: "top",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    showCloseButton: true
                  })
                Toast.fire({
                    text: "Product is now active."
                })
            } else if (!data.isProductActive) {
                fetchData();
                const Toast = Swal.mixin({
                    toast: true,
                    icon: "success",
                    position: "top",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    showCloseButton: true
                  })
                Toast.fire({
                    text: "Product is now inactive."
                })
            } else {
                fetchData();
                Swal.fire({
                    title: "Something went wrong!!",
                    icon: "error",
                    text: "Please try again."
                })
            }
        })
    }

    useEffect(() => {
        if (weight < 0) {
            setWeight(1);
        }
    }, [weight])

    useEffect(() => {
        changeDocTitle("Admin Dashboard");
    }, [])

    return(
        <>
            <div className="text-center my-4">
                <h2>Admin Dashboard</h2>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <Button variant="dark" className="themeColor" onClick={openAdd}>Add New Product</Button>
            </div>
            <div className="text-right mb-3">
                <Link className="text-info text-right" to={"/profile"}>View User Orders</Link>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Specs</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {products}
                </tbody>
                <Modal show={showAdd} onHide={closeAdd}>
                    <Form onSubmit={e => addProduct(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type="text" required placeholder="Enter Product Brand" value={brandName} onChange={e => setBrandName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Model</Form.Label>
                                <Form.Control type="text" required placeholder="Enter Product Model" value={modelName} onChange={e => setModelName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={4} required placeholder="Enter Product Description" value={description} onChange={e => setDescription(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" required placeholder="Enter Product Price" value={price} onChange={e => setPrice(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Label>Product Specifications</Form.Label>

                            <InputGroup className="mb-2 mb-md-4">
                                <FormControl type="text" required placeholder="Type" value={type} onChange={e => setType(e.target.value)}/>
                                <FormControl type="text" required placeholder="Category" value={category} onChange={e => setCategory(e.target.value)}/>
                            </InputGroup>

                            <InputGroup className="my-2 my-md-4">
                                <FormControl type="text" placeholder="Material" value={material} onChange={e => setMaterial(e.target.value)}/>
                                <FormControl type="text" placeholder="Color" value={color} onChange={e => setColor(e.target.value)}/>
                            </InputGroup>

                            <InputGroup className="my-2 my-md-4">
                                <FormControl type="number" placeholder="Weight (in grams)" min="1" value={weight} onChange={e => setWeight(e.target.value)} appearance="none"/>
                                <FormControl type="text" placeholder="Size" value={size} onChange={e => setSize(e.target.value)}/>
                            </InputGroup>

                            <Modal.Footer>
                                <Button variant="dark" className="themeColor btn-block" type="submit">Create Product</Button>
                                <Button variant="secondary" className="btn-block" onClick={closeAdd}>Close</Button>
                            </Modal.Footer>
                        </Modal.Body>
                    </Form>
                </Modal>




                <Modal show={showEdit} onHide={closeEdit}>
                    <Form onSubmit={e => editProduct(e, productId)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit a Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form.Group>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type="text" required placeholder="Enter Product Brand" value={brandName} onChange={e => setBrandName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Model</Form.Label>
                                <Form.Control type="text" required placeholder="Enter Product Model" value={modelName} onChange={e => setModelName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={4} required placeholder="Enter Product Description" value={description} onChange={e => setDescription(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" required placeholder="Enter Product Price" value={price} onChange={e => setPrice(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Label>Product Specifications</Form.Label>

                            <InputGroup className="mb-2 mb-md-4">
                                <FormControl type="text" required placeholder="Type" value={type} onChange={e => setType(e.target.value)}/>
                                <FormControl type="text" required placeholder="Category" value={category} onChange={e => setCategory(e.target.value)}/>
                            </InputGroup>

                            <InputGroup className="my-2 my-md-4">
                                <FormControl type="text" placeholder="Material" value={material} onChange={e => setMaterial(e.target.value)}/>
                                <FormControl type="text" placeholder="Color" value={color} onChange={e => setColor(e.target.value)}/>
                            </InputGroup>

                            <InputGroup className="my-2 my-md-4">
                                <FormControl type="number" placeholder="Weight (in grams)" min="1" value={weight} onChange={e => setWeight(e.target.value)} appearance="none"/>
                                <FormControl type="text" placeholder="Size" value={size} onChange={e => setSize(e.target.value)}/>
                            </InputGroup>


                            <Modal.Footer>
                                <Button variant="dark" className="btn-block themeColor" type="submit">Update</Button>
                                <Button variant="secondary" className="btn-block" onClick={closeEdit}>Close</Button>
                            </Modal.Footer>
                        </Modal.Body>
                    </Form>
                </Modal>
            </Table>
        </>
    )
}