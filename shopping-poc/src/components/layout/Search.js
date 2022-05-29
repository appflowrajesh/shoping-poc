import React, { useEffect, useRef, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { searchProduct } from "../../apiCalls/ProductService";
import { useDebounce } from "../../hooks/useDebounce";
import { useOnClickOutside } from "../../hooks/useOutsideClick";
import CustomInput from "../Input";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [products, setProducts] = useState([]);
  const [isSearchResultShow, setSearchResultShow] = useState(false);

  const ref = useRef();

  useOnClickOutside(ref, () => setSearchResultShow(false));

  console.log(location, "location");
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/product-list");
    }
  }, [location.pathname, navigate]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchProductHandler = async () => {
    const res = await searchProduct(searchTerm);
    if (res.status) {
      setProducts(res.data);
      if (res.data.length > 0) {
        setSearchResultShow(true);
      } else {
        setSearchResultShow(false);
      }
    }
  };

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        searchProductHandler();
      } else {
        setProducts([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  console.log(products, "products");
  return (
    <>
      <div className="search_box">
        <CustomInput
          type="text"
          onChange={handleChange}
          placeholder={"Search products..."}
          name="query"
          autoComplete="off"
          iconPosition="right"
          value={searchTerm}
          icon={
            <Button variant="primary">
              <BsSearch />
            </Button>
          }
        />
        {isSearchResultShow && (
          <ListGroup variant="flush" ref={ref}>
            {products.map((product) => (
              <ListGroup.Item key={product._id}>
                <Link
                  to={`/product/${product._id}`}
                  onClick={() => {
                    setSearchResultShow(false);
                    setSearchTerm("");
                  }}
                >
                  {product.productName}
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
    </>
  );
};

export default Search;
