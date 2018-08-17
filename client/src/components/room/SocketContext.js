import React from 'react'

export const SocketContext = React.createContext()

export function withSocket(Component) {
	return class ComponentWithSocket extends React.Component {        
		render() {
			return (
				<SocketContext.Consumer>
					{socket => <Component socket={socket} {...this.props} /> }
				</SocketContext.Consumer>
			)
		}
	}
}