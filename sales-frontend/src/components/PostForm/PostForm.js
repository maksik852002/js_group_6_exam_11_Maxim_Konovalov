import React, { Component } from "react";

class PostForm extends Component {
  state = {
    category: "",
    title: "",
    price: "",
    description: "",
    image: ""
  };

  submitFormHandler = event => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });
    this.props.onSubmit(formData);
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  fileChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.files[0] });
  };

  getFieldError = fieldName => {
    try {
      return this.props.error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  render() {
    return (
      <form onSubmit={this.submitFormHandler}>
        <div className="form-group">
          <label htmlFor="category">Categories</label>
          <select
            name="category"
            className={
              !this.props.error ? "form-control" : "form-control is-invalid"
            }
            id="category"
            value={this.state.category}
            onChange={this.inputChangeHandler}
          >
            <option value="">Please select a category...</option>
            {this.props.categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
          <div className={this.props.error && "invalid-feedback d-block"}>
            {this.getFieldError("category")}
          </div>
        </div>
        <div className="custom-file mb-3">
          <input
            name="image"
            type="file"
            className={
              !this.props.error
                ? "custom-file-input"
                : "custom-file-input is-invalid"
            }
            id="image"
            onChange={this.fileChangeHandler}
          />
          <label className="custom-file-label" htmlFor="image">
            {this.state.image ? this.state.image.name : "Choose file"}
          </label>
          <div className={this.props.error && "invalid-feedback d-block"}>
            {this.getFieldError("image")}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            className={
              !this.props.error ? "form-control" : "form-control is-invalid"
            }
            id="title"
            placeholder="Enter title"
            value={this.state.title}
            onChange={this.inputChangeHandler}
          />
          <div className={this.props.error && "invalid-feedback d-block"}>
            {this.getFieldError("title")}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            name="price"
            type="number"
            className={
              !this.props.error ? "form-control" : "form-control is-invalid"
            }
            id="price"
            placeholder="Enter price"
            value={this.state.price}
            onChange={this.inputChangeHandler}
          />
          <div className={this.props.error && "invalid-feedback d-block"}>
            {this.getFieldError("price")}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            type="textarea"
            style={{ resize: "none" }}
            className={
              !this.props.error ? "form-control" : "form-control is-invalid"
            }
            rows="8"
            id="description"
            placeholder="Enter description"
            value={this.state.description}
            onChange={this.inputChangeHandler}
          />
          <div className={this.props.error && "invalid-feedback d-block"}>
            {this.getFieldError("description")}
          </div>
        </div>
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
    );
  }
}

export default PostForm;
