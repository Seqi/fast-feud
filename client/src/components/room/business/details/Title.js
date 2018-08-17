import React from 'react'

const Title = (props) =>
	<div className="title">
		<h1>{props.name}</h1>

		<i className={props.isClosed ? 'fa fa-ban' : 'fa fa-clock-o'}
			title={props.isClosed ? 'Closed now' : 'Open now'}>
		</i>
	</div>

export default Title