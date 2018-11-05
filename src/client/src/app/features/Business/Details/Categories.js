import React from 'react'

const Categories = props => 
	<div className="categories">
		{
			props.categories.map((category, idx) => (<span key={idx}>{category.title}</span>))
		}
	</div>

export default Categories