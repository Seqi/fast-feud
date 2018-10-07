import React from 'react'

const Refresh = (props) => 
	props.canRefresh ? <i id="refresh-business" className="fa fa-refresh fa-2x" onClick={() => props.onRefresh()} /> : null

export default Refresh