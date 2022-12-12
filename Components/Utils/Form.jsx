import React from 'react'
import PropTypes from "prop-types";

function Form(props) {
    return (
        <form className='bg-white p-4 rounded-4' onSubmit={(e) => props.handleSubmit(e)}>
            <div className="form-group mb-3">
                <label htmlFor="name" className='fs-6 mb-1'>Name</label>
                <input type="text" required id='name' name='name' className="form-control" placeholder="Enter Here" />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="title" className='fs-6 mb-1'>Title</label>
                <input type="text" required id='title' name='title' className="form-control" placeholder="Enter Here" />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="comment" className='fs-6 mb-1'>Comment</label>
                <textarea id='comment' required name="desc" cols={10} rows={10} placeholder='Enter Here' className='form-control'></textarea>
            </div>
            <div className="d-none hiddenValues">
                <input type="hidden" name="parentId" value={props.parentId} />
            </div>
            <div className='text-end'><button type="submit" className="btn btn-primary">Submit</button></div>
        </form>
    )
}

Form.propTypes = {
    handleSubmit: PropTypes.func,
    parentId: PropTypes.string
}

Form.defaultProps = {
    handleSubmit: {},
    parentId: '0',
}


export default Form